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
        <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 animate-fade-in-down">Hand-Picked Collections</h2>
            <div className="grid md:grid-cols-2 gap-8">
                {handPickedRecipes.map((recipe) => (
                    <Link href={`/recipes/${recipe.id}`} key={recipe.id} className="relative group overflow-hidden rounded-lg transition-transform duration-300 ease-in-out transform cursor-pointer">
                        <Image
                            src={`/assets${recipe.image}`}
                            alt={recipe.name}
                            width={500}
                            height={500}
                            className="w-full h-[400px] rounded-lg object-cover transition-transform duration-300 ease-in-out transform group-hover:scale-110"
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4 rounded-b-lg transition-all duration-300 ease-in-out transform translate-y-full group-hover:translate-y-0">
                            <h3 className="text-xl font-semibold mb-2">{recipe.name}</h3>
                            <a href="./recipes.html" className="text-orange-300 hover:underline">View Collection</a>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
};

export default HandPickedCollections;
