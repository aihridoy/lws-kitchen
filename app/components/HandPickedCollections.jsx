import Image from 'next/image';
import React from 'react';
import categoriesData from '../data/categories.json';
import Link from 'next/link';

const HandPickedCollections = () => {
  const handPickedRecipes = [
    categoriesData[2],
    categoriesData[9]
  ];

  return (
    <section className="mb-16 md:mb-24">
      <div className="mb-8 md:mb-12">
        <span className="badge-sage mb-3 inline-block">Curated for You</span>
        <h2 className="section-heading">Hand-Picked Collections</h2>
      </div>

      <div className="grid md:grid-cols-2 gap-6 md:gap-8">
        {handPickedRecipes.map((recipe) => (
          <Link
            href={`/recipes/${recipe.id}`}
            key={recipe.id}
            className="group relative aspect-[4/3] md:aspect-[3/2] rounded-3xl overflow-hidden"
          >
            <Image
              src={`/assets${recipe.image}`}
              alt={recipe.name}
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

            {/* Content overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 transform transition-all duration-300">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                {recipe.name}
              </h3>
              <div className="flex items-center gap-2 text-white/80 group-hover:text-amber-light transition-colors">
                <span className="text-sm font-medium">View Collection</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default HandPickedCollections;
