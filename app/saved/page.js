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
