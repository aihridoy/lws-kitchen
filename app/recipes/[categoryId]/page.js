import React from 'react';
import recipesData from '../../data/recipes.json';
import categoriesData from '../../data/categories.json';
import Link from 'next/link';
import RecipeCard from '../../components/RecipeCard';

const Recipes = ({ params }) => {
  const { categoryId } = params;
  const category = categoriesData.find((c) => c.id === categoryId);
  const filteredRecipes = recipesData.filter(
    (recipe) => recipe.category_id === categoryId
  );

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 md:pt-28 pb-16">
      {/* Header */}
      <div className="mb-10 md:mb-14">
        <span className="badge-amber mb-3 inline-block">Recipes</span>
        <h1 className="section-heading text-4xl md:text-5xl">
          {category ? category.name : 'Category'}
        </h1>
        <p className="text-muted mt-2">
          {filteredRecipes.length} recipe{filteredRecipes.length !== 1 ? 's' : ''} available
        </p>
      </div>

      {/* Recipe grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredRecipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>

      {/* Empty state */}
      {filteredRecipes.length === 0 && (
        <div className="text-center py-20">
          <p className="text-muted text-lg mb-4">No recipes found in this category.</p>
          <Link href="/" className="btn-primary">Browse All Recipes</Link>
        </div>
      )}
    </main>
  );
};

export default Recipes;
