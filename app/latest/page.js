import recipesData from '../data/recipes.json';
import RecipeCard from '../components/RecipeCard';

const LatestPage = () => {
  const sortedRecipes = [...recipesData].sort(
    (a, b) => new Date(b.published_date) - new Date(a.published_date)
  );

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 md:pt-28 pb-16">
      <div className="mb-10 md:mb-14">
        <span className="badge-amber mb-3 inline-block">Fresh</span>
        <h1 className="section-heading text-4xl md:text-5xl">Latest Recipes</h1>
        <p className="text-muted mt-2">
          {sortedRecipes.length} recipe{sortedRecipes.length !== 1 ? 's' : ''} published
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {sortedRecipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </main>
  );
};

export default LatestPage;
