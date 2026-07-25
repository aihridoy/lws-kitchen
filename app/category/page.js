'use client';

import Image from 'next/image';
import React from 'react';
import categoriesData from '../data/categories.json';
import { useRouter } from 'next/navigation';

const Category = () => {
  const router = useRouter();

  const handleCategoryClick = (categoryId) => {
    router.push(`/recipes/${categoryId}`);
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 md:pt-28 pb-16">
      <div className="mb-10 md:mb-14">
        <span className="badge-amber mb-3 inline-block">Explore</span>
        <h1 className="section-heading text-4xl md:text-5xl">Categories</h1>
        <p className="text-muted mt-2">Browse all recipe categories</p>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-6 md:gap-8">
        {categoriesData.map(category => (
          <div
            key={category.id}
            className="text-center group cursor-pointer"
            onClick={() => handleCategoryClick(category.id)}
          >
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 mx-auto mb-3 rounded-full overflow-hidden ring-2 ring-divider group-hover:ring-amber group-hover:shadow-medium transition-all duration-300">
              <Image
                src={`/assets${category.image}`}
                alt={category.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <h2 className="text-sm md:text-base font-semibold text-ink group-hover:text-amber-dark transition-colors">
              {category.name}
            </h2>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Category;
