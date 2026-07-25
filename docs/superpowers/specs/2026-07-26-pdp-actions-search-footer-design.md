# Design: PDP share/save, saved-recipes nav, working search, live footer links

Date: 2026-07-26

## Background

Four requests:
1. On a recipe detail page (PDP, e.g. `/pancakes/<id>`), the Share button should copy the PDP link; the Save button should persist the recipe, with a new navbar menu to view saved recipes.
2. Search is currently a dead icon in the navbar with no wiring.
3. Every footer link (except the logo) is `href="#"`.

Investigation surfaced two pre-existing bugs that block a correct implementation and are fixed as part of this work:

- **Data corruption in `app/data/recipes.json`**: the JSON array has 25 real recipe objects followed by a 26th element that is itself an array of 10 more recipe objects. Those 10 are exact duplicates (identical `title`, `category_id`) of 10 of the 25 real recipes — a copy-paste accident. Because all app code does `recipesData.filter(...)`/`.find(...)` on the top-level array expecting flat dicts, those 10 nested duplicates are already completely invisible to category pages, the PDP, and would remain invisible to search. Fix: delete the nested array.
- **No stable unique recipe id**: `category_id` is used both as the category-grouping foreign key (many recipes legitimately share one) and, in `app/[category]/[recipe]/page.js` and `app/recipes/[categoryId]/page.js`, as the "unique" id in the PDP URL. Several categories have 2+ real recipes, so `recipeData.find(r => r.category_id === recipeId)` returns the wrong recipe for some URLs today. This also means there is no safe key to use for "saved recipe" bookmarks. Fix: add a real unique `id` field (slug of the title) to each recipe; keep `category_id` untouched for category grouping.

## Scope

App Router Next.js 14 app, static JSON data source (`app/data/recipes.json`, `app/data/categories.json`), no backend/DB/auth. No new npm dependencies — all icons in the codebase are already inline SVG; state persistence uses `localStorage` since nothing else exists (no context/redux/zustand currently in the app).

## 1. Data layer fix

- `app/data/recipes.json`: remove the malformed nested array (former index 25). Add a unique `id` field to each of the 25 recipes: a slug derived from `title` (lowercase, hyphenated, e.g. `mastering-the-art-of-perfect-pancakes`). `category_id` is untouched.
- `app/[category]/[recipe]/page.js`: recipe lookup switches from `recipe.category_id === recipeId` to `recipe.id === recipeId`. `params.category` continues to be used only for display/breadcrumb purposes (unused today beyond that).
- `app/recipes/[categoryId]/page.js`: card `href` changes from `/${categoryName}/${recipe.category_id}` to `/${categoryName}/${recipe.id}`. `key` prop changes from `recipe.title` to `recipe.id`.

Result: PDP URLs like `/pancakes/mastering-the-art-of-perfect-pancakes` become stable and unambiguous; every recipe is reachable.

## 2. Save/share state layer

- `app/lib/savedRecipes.js` — plain (non-React) helpers around `localStorage`, key `lws-kitchen:saved-recipes`, value a JSON array of recipe `id` strings:
  - `getSavedIds()` — read + parse, `[]` on missing/invalid.
  - `toggleSaved(id)` — add/remove id, write back, return new array.
- `app/context/SavedRecipesContext.jsx` — `'use client'` provider. Hydrates `savedIds` (as a `Set`) from `getSavedIds()` in a `useEffect` (avoids SSR/client markup mismatch — starts as empty `Set` on first render, then hydrates). Exposes `{ savedIds, isSaved(id), toggleSaved(id) }` via `useContext` hook `useSavedRecipes()`. Every `toggleSaved` call writes through to `localStorage` immediately.
- `app/layout.js` — wrap children in `<SavedRecipesProvider>`.
- `app/components/RecipeCard.jsx` — new shared component extracted from the card markup duplicated today in `app/recipes/[categoryId]/page.js` (image, title, description excerpt, cooking time). Takes a `recipe` prop, builds its own `href` from `recipe.id` + category lookup. Used by the category list page (replacing inline markup) and by the three new pages below.

