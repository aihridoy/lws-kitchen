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
        <section className="mb-16">
            <div className="flex justify-between items-top">
                <h2 className="text-3xl font-bold mb-8">Popular Categories</h2>
                <Link href="/category" className="text-orange-500">View All</Link>
            </div>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
                {popularCategories.map(category => (
                    <div key={category.id}
                        className="cursor-pointer text-center group">
                        <Link
                            href={`/recipes/${category.id}`}
                        >
                            <div>
                                <div className="overflow-hidden rounded-full mb-2 w-20 h-20 mx-auto">
                                    <Image
                                        src={`/assets${category.image}`}
                                        alt={category.name}
                                        width={300}
                                        height={300}
                                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                                    />
                                </div>
                                <p className="transition-transform duration-300 group-hover:scale-105">
                                    {category.name} ({category.recipeCount})
                                </p>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default PopularCategories;
