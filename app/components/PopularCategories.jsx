import Image from 'next/image';
import React from 'react';
import Link from 'next/link';
import categoriesData from '../data/categories.json';
import recipeData from '../data/recipes.json';

const PopularCategories = () => {
  const categoryCounts = categoriesData.map(category => {
    const recipeCount = recipeData.filter(recipe => recipe.category_id === category.id).length;
    return { ...category, recipeCount };
  });

  const popularCategories = categoryCounts
    .sort((a, b) => b.recipeCount - a.recipeCount)
    .slice(0, 6);

  return (
    <section className="mb-16 md:mb-24">
      <div className="flex items-end justify-between mb-8 md:mb-12">
        <div>
          <span className="badge-amber mb-3 inline-block">Browse by Type</span>
          <h2 className="section-heading">Popular Categories</h2>
        </div>
        <Link
          href="/category"
          className="text-sm font-medium text-amber-dark hover:text-terracotta transition-colors hidden sm:inline-flex items-center gap-1"
        >
          View All
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-6 gap-4 md:gap-6">
        {popularCategories.map(category => (
          <Link
            key={category.id}
            href={`/recipes/${category.id}`}
            className="group text-center"
          >
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 mx-auto mb-3 rounded-full overflow-hidden ring-2 ring-divider group-hover:ring-amber transition-all duration-300">
              <Image
                src={`/assets${category.image}`}
                alt={category.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <p className="text-sm font-medium text-ink group-hover:text-amber-dark transition-colors">
              {category.name}
            </p>
            <p className="text-xs text-muted mt-0.5">
              {category.recipeCount} recipes
            </p>
          </Link>
        ))}
      </div>

      {/* Mobile "View All" link */}
      <div className="mt-6 text-center sm:hidden">
        <Link href="/category" className="text-sm font-medium text-amber-dark inline-flex items-center gap-1">
          View All Categories
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </section>
  );
};

export default PopularCategories;
