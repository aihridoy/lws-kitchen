import React from 'react';
import Image from 'next/image';
import recipeData from '../data/recipes.json';
import categoriesData from '../data/categories.json';
import Link from 'next/link';

const Banner = () => {
  const recipe = recipeData[Math.floor(Math.random() * 9 + 1)];

  const getCategoryName = (categoryId) => {
    const category = categoriesData.find((cat) => cat.id === categoryId);
    return category ? category.name.toLowerCase() : 'unknown';
  };

  return (
    <section className="mb-16 md:mb-24">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 items-stretch">
        {/* Image */}
        <div className="relative w-full min-w-0 min-h-[300px] md:min-h-[450px] rounded-3xl overflow-hidden group">
          <Image
            src={`/assets/thumbs/${recipe.thumbnail}`}
            alt={recipe.title}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            priority
          />
          {/* Warm gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-ink/10 to-transparent" />
          {/* Cooking time badge */}
          <div className="absolute top-4 left-4 badge-amber">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {recipe.cooking_time}
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col justify-center py-4 md:py-8 min-w-0">
          <span className="badge-amber w-fit mb-4 text-xs">Featured Recipe</span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-ink leading-tight mb-4 md:mb-6 text-balance">
            {recipe.title}
          </h1>
          <p className="text-muted text-base md:text-lg leading-relaxed mb-6 md:mb-8 max-w-lg">
            {recipe.description}
          </p>
          <div>
            <Link
              href={`/${getCategoryName(recipe.category_id)}/${recipe.category_id}`}
              className="btn-primary inline-flex items-center gap-2"
            >
              View Recipe
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
