# PDP Share/Save, Saved Recipes Nav, Search, Footer Links Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the PDP Share/Save buttons functional, add a "Saved" navbar menu backed by localStorage, wire up navbar search end-to-end, and replace every dead footer link with a real page — while fixing the underlying data bugs (duplicated nested recipe array, no stable recipe id) that block all of it.

**Architecture:** Next.js 14 App Router, static JSON data source (no backend/DB). Recipe identity moves from the overloaded `category_id` field to a new unique `id` (slug) field. A single `SavedRecipesContext` (React context over `localStorage`) is the source of truth for saved recipes, consumed by the PDP Save button, the navbar "Saved" link badge state, and the new `/saved` page. A new shared `RecipeCard` component replaces duplicated card markup across the category list, saved, latest, and search pages.

**Tech Stack:** Next.js 14 (App Router), React 18, Tailwind CSS. No new npm dependencies — persistence uses `localStorage` directly, icons stay inline SVG (matching the rest of the codebase), no test framework is introduced (none exists today; verification is manual/dev-server based, plus plain Node checks for pure-JS logic).

## Global Constraints

- No new npm dependencies (spec: "no new npm dependencies").
- Saved recipes persist in `localStorage` only, per-browser, no sync (spec section 2 / out-of-scope).
- Search matches `title`, `description`, or `author`, case-insensitive substring only — no fuzzy/ranked search (spec section 4 / out-of-scope).
- Footer `/about`, `/careers`, `/contact`, `/feedback`, `/terms`, `/conditions`, `/cookies`, `/copyright` are static informational pages only — no forms/backend (spec section 5).
- `category_id` is never repurposed as a recipe id again — it stays the category-grouping foreign key only; recipe identity is the new `id` field everywhere (spec section 1).

---

## Task 1: Fix recipe data — remove duplicate nested array, add unique `id`

**Files:**
- Create (temporary, deleted at end of task): `scripts/fix-recipes-data.js`
- Modify: `app/data/recipes.json`

**Interfaces:**
- Produces: every object in `app/data/recipes.json` now has a unique string `id` field (slug of `title`, e.g. `"mastering-the-art-of-perfect-pancakes"`), in addition to existing fields (`rating`, `category_id`, `description`, `title`, `published_date`, `cooking_time`, `author`, `thumbnail`). The file is a flat array of 25 objects (previously 26 entries, the 26th itself an array of 10 duplicate objects).

- [ ] **Step 1: Write the one-off migration script**

```js
// scripts/fix-recipes-data.js
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../app/data/recipes.json');
const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

// Index 25 is a malformed nested array of 10 exact-duplicate recipes
// (copy-paste accident). Drop anything that isn't a flat recipe object.
const flat = data.filter((entry) => !Array.isArray(entry));

function slugify(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

const seen = new Set();
for (const recipe of flat) {
  const id = slugify(recipe.title);
  if (seen.has(id)) {
    throw new Error(`Duplicate slug id generated: ${id}`);
  }
  seen.add(id);
  recipe.id = id;
}

fs.writeFileSync(filePath, JSON.stringify(flat, null, 2) + '\n');
console.log(`Wrote ${flat.length} recipes with unique ids.`);
```

- [ ] **Step 2: Run the script**

Run: `node scripts/fix-recipes-data.js`
Expected stdout: `Wrote 25 recipes with unique ids.`

- [ ] **Step 3: Verify the data file**

Run:
```bash
node -e "
const r = require('./app/data/recipes.json');
console.log(r.length, new Set(r.map((x) => x.id)).size, r.every((x) => typeof x.id === 'string' && x.id.length > 0));
"
```
Expected output: `25 25 true`

- [ ] **Step 4: Delete the migration script**

Run: `rm scripts/fix-recipes-data.js`

- [ ] **Step 5: Commit**

```bash
git add app/data/recipes.json
git commit -m "fix: remove duplicate nested recipe array, add unique id per recipe"
```

---

## Task 2: Use the new recipe `id` for routing instead of `category_id`

**Files:**
- Modify: `app/[category]/[recipe]/page.js:11` (recipe lookup), `:163` (related recipe `href`)
- Modify: `app/recipes/[categoryId]/page.js:36` (card `href`), `:37` (`key`)

**Interfaces:**
- Consumes: `recipe.id` from Task 1.
- Produces: PDP URLs of the form `/${categoryName}/${recipe.id}` are now stable and collision-free. Later tasks (RecipeCard, saved/search/latest pages) rely on this same `href` shape.

- [ ] **Step 1: Fix the PDP recipe lookup**

