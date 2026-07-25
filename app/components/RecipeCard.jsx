import Image from 'next/image';
import Link from 'next/link';
import categoriesData from '../data/categories.json';

const getCategoryName = (categoryId) => {
  const category = categoriesData.find((cat) => cat.id === categoryId);
  return category ? category.name.toLowerCase() : 'unknown';
};

const RecipeCard = ({ recipe }) => {
  return (
    <Link
      href={`/${getCategoryName(recipe.category_id)}/${recipe.id}`}
      className="card group"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={`/assets/thumbs/${recipe.thumbnail}`}
          alt={recipe.title}
          fill
          className="card-image"
        />
      </div>
      <div className="p-4">
        <h2 className="font-semibold text-ink mb-1.5 group-hover:text-amber-dark transition-colors line-clamp-2">
          {recipe.title}
        </h2>
        <p className="text-sm text-muted line-clamp-2">
          {recipe.description.substring(0, 80)}...
        </p>
        <div className="flex items-center gap-1.5 mt-3 text-xs text-muted">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {recipe.cooking_time}
        </div>
      </div>
    </Link>
  );
};

export default RecipeCard;
