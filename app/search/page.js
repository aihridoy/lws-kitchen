'use client';

import { Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import recipesData from '../data/recipes.json';
import RecipeCard from '../components/RecipeCard';

const SearchResults = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const query = searchParams.get('q') || '';
  const [inputValue, setInputValue] = useState(query);
  const term = query.trim().toLowerCase();

  useEffect(() => {
    setInputValue(query);
  }, [query]);

  const results = term
    ? recipesData.filter(
        (recipe) =>
          recipe.title.toLowerCase().includes(term) ||
          recipe.description.toLowerCase().includes(term) ||
          recipe.author.toLowerCase().includes(term)
      )
    : [];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    router.push(`/search?q=${encodeURIComponent(inputValue.trim())}`);
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 md:pt-28 pb-16">
      <div className="mb-10 md:mb-14">
        <span className="badge-amber mb-3 inline-block">Search</span>
        <h1 className="section-heading text-4xl md:text-5xl mb-6">
          {query ? `Results for "${query}"` : 'Search recipes'}
        </h1>
        <form onSubmit={handleSubmit} className="flex gap-3 max-w-md">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Search recipes..."
            className="input-field flex-1"
          />
          <button type="submit" className="btn-primary shrink-0">Search</button>
        </form>
        <p className="text-muted mt-4">
          {results.length} recipe{results.length !== 1 ? 's' : ''} found
        </p>
      </div>

      {results.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {results.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-muted text-lg">
            {query ? `No recipes match "${query}".` : 'Type a search term to find recipes.'}
          </p>
        </div>
      )}
    </main>
  );
};

const SearchPage = () => (
  <Suspense fallback={null}>
    <SearchResults />
  </Suspense>
);

export default SearchPage;