In `app/[category]/[recipe]/page.js`, change line 11:
```js
const recipe = recipeData.find((r) => r.category_id === recipeId);
```
to:
```js
const recipe = recipeData.find((r) => r.id === recipeId);
```

- [ ] **Step 2: Fix the related-recipes link**

In the same file, change line 163 from:
```jsx
href={`/${getCategoryName(relatedRecipe.category_id)}/${relatedRecipe.category_id}`}
```
to:
```jsx
href={`/${getCategoryName(relatedRecipe.category_id)}/${relatedRecipe.id}`}
```
(`key={relatedRecipe.id}` on the same `Link` already references `id` — it was previously `undefined` since the field didn't exist; it now resolves correctly.)

- [ ] **Step 3: Fix the category list page's card link and key**

In `app/recipes/[categoryId]/page.js`, change line 36-37 from:
```jsx
href={`/${getCategoryName(recipe.category_id)}/${recipe.category_id}`}
key={recipe.title}
```
to:
```jsx
href={`/${getCategoryName(recipe.category_id)}/${recipe.id}`}
key={recipe.id}
```

- [ ] **Step 4: Verify manually**

Run: `npm run dev`
Visit `http://localhost:3000/category/q7r8s9t0-u1v2-w3x4-y5z6-a7b8c9d0e1f2` (Desserts — has two distinct recipes that previously collided on `category_id`).
Expected: two distinct cards, "Dessert Heaven: Sweet Recipes from Around the World" and "Decadent Chocolate Lava Cake", with different `href`s.
Click each card. Expected: `http://localhost:3000/desserts/dessert-heaven-sweet-recipes-from-around-the-world` shows the Dessert Heaven recipe; `http://localhost:3000/desserts/decadent-chocolate-lava-cake` shows the Lava Cake recipe (previously both URLs would have shown whichever recipe `.find()` hit first).

- [ ] **Step 5: Commit**

```bash
git add "app/[category]/[recipe]/page.js" "app/recipes/[categoryId]/page.js"
git commit -m "fix: route recipes by unique id instead of colliding category_id"
```

---

## Task 3: Extract shared `RecipeCard` component

**Files:**
- Create: `app/components/RecipeCard.jsx`
- Modify: `app/recipes/[categoryId]/page.js` (replace inline card markup with `<RecipeCard />`, remove now-unused `getCategoryName` helper)

**Interfaces:**
- Consumes: a `recipe` object shaped like `app/data/recipes.json` entries (needs `id`, `title`, `description`, `thumbnail`, `cooking_time`, `category_id`).
- Produces: `RecipeCard` default export, props: `{ recipe }`. Renders a `Link` to `/${categoryName}/${recipe.id}` wrapping an image + title + description excerpt + cooking time, using the existing `.card`/`.card-image` Tailwind classes. Used by Task 6 (`/saved`), Task 7 (`/latest`), Task 8 (`/search`), and this task's category list page.

- [ ] **Step 1: Create `RecipeCard.jsx`**

```jsx
import Image from 'next/image';
import Link from 'next/link';
import categoriesData from '../data/categories.json';

const getCategoryName = (categoryId) => {
  const category = categoriesData.find((cat) => cat.id === categoryId);
  return category ? category.name.toLowerCase() : 'unknown';
};

const RecipeCard = ({ recipe }) => {
  return (
    <Link
      href={`/${getCategoryName(recipe.category_id)}/${recipe.id}`}
      className="card group"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={`/assets/thumbs/${recipe.thumbnail}`}
          alt={recipe.title}
          fill
          className="card-image"
        />
      </div>
      <div className="p-4">
        <h2 className="font-semibold text-ink mb-1.5 group-hover:text-amber-dark transition-colors line-clamp-2">
          {recipe.title}
        </h2>
        <p className="text-sm text-muted line-clamp-2">
          {recipe.description.substring(0, 80)}...
        </p>
        <div className="flex items-center gap-1.5 mt-3 text-xs text-muted">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {recipe.cooking_time}
        </div>
      </div>
    </Link>
  );
};

export default RecipeCard;
```

- [ ] **Step 2: Use `RecipeCard` in the category list page**

In `app/recipes/[categoryId]/page.js`:
- Remove the local `getCategoryName` function (lines 14-17) — no longer used in this file.
- Remove the `import Image from 'next/image';` if nothing else in the file uses `Image` (check before removing).
- Replace the grid's `.map()` (previously lines 34-63) with:
```jsx
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
  {filteredRecipes.map((recipe) => (
    <RecipeCard key={recipe.id} recipe={recipe} />
  ))}
</div>
```
- Add `import RecipeCard from '../../components/RecipeCard';` at the top.

- [ ] **Step 3: Verify manually**

Run: `npm run dev`
Visit `http://localhost:3000/category/q7r8s9t0-u1v2-w3x4-y5z6-a7b8c9d0e1f2` (Desserts).
Expected: same visual output as before this task (two cards, hover lift/scale effect still works, links still correct) — this task only refactors markup into a shared component, no behavior change.

- [ ] **Step 4: Commit**

```bash
git add app/components/RecipeCard.jsx "app/recipes/[categoryId]/page.js"
git commit -m "refactor: extract shared RecipeCard component"
```

---

## Task 4: Saved-recipes state layer (localStorage + React context)

**Files:**
- Create: `app/lib/savedRecipes.js`
- Create: `app/context/SavedRecipesContext.jsx`
- Modify: `app/layout.js` (wrap children in the provider)

**Interfaces:**
- Produces (from `app/lib/savedRecipes.js`): `getSavedIds(): string[]`, `toggleSavedId(id: string): string[]` (returns the new full list after toggling).
- Produces (from `app/context/SavedRecipesContext.jsx`): `SavedRecipesProvider` component; `useSavedRecipes()` hook returning `{ savedIds: Set<string>, isSaved(id: string): boolean, toggleSaved(id: string): void }`. Task 5 (PDP Save button) and Task 6 (`/saved` page) consume `useSavedRecipes()`.

- [ ] **Step 1: Create the localStorage helper**

```js
// app/lib/savedRecipes.js
const STORAGE_KEY = 'lws-kitchen:saved-recipes';

export function getSavedIds() {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function toggleSavedId(id) {
  const current = getSavedIds();
  const next = current.includes(id)
    ? current.filter((savedId) => savedId !== id)
    : [...current, id];
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  return next;
}
```

- [ ] **Step 2: Verify the helper with plain Node (no browser needed)**

Run:
```bash
node --input-type=module -e "
global.window = { localStorage: (() => { let store = {}; return { getItem: (k) => (k in store ? store[k] : null), setItem: (k, v) => { store[k] = v; } }; })() };
import('./app/lib/savedRecipes.js').then(({ getSavedIds, toggleSavedId }) => {
  console.log(JSON.stringify(getSavedIds()));
  console.log(JSON.stringify(toggleSavedId('a')));
  console.log(JSON.stringify(toggleSavedId('a')));
});
"
```
Expected output (three lines): `[]`, `["a"]`, `[]`

- [ ] **Step 3: Create the context**

```jsx
// app/context/SavedRecipesContext.jsx
'use client';

import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { getSavedIds, toggleSavedId } from '../lib/savedRecipes';

const SavedRecipesContext = createContext(null);

export function SavedRecipesProvider({ children }) {
  const [savedIds, setSavedIds] = useState(new Set());

  useEffect(() => {
    setSavedIds(new Set(getSavedIds()));
  }, []);

  const toggleSaved = useCallback((id) => {
    const next = toggleSavedId(id);
    setSavedIds(new Set(next));
  }, []);

  const isSaved = useCallback((id) => savedIds.has(id), [savedIds]);

  return (
    <SavedRecipesContext.Provider value={{ savedIds, isSaved, toggleSaved }}>
      {children}
    </SavedRecipesContext.Provider>
  );
}

export function useSavedRecipes() {
  const context = useContext(SavedRecipesContext);
  if (!context) {
    throw new Error('useSavedRecipes must be used within SavedRecipesProvider');
  }
  return context;
}
```

- [ ] **Step 4: Wrap the app in the provider**

In `app/layout.js`, add the import:
```js
import { SavedRecipesProvider } from "./context/SavedRecipesContext";
```
and wrap the body contents (was `<Header />{children}<Footer />`):
```jsx
<SavedRecipesProvider>
  <Header />
  {children}
  <Footer />
</SavedRecipesProvider>
```

- [ ] **Step 5: Verify the app still renders**

Run: `npm run dev`
Visit `http://localhost:3000/`.
Expected: page loads normally, no console errors (confirms `SavedRecipesProvider` doesn't break SSR/hydration).

- [ ] **Step 6: Commit**

```bash
git add app/lib/savedRecipes.js app/context/SavedRecipesContext.jsx app/layout.js
git commit -m "feat: add localStorage-backed saved-recipes context"
```

---

## Task 5: Wire up PDP Share and Save buttons

**Files:**
- Create: `app/components/PdpActions.jsx`
- Modify: `app/[category]/[recipe]/page.js` (replace static buttons block, lines 77-90, with `<PdpActions />`)

**Interfaces:**
- Consumes: `useSavedRecipes()` from Task 4.
- Produces: `PdpActions` default export, props: `{ recipeId: string }`.

- [ ] **Step 1: Create `PdpActions.jsx`**

```jsx
// app/components/PdpActions.jsx
'use client';

import { useState } from 'react';
import { useSavedRecipes } from '../context/SavedRecipesContext';

const PdpActions = ({ recipeId }) => {
  const { isSaved, toggleSaved } = useSavedRecipes();
  const [copied, setCopied] = useState(false);
  const saved = isSaved(recipeId);

  const handleShare = async () => {
    await navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex gap-3 mb-8 md:mb-12">
      <button onClick={handleShare} className="btn-secondary inline-flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
          <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
        </svg>
        {copied ? 'Copied!' : 'Share'}
      </button>
      <button
        onClick={() => toggleSaved(recipeId)}
        className="btn-secondary inline-flex items-center gap-2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          viewBox="0 0 20 20"
          fill={saved ? 'currentColor' : 'none'}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={saved ? 0 : 1.5}
            d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z"
          />
        </svg>
        {saved ? 'Saved' : 'Save'}
      </button>
    </div>
  );
};

export default PdpActions;
```

- [ ] **Step 2: Wire it into the PDP**

In `app/[category]/[recipe]/page.js`:
- Add `import PdpActions from '../../components/PdpActions';`
- Replace lines 77-90 (the `<div className="flex gap-3 mb-8 md:mb-12">...</div>` block containing the two static buttons) with:
```jsx
<PdpActions recipeId={recipe.id} />
```

- [ ] **Step 3: Verify Share manually**

Run: `npm run dev`
Visit `http://localhost:3000/pancakes/mastering-the-art-of-perfect-pancakes`.
Click "Share". Expected: button text becomes "Copied!" for ~2 seconds then reverts to "Share". Paste (Cmd+V) into the address bar or a text field to confirm the clipboard contains `http://localhost:3000/pancakes/mastering-the-art-of-perfect-pancakes`.

- [ ] **Step 4: Verify Save manually**

On the same page, click "Save". Expected: button text becomes "Saved", bookmark icon fills solid.
Open DevTools → Application → Local Storage → `http://localhost:3000`, confirm key `lws-kitchen:saved-recipes` has value `["mastering-the-art-of-perfect-pancakes"]`.
Reload the page. Expected: button still shows "Saved" (state persisted from localStorage).
Click "Saved" again. Expected: reverts to "Save", localStorage value becomes `[]`.

- [ ] **Step 5: Commit**

```bash
git add "app/[category]/[recipe]/page.js" app/components/PdpActions.jsx
git commit -m "feat: wire up PDP share (clipboard) and save (localStorage) buttons"
```

---

## Task 6: Saved recipes page + navbar "Saved" link

**Files:**
- Create: `app/saved/page.js`
- Modify: `app/components/Header.jsx` (add "Saved" desktop nav link)
- Modify: `app/components/MobileMenu.jsx` (add "Saved" mobile nav link)

**Interfaces:**
- Consumes: `useSavedRecipes()` from Task 4, `RecipeCard` from Task 3.

- [ ] **Step 1: Create `app/saved/page.js`**

```jsx
'use client';

import Link from 'next/link';
import recipesData from '../data/recipes.json';
import RecipeCard from '../components/RecipeCard';
import { useSavedRecipes } from '../context/SavedRecipesContext';

const SavedPage = () => {
  const { savedIds } = useSavedRecipes();
  const savedRecipes = recipesData.filter((recipe) => savedIds.has(recipe.id));

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 md:pt-28 pb-16">
      <div className="mb-10 md:mb-14">
        <span className="badge-amber mb-3 inline-block">Your Collection</span>
        <h1 className="section-heading text-4xl md:text-5xl">Saved Recipes</h1>
        <p className="text-muted mt-2">
          {savedRecipes.length} recipe{savedRecipes.length !== 1 ? 's' : ''} saved
        </p>
      </div>

      {savedRecipes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {savedRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-muted text-lg mb-4">No saved recipes yet.</p>
          <Link href="/category" className="btn-primary">Browse Categories</Link>
        </div>
      )}
    </main>
  );
};

export default SavedPage;
```

- [ ] **Step 2: Add the desktop nav link**

In `app/components/Header.jsx`, inside the desktop `<ul>` (after the "Latest Recipes" `<li>`, before the closing `</ul>` at line 70), add:
```jsx
<li>
  <Link
    href="/saved"
    className="px-4 py-2 rounded-full text-sm font-medium text-ink hover:bg-cream transition-colors"
  >
    Saved
  </Link>
</li>
```

- [ ] **Step 3: Add the mobile nav link**

In `app/components/MobileMenu.jsx`, inside `<nav>` (after the "Latest Recipes" `<Link>`, before the closing `</nav>` at line 58), add:
```jsx
<Link
  href="/saved"
  onClick={onClose}
  className="px-4 py-3 rounded-xl text-lg font-medium text-ink hover:bg-cream transition-colors"
>
  Saved
</Link>
```

- [ ] **Step 4: Verify manually**

Run: `npm run dev`
With no recipes saved, visit `http://localhost:3000/saved`. Expected: "No saved recipes yet." + a "Browse Categories" button linking to `/category`.
Go to `http://localhost:3000/pancakes/mastering-the-art-of-perfect-pancakes`, click "Save". Click "Saved" in the desktop navbar. Expected: navigates to `/saved`, shows one card for the pancakes recipe.
Resize the browser to mobile width, open the hamburger menu. Expected: "Saved" link is present and navigates to `/saved` on click.

- [ ] **Step 5: Commit**

```bash
git add app/saved/page.js app/components/Header.jsx app/components/MobileMenu.jsx
git commit -m "feat: add /saved page and Saved navbar link"
```

---

## Task 7: Latest recipes page + fix duplicate "Latest Recipes" nav link

**Files:**
- Create: `app/latest/page.js`
- Modify: `app/components/Header.jsx:63-68` ("Latest Recipes" `<Link href="/category">` → `href="/latest"`)
- Modify: `app/components/MobileMenu.jsx:51-56` (same fix)

**Interfaces:**
- Consumes: `RecipeCard` from Task 3.

- [ ] **Step 1: Create `app/latest/page.js`**

```jsx
import recipesData from '../data/recipes.json';
import RecipeCard from '../components/RecipeCard';

const LatestPage = () => {
  const sortedRecipes = [...recipesData].sort(
    (a, b) => new Date(b.published_date) - new Date(a.published_date)
  );

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 md:pt-28 pb-16">
      <div className="mb-10 md:mb-14">
        <span className="badge-amber mb-3 inline-block">Fresh</span>
        <h1 className="section-heading text-4xl md:text-5xl">Latest Recipes</h1>
        <p className="text-muted mt-2">
          {sortedRecipes.length} recipe{sortedRecipes.length !== 1 ? 's' : ''} published
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {sortedRecipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </main>
  );
};

export default LatestPage;
```

- [ ] **Step 2: Fix the desktop nav link**

In `app/components/Header.jsx`, change the "Latest Recipes" `<Link>` (lines 63-68) `href` from `/category` to `/latest`.

- [ ] **Step 3: Fix the mobile nav link**

In `app/components/MobileMenu.jsx`, change the "Latest Recipes" `<Link>` (lines 51-56) `href` from `/category` to `/latest`.

- [ ] **Step 4: Verify manually**

Run: `npm run dev`
Click "Latest Recipes" in the desktop navbar. Expected: URL is `/latest`, grid shows all 25 recipes, the first two cards' recipes have `published_date` values in descending order (spot-check against `app/data/recipes.json`).
Repeat on mobile menu.

- [ ] **Step 5: Commit**

```bash
git add app/latest/page.js app/components/Header.jsx app/components/MobileMenu.jsx
git commit -m "feat: add /latest page, fix Latest Recipes nav link duplicating Categories"
```

---

## Task 8: Search

**Files:**
- Modify: `app/components/Header.jsx` (search icon → inline expanding input, submit navigates to `/search`)
- Modify: `app/components/MobileMenu.jsx` (add search input)
- Create: `app/search/page.js`

**Interfaces:**
- Consumes: `RecipeCard` from Task 3.

- [ ] **Step 1: Add search state and UI to `Header.jsx`**

Add `import { useRouter } from 'next/navigation';` and, inside the component, add state:
```js
const [isSearchOpen, setIsSearchOpen] = useState(false);
const [searchTerm, setSearchTerm] = useState('');
const router = useRouter();
```
Replace the search `<button>` block (lines 74-81) with:
```jsx
{isSearchOpen ? (
  <form
    onSubmit={(e) => {
      e.preventDefault();
      if (!searchTerm.trim()) return;
      router.push(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
      setIsSearchOpen(false);
      setSearchTerm('');
    }}
    className="flex items-center gap-1"
  >
    <input
      type="text"
      autoFocus
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      placeholder="Search recipes..."
      className="input-field h-10 w-40 sm:w-56 text-sm py-0"
    />
    <button
      type="button"
      onClick={() => setIsSearchOpen(false)}
      className="p-2.5 rounded-full hover:bg-cream transition-colors"
      aria-label="Close search"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  </form>
) : (
  <button
    className="p-2.5 rounded-full hover:bg-cream transition-colors"
    aria-label="Search"
    onClick={() => setIsSearchOpen(true)}
  >
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  </button>
)}
```

- [ ] **Step 2: Add search UI to `MobileMenu.jsx`**

Add imports `useState` (from `react`, alongside existing `React` import) and `useRouter` (from `next/navigation`). Inside the component, add:
```js
const [searchTerm, setSearchTerm] = useState('');
const router = useRouter();

const handleSearch = (e) => {
  e.preventDefault();
  if (!searchTerm.trim()) return;
  router.push(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
  setSearchTerm('');
  onClose();
};
```
Inside `<nav className="flex flex-col gap-1 mt-8">`, before the "Home" `<Link>`, add:
```jsx
<form onSubmit={handleSearch} className="mb-4">
  <input
    type="text"
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    placeholder="Search recipes..."
    className="input-field text-sm"
  />
</form>
```

- [ ] **Step 3: Create `app/search/page.js`**

```jsx
'use client';

import { Suspense, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import recipesData from '../data/recipes.json';
import RecipeCard from '../components/RecipeCard';

const SearchResults = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const query = searchParams.get('q') || '';
  const [inputValue, setInputValue] = useState(query);
  const term = query.trim().toLowerCase();

  const results = term
    ? recipesData.filter(
        (recipe) =>
          recipe.title.toLowerCase().includes(term) ||
          recipe.description.toLowerCase().includes(term) ||
          recipe.author.toLowerCase().includes(term)
      )
    : [];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    router.push(`/search?q=${encodeURIComponent(inputValue.trim())}`);
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 md:pt-28 pb-16">
      <div className="mb-10 md:mb-14">
        <span className="badge-amber mb-3 inline-block">Search</span>
        <h1 className="section-heading text-4xl md:text-5xl mb-6">
          {query ? `Results for "${query}"` : 'Search recipes'}
        </h1>
        <form onSubmit={handleSubmit} className="flex gap-3 max-w-md">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Search recipes..."
            className="input-field flex-1"
          />
          <button type="submit" className="btn-primary shrink-0">Search</button>
        </form>
        <p className="text-muted mt-4">
          {results.length} recipe{results.length !== 1 ? 's' : ''} found
        </p>
      </div>

      {results.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {results.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-muted text-lg">
            {query ? `No recipes match "${query}".` : 'Type a search term to find recipes.'}
          </p>
        </div>
      )}
    </main>
  );
};

const SearchPage = () => (
  <Suspense fallback={null}>
    <SearchResults />
  </Suspense>
);

export default SearchPage;
```

(`useSearchParams` requires a `Suspense` boundary in the App Router — without it, `next build` fails.)

- [ ] **Step 4: Verify manually**

Run: `npm run dev`
Desktop: click the search icon in the navbar, type "pancake", press Enter. Expected: navigates to `/search?q=pancake`, shows a card for "Mastering the Art of Perfect Pancakes", result count reads "1 recipe found".
Mobile: resize below 768px, open the hamburger menu, type "cake" in the search input, submit. Expected: menu closes, navigates to `/search?q=cake`, shows matching cards (e.g. "Delicious Cake Recipes for Every Celebration", "Decadent Chocolate Lava Cake").
On the `/search` page, use its own input to search "zzzznomatch". Expected: "No recipes match "zzzznomatch"." and "0 recipes found".

- [ ] **Step 5: Commit**

```bash
git add app/components/Header.jsx app/components/MobileMenu.jsx app/search/page.js
git commit -m "feat: wire up navbar search and add /search results page"
```

---

## Task 9: Footer — real pages + real links

**Files:**
- Create: `app/components/StaticPage.jsx`
- Create: `app/about/page.js`, `app/careers/page.js`, `app/contact/page.js`, `app/feedback/page.js`, `app/terms/page.js`, `app/conditions/page.js`, `app/cookies/page.js`, `app/copyright/page.js`
- Modify: `app/components/Footer.jsx`

**Interfaces:**
- Produces: `StaticPage` default export, props `{ eyebrow: string, title: string, children: ReactNode }` — shared layout for all 8 footer pages.

- [ ] **Step 1: Create the shared `StaticPage` layout component**

```jsx
// app/components/StaticPage.jsx
const StaticPage = ({ eyebrow, title, children }) => (
  <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 md:pt-28 pb-16">
    <span className="badge-amber mb-3 inline-block">{eyebrow}</span>
    <h1 className="section-heading text-4xl md:text-5xl mb-6">{title}</h1>
    <div className="text-muted leading-relaxed space-y-4">{children}</div>
  </main>
);

export default StaticPage;
```

- [ ] **Step 2: Create the 8 footer pages**

```jsx
// app/about/page.js
import StaticPage from '../components/StaticPage';

const AboutPage = () => (
  <StaticPage eyebrow="Our Story" title="About Us">
    <p>
      LWS Kitchen started as a small collection of family recipes and grew into a home
      for cooks who love good food without the fuss. We believe great meals come from
      simple ingredients, clear instructions, and a bit of curiosity.
    </p>
    <p>
      Every recipe on this site is tested, tasted, and written by people who actually
      cook. Our mission is to make your time in the kitchen easier and more enjoyable,
      one dish at a time.
    </p>
  </StaticPage>
);

export default AboutPage;
```

```jsx
// app/careers/page.js
import StaticPage from '../components/StaticPage';

const CareersPage = () => (
  <StaticPage eyebrow="Join Us" title="Careers">
    <p>
      We&apos;re a small team obsessed with food and good design. We&apos;re not
      actively hiring right now, but we&apos;re always happy to hear from people who
      share our love of cooking.
    </p>
    <p>
      If that&apos;s you, reach out through our{' '}
      <a href="/contact" className="text-amber-dark hover:underline">contact page</a>{' '}
      and tell us what you&apos;d bring to the kitchen.
    </p>
  </StaticPage>
);

export default CareersPage;
```

```jsx
// app/contact/page.js
import StaticPage from '../components/StaticPage';

const ContactPage = () => (
  <StaticPage eyebrow="Get in Touch" title="Contact Us">
    <p>
      Have a question about a recipe, a partnership idea, or just want to say hello?
      We&apos;d love to hear from you.
    </p>
    <p>
      Email us anytime at{' '}
      <span className="text-ink font-medium">hello@lwskitchen.example</span> and
      we&apos;ll get back to you as soon as we can.
    </p>
  </StaticPage>
);

export default ContactPage;
```

```jsx
// app/feedback/page.js
import StaticPage from '../components/StaticPage';

const FeedbackPage = () => (
  <StaticPage eyebrow="We're Listening" title="Feedback">
    <p>
      LWS Kitchen gets better with every suggestion from people who actually use it.
      Found a bug, have an idea, or think a recipe needs work? Tell us.
    </p>
    <p>
      Send your thoughts to{' '}
      <span className="text-ink font-medium">feedback@lwskitchen.example</span> —
      every message gets read.
    </p>
  </StaticPage>
);

export default FeedbackPage;
```

```jsx
// app/terms/page.js
import StaticPage from '../components/StaticPage';

const TermsPage = () => (
  <StaticPage eyebrow="Legal" title="Terms of Service">
    <p>
      By using LWS Kitchen, you agree to use the site and its content for personal,
      non-commercial purposes. Recipes and articles are provided for informational
      purposes and cooking results may vary.
    </p>
    <p>
      We may update these terms from time to time. Continued use of the site means
      you accept the current version.
    </p>
  </StaticPage>
);

export default TermsPage;
```

```jsx
// app/conditions/page.js
import StaticPage from '../components/StaticPage';

const ConditionsPage = () => (
  <StaticPage eyebrow="Legal" title="Conditions of Use">
    <p>
      You agree not to misuse LWS Kitchen: no scraping content at scale, no attempting
      to disrupt the site, and no republishing our recipes as your own without credit.
    </p>
    <p>
      We reserve the right to update the site&apos;s content and features at any time
      without notice.
    </p>
  </StaticPage>
);

export default ConditionsPage;
```

```jsx
// app/cookies/page.js
import StaticPage from '../components/StaticPage';

const CookiesPage = () => (
  <StaticPage eyebrow="Legal" title="Cookie Policy">
    <p>
      LWS Kitchen keeps things simple: your saved recipes are stored locally in your
      browser so they&apos;re there next time you visit. We don&apos;t use
      third-party tracking cookies.
    </p>
    <p>
      You can clear this data anytime by clearing your browser&apos;s local storage
      for this site.
    </p>
  </StaticPage>
);

export default CookiesPage;
```

```jsx
// app/copyright/page.js
import StaticPage from '../components/StaticPage';

const CopyrightPage = () => (
  <StaticPage eyebrow="Legal" title="Copyright">
    <p>
      &copy; {new Date().getFullYear()} LWS Kitchen. All recipes, photos, and written
      content on this site are the property of LWS Kitchen unless otherwise noted.
    </p>
    <p>
      You&apos;re welcome to share a link to our recipes. Please don&apos;t republish
      full recipe text or photos without permission.
    </p>
  </StaticPage>
);

export default CopyrightPage;
```

- [ ] **Step 3: Point the footer's text links at the real pages**

In `app/components/Footer.jsx`, replace the plain string arrays with `{label, href}` arrays and switch from `<a href="#">` to `<Link>` (already imported in this file):

Replace:
```jsx
{['About us', 'Careers', 'Contact us', 'Feedback'].map((item) => (
  <li key={item}>
    <a href="#" className="text-sm hover:text-amber transition-colors duration-200">
      {item}
    </a>
  </li>
))}
```
with:
```jsx
{[
  { label: 'About us', href: '/about' },
  { label: 'Careers', href: '/careers' },
  { label: 'Contact us', href: '/contact' },
  { label: 'Feedback', href: '/feedback' },
].map((item) => (
  <li key={item.label}>
    <Link href={item.href} className="text-sm hover:text-amber transition-colors duration-200">
      {item.label}
    </Link>
  </li>
))}
```

Replace:
```jsx
{['Terms', 'Conditions', 'Cookies', 'Copyright'].map((item) => (
  <li key={item}>
    <a href="#" className="text-sm hover:text-amber transition-colors duration-200">
      {item}
    </a>
  </li>
))}
```
with:
```jsx
{[
  { label: 'Terms', href: '/terms' },
  { label: 'Conditions', href: '/conditions' },
  { label: 'Cookies', href: '/cookies' },
  { label: 'Copyright', href: '/copyright' },
].map((item) => (
  <li key={item.label}>
    <Link href={item.href} className="text-sm hover:text-amber transition-colors duration-200">
      {item.label}
    </Link>
  </li>
))}
```

- [ ] **Step 4: Point social icons at real external URLs**

In the same file, change the social icons array to include a `url`, and update the `<a>` to use it with `target="_blank"`:
```jsx
{[
  { name: 'Facebook', url: 'https://facebook.com', path: 'M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z' },
  { name: 'Twitter', url: 'https://x.com', path: 'M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z' },
  { name: 'Instagram', url: 'https://instagram.com', path: 'M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01M6.5 3h11A3.5 3.5 0 0121 6.5v11a3.5 3.5 0 01-3.5 3.5h-11A3.5 3.5 0 013 17.5v-11A3.5 3.5 0 016.5 3z' },
  { name: 'Youtube', url: 'https://youtube.com', path: 'M22.54 6.42a2.78 2.78 0 00-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 2A29 29 0 001 11.75a29 29 0 00.46 5.33A2.78 2.78 0 003.4 19.1c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 001.94-2 29 29 0 00.46-5.25 29 29 0 00-.46-5.43zM9.75 15.02V8.48l5.75 3.27-5.75 3.27z' },
].map((social) => (
  <a
    key={social.name}
    href={social.url}
    target="_blank"
    rel="noopener noreferrer"
    className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center
      hover:bg-amber hover:text-ink transition-all duration-300"
    aria-label={social.name}
  >
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d={social.path} />
    </svg>
  </a>
))}
```

- [ ] **Step 5: Verify manually**

Run: `npm run dev`
Scroll to the footer on any page. Click each of the 8 text links ("About us", "Careers", "Contact us", "Feedback", "Terms", "Conditions", "Cookies", "Copyright"). Expected: each navigates to its own route and shows real placeholder content (not a blank page, not `#`).
Click each of the 4 social icons. Expected: opens the corresponding real platform home page in a new tab.

- [ ] **Step 6: Commit**

```bash
git add app/components/StaticPage.jsx app/about app/careers app/contact app/feedback app/terms app/conditions app/cookies app/copyright app/components/Footer.jsx
git commit -m "feat: add static footer pages, point footer links and social icons at real destinations"
```

---

## Final verification

- [ ] Run `npm run build` — confirm the whole app builds with no errors (this catches the `useSearchParams`/Suspense requirement and any typos across all 9 tasks).
- [ ] Run `npm run dev` and click through: a PDP's Share + Save buttons, the navbar Saved/Latest/Search entries (desktop and mobile), and every footer link — confirming nothing is a dead `#` link anymore.
