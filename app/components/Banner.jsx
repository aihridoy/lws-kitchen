/* eslint-disable react/no-unescaped-entities */
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
        <section className="mb-16 bg-orange-50">
            <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="relative w-full h-[450px] rounded-lg overflow-hidden">
                    <Image
                        src={`/assets/thumbs/${recipe.thumbnail}`}
                        alt="Mighty Super Cheesecake"
                        layout="fill"
                        objectFit="cover"
                    />
                </div>
                <div>
                    <h1 className="text-4xl font-bold mb-4">{recipe.title}</h1>
                    <p className="text-gray-600 mb-4">
                        {recipe.description}
                    </p>
                    <Link href={`/${getCategoryName(recipe.category_id)}/${recipe.category_id}`}
                        className="bg-orange-500 text-white px-6 py-2 rounded-full inline-block hover:bg-orange-600">View Recipe</Link>
                </div>
            </div>
        </section>
    );
};

export default Banner;