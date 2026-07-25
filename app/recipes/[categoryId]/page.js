import Image from 'next/image';
import React from 'react';
import recipesData from '../../data/recipes.json';
import categoriesData from '../../data/categories.json';
import Link from 'next/link';

const Recipes = ({ params }) => {
  const { categoryId } = params;
  const category = categoriesData.find((c) => c.id === categoryId);
  const filteredRecipes = recipesData.filter(
    (recipe) => recipe.category_id === categoryId
  );

  const getCategoryName = (categoryId) => {
    const category = categoriesData.find((cat) => cat.id === categoryId);
    return category ? category.name.toLowerCase() : 'unknown';
  };

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
          <Link
            href={`/${getCategoryName(recipe.category_id)}/${recipe.category_id}`}
            key={recipe.title}
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
