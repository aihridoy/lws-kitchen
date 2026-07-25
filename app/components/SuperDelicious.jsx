import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import recipeData from '../data/recipes.json';
import categoriesData from '../data/categories.json';

const SuperDelicious = () => {
  const topRecipes = [...recipeData]
    .sort((a, b) => b?.rating?.rating_count - a?.rating?.rating_count)
    .slice(0, 3);

  const getCategoryName = (categoryId) => {
    const category = categoriesData.find((cat) => cat.id === categoryId);
    return category ? category.name.toLowerCase() : 'unknown';
  };

  return (
    <section className="mb-16 md:mb-24" id="super_delicious">
      <div className="flex items-end justify-between mb-8 md:mb-12">
        <div>
          <span className="badge-sage mb-3 inline-block">Top Rated</span>
          <h2 className="section-heading">Super Delicious</h2>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {topRecipes?.map((recipe, index) => (
          <Link
            key={recipe.title}
            href={`/${getCategoryName(recipe.category_id)}/${recipe.category_id}`}
            className="card group"
          >
            {/* Image */}
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src={`/assets/thumbs/${recipe.thumbnail}`}
                fill
                className="card-image"
                alt={recipe.title}
              />
              {/* Rank badge */}
              <div className="absolute top-3 left-3 w-8 h-8 rounded-full bg-ink/70 backdrop-blur-sm text-white text-sm font-bold flex items-center justify-center">
                {index + 1}
              </div>
            </div>

            {/* Content */}
            <div className="p-5">
              <h3 className="text-lg font-semibold text-ink mb-2 group-hover:text-amber-dark transition-colors">
                {recipe.title}
              </h3>

              {/* Star rating */}
              <div className="flex items-center gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 20 20"
                    fill={i < recipe.rating.average_rating ? '#e8a838' : '#e8e4dc'}
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="text-xs text-muted ml-1">({recipe.rating.rating_count})</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-sm text-muted">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {recipe.cooking_time}
                </div>
                <span className="text-sm font-medium text-amber-dark group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                  View
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default SuperDelicious;
