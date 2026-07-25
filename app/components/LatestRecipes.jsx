import Image from 'next/image';
import React from 'react';
import recipesData from '../data/recipes.json';
import categoriesData from '../data/categories.json';
import Link from 'next/link';

const LatestRecipes = () => {
  const sortedRecipes = [...recipesData].sort((a, b) => new Date(b.published_date) - new Date(a.published_date));
  const latestRecipes = sortedRecipes.slice(0, 4);

  const getCategoryName = (categoryId) => {
    const category = categoriesData.find((cat) => cat.id === categoryId);
    return category ? category.name.toLowerCase() : 'unknown';
  };

  const getCategoryLabel = (categoryId) => {
    const category = categoriesData.find((cat) => cat.id === categoryId);
    return category ? category.name : 'Unknown';
  };

  return (
    <section className="mb-16 md:mb-24">
      <div className="flex items-end justify-between mb-8 md:mb-12">
        <div>
          <span className="badge-amber mb-3 inline-block">Just In</span>
          <h2 className="section-heading">Latest Recipes</h2>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {latestRecipes.map((recipe) => (
          <Link
            href={`/${getCategoryName(recipe.category_id)}/${recipe.id}`}
            key={recipe.id}
            className="card group"
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src={`/assets/thumbs/${recipe.thumbnail}`}
                fill
                className="card-image"
                alt={recipe.title}
              />
              {/* Category tag */}
              <div className="absolute top-3 left-3 badge bg-ink/70 backdrop-blur-sm text-white text-[10px]">
                {getCategoryLabel(recipe.category_id)}
              </div>
            </div>

            <div className="p-4">
              <h3 className="font-semibold text-ink mb-1.5 group-hover:text-amber-dark transition-colors line-clamp-2">
                {recipe.title}
              </h3>
              <p className="text-sm text-muted line-clamp-2">
                {recipe.description}
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
    </section>
  );
};

export default LatestRecipes;