## 3. PDP actions, Saved page, Latest page

- `app/[category]/[recipe]/page.js` stays a server component; its existing (non-functional) Share/Save buttons move into a new client component `app/components/PdpActions.jsx`, passed the current `recipe` (or just its `id`/computed URL).
  - **Share**: `navigator.clipboard.writeText(window.location.href)` on click; button label swaps to "Copied!" for 2 seconds then reverts (same inline-confirmation pattern already used in `NewsLetter.jsx`). No new toast component.
  - **Save**: calls `toggleSaved(recipe.id)` from `useSavedRecipes()`; label/icon toggle between "Save" and "Saved" (icon fill state) based on `isSaved(recipe.id)`.
- `app/components/Header.jsx` / `app/components/MobileMenu.jsx`: add a "Saved" nav item linking to `/saved`. Fix the existing "Latest Recipes" item, which currently points to the same `/category` URL as "Categories" (dead-code duplicate) — it now points to `/latest`.
- `app/saved/page.js` — client component. Reads `savedIds` from context, filters the full recipe list to those ids, renders a `RecipeCard` grid (same grid classes as the category list page). Empty state: "No saved recipes yet" + link to `/category`.
- `app/latest/page.js` — server component. All recipes sorted by `published_date` descending, rendered via `RecipeCard` grid.

## 4. Search

- `app/components/Header.jsx`: clicking the existing search icon toggles an inline expanding text input (desktop). Submitting (Enter or a small submit affordance) navigates to `/search?q=<term>`.
- `app/components/MobileMenu.jsx`: add a search input (there is none today), same submit behavior.
- `app/search/page.js` — client component (`useSearchParams` requires client). Reads `q`, filters the full recipe list where `title`, `description`, or `author` case-insensitively includes `q`. Renders `RecipeCard` grid. Has its own input to refine/re-run the query without going back to the navbar. Empty state: "No recipes match "{q}"".

## 5. Footer links

- `app/components/Footer.jsx`: the "LWS Kitchen" column (`About us`, `Careers`, `Contact us`, `Feedback`) and "Legal" column (`Terms`, `Conditions`, `Cookies`, `Copyright`) currently map over plain string arrays rendering `href="#"`. Each becomes a real internal route:
  - `app/about/page.js`, `app/careers/page.js`, `app/contact/page.js`, `app/feedback/page.js`, `app/terms/page.js`, `app/conditions/page.js`, `app/cookies/page.js`, `app/copyright/page.js` — server components, minimal on-brand placeholder content (heading + a few short paragraphs) using existing typography classes (`section-heading`, `.text-muted`, etc). No forms/backend for `contact`/`feedback` — static informational copy only, consistent with the rest of the app having no backend.
- Social icons (Facebook/Twitter/Instagram/Youtube) link to the real platform home URLs (`https://facebook.com`, `https://x.com`, `https://instagram.com`, `https://youtube.com`) since there are no real brand accounts to link to; `target="_blank" rel="noopener noreferrer"`.

## Testing

- Manual verification in browser (dev server): visit a PDP, click Share (confirm clipboard contains correct URL, label flips), click Save (confirm it appears on `/saved`, persists across reload), use navbar search (desktop + mobile) with a matching and non-matching term, click every footer link and confirm it lands on real content, confirm `/latest` and `/saved` nav items work and no longer collide with `/category`.
- No existing test suite in the repo (`package.json` has no test script) — this stays consistent with that; no test framework introduced for this change.

## Out of scope

- No backend/API for contact/feedback forms (static pages only).
- No cross-device sync for saved recipes (localStorage is per-browser by design, per earlier decision).
- No search relevance ranking/fuzzy matching — plain substring match.
