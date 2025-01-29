import Image from 'next/image';
import React from 'react';
import recipesData from '../../data/recipes.json';
import categoriesData from '../../data/categories.json';
import Link from 'next/link';

const Recipes = ({ params }) => {
    const { categoryId } = params;
    const category = categoriesData.find((c) => c.id === categoryId);
    const filteredRecipes = recipesData.filter(
        (recipe) => recipe.category_id === categoryId
    );

    const getCategoryName = (categoryId) => {
        const category = categoriesData.find((cat) => cat.id === categoryId);
        return category ? category.name.toLowerCase() : 'unknown';
    };

    return (
        <main className="container mx-auto px-4 py-8 mt-[100px]">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-4xl font-bold mb-2">
                        {category.name}
                        {filteredRecipes.length > 0 ? filteredRecipes[0].category : 'Category'}{' '}
                        <span className="text-gray-500 text-2xl font-normal">
                            ({filteredRecipes.length} Recipes)
                        </span>
                    </h1>
                    <p className="text-gray-600">
                        Discover the best recipes in this category.
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {filteredRecipes.map((recipe) => (
                    <Link href={`/${getCategoryName(recipe.category_id)}/${recipe.category_id}`}
                        key={recipe.title}
                        className="bg-white rounded-lg overflow-hidden shadow-md"
                    >
                        <Image
                            src={`/assets/thumbs/${recipe.thumbnail}`}
                            alt={recipe.title}
                            width={500}
                            height={500}
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-4">
                            <h2 className="font-semibold text-lg mb-2">{recipe.title}</h2>
                            <p className="text-sm text-gray-600">
                                {recipe.description.substring(0, 50)}...
                            </p>
                        </div>
                    </Link>
                ))}
            </div>
        </main>
    );
};

export default Recipes;