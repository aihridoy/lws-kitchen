import Image from 'next/image';
import React from 'react';
import recipesData from '../data/recipes.json';
import categoriesData from '../data/categories.json';
import Link from 'next/link';

const LatestRecipes = () => {
    const sortedRecipes = recipesData.sort((a, b) => new Date(b.published_date) - new Date(a.published_date));
    const latestRecipes = sortedRecipes.slice(0, 4);

    const getCategoryName = (categoryId) => {
        const category = categoriesData.find((cat) => cat.id === categoryId);
        return category ? category.name.toLowerCase() : 'unknown';
    };

    return (
        <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8">Latest Recipes</h2>
            <div className="grid md:grid-cols-4 gap-8">
                {latestRecipes.map((recipe) => (
                    <div key={recipe.id} className="relative">
                        <Link href={`/${getCategoryName(recipe.category_id)}/${recipe.category_id}`} passHref>
                            <div className="cursor-pointer">
                                <Image
                                    src={`/assets/thumbs/${recipe.thumbnail}`}
                                    width={500}
                                    height={500}
                                    alt={recipe.name}
                                    className="w-full h-[300px] object-cover rounded-lg mb-4"
                                />
                                <h3 className="text-lg font-semibold mb-2">{recipe.title}</h3>
                                {/* <p className="text-gray-600">{recipe.category}</p> */}
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default LatestRecipes;
