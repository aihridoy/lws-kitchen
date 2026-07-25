import React from 'react';
import Image from 'next/image';
import avatar from '/public/assets/avater.png';
import singleBanner from '/public/assets/single-banner.jpg';
import recipeData from '../../data/recipes.json';
import categoriesData from '../../data/categories.json';
import Link from 'next/link';

const RecipeDetails = ({ params }) => {
  const { recipe: recipeId } = params;
  const recipe = recipeData.find((r) => r.category_id === recipeId);

  if (!recipe) {
    return (
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 md:pt-28">
        <div className="text-center py-20">
          <h1 className="text-2xl font-bold text-ink mb-2">Recipe not found</h1>
          <p className="text-muted mb-6">The recipe you&apos;re looking for doesn&apos;t exist.</p>
          <Link href="/" className="btn-primary">Back to Home</Link>
        </div>
      </main>
    );
  }

  const relatedRecipes = recipeData
    .filter((r) => r.category_id === recipe.category_id)
    .slice(0, 4);

  const getCategoryName = (categoryId) => {
    const category = categoriesData.find((cat) => cat.id === categoryId);
    return category ? category.name.toLowerCase() : 'unknown';
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 md:pt-28 pb-16">
      <article>
        {/* Hero image */}
        <div className="relative aspect-[16/9] rounded-3xl overflow-hidden mb-8 md:mb-12">
          <Image
            src={`/assets/thumbs/${recipe.thumbnail}`}
            fill
            className="object-cover"
            alt={recipe.title}
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/40 to-transparent" />
        </div>

        {/* Title & meta */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-ink leading-tight mb-6 text-balance">
          {recipe.title}
        </h1>

        <div className="flex flex-wrap items-center gap-3 mb-6">
          <div className="flex items-center gap-2">
            <Image
              src={avatar}
              alt="Author"
              width={32}
              height={32}
              className="w-8 h-8 rounded-full ring-2 ring-divider"
            />
            <span className="text-sm font-medium text-ink">{recipe.author}</span>
          </div>
          <span className="text-divider">|</span>
          <span className="flex items-center gap-1.5 text-sm text-muted">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {recipe.cooking_time}
          </span>
          <span className="text-divider">|</span>
          <span className="text-sm text-muted">{recipe.published_date}</span>
        </div>

        {/* Action buttons */}
        <div className="flex gap-3 mb-8 md:mb-12">
          <button className="btn-secondary inline-flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
            </svg>
            Share
          </button>
          <button className="btn-secondary inline-flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
            </svg>
            Save
          </button>
        </div>

        {/* Description */}
        <p className="text-muted text-lg leading-relaxed mb-10 md:mb-14">
          {recipe.description}
        </p>

        {/* Content sections */}
        <div className="space-y-10 md:space-y-14">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-ink mb-4">Before you begin</h2>
            <p className="text-ink/80 leading-relaxed">
              Food qualities braise chicken cuts bowl through slices butternut snack. Tender meat juicy dinners. One-pot low
              heat plenty of time adobo fat raw soften fruit. sweet renders bone-in marrow richness kitchen, fricassee
              basted putter.
            </p>
          </div>

          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-ink mb-4">Here are the basics</h2>
            <p className="text-ink/80 leading-relaxed">
              Juicy meatballs brisket slammin&apos; baked shoulder. Juicy smoker soy sauce burgers brisket. polenta mustard hunk
              greens. Wine technique snack skewers chuck excess. Oil heat slowly. slices natural delicious, set aside magic
              tbsp skillet, bay leaves brown centerpiece. fruit soften edges frond slices onion snack pork steem on wines
              excess technique cup; Cover smoker soy sauce.
            </p>
          </div>

          {/* Blockquote */}
          <blockquote className="relative py-6 px-8 my-10 md:my-14">
            <div className="absolute left-0 top-0 bottom-0 w-1 rounded-full bg-amber" />
            <p className="text-xl md:text-2xl font-semibold text-ink italic leading-relaxed pl-4">
              &ldquo;One cannot think well, love well, sleep well, if one has not dined well.&rdquo;
            </p>
            <cite className="block text-sm text-muted mt-4 pl-4 not-italic">
              — Virginia Woolf, A Room of One&apos;s Own
            </cite>
          </blockquote>

          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-ink mb-4">In the kitchen</h2>
            <p className="text-ink/80 leading-relaxed">
              Gastronomy atmosphere set aside. Slice butternut cooking home. Delicious romantic undisturbed raw platter will
              meld. Thick Skewers skillet natural, smoker soy sauce wait roux. slices rosette bone-in simmer. Romantic
              fall-off-the-bone butternut chuck under romas, Skewers on culinary experience.
            </p>
          </div>

          {/* Inline image */}
          <div className="relative aspect-[16/9] rounded-2xl overflow-hidden my-10 md:my-14">
            <Image
              src={singleBanner}
              fill
              className="object-cover"
              alt="Cooking in kitchen"
            />
          </div>

          <p className="text-ink/80 leading-relaxed">
            Juicy meatballs brisket slammin&apos; baked shoulder. Juicy smoker soy sauce burgers brisket. polenta mustard hunk
            greens. Wine technique snack skewers chuck excess. Oil heat slowly. slices natural delicious, set aside magic
            tbsp skillet, bay leaves brown centerpiece. fruit soften edges frond slices onion snack pork steem on wines
            excess technique cup; Cover smoker soy sauce.
          </p>
        </div>

        {/* Related recipes */}
        {relatedRecipes.length > 0 && (
          <section className="mt-16 md:mt-24">
            <h2 className="section-heading mb-8">You might also like</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {relatedRecipes.map((relatedRecipe) => (
                <Link
                  href={`/${getCategoryName(relatedRecipe.category_id)}/${relatedRecipe.category_id}`}
                  key={relatedRecipe.id}
                  className="card group"
                >
                  <div className="relative aspect-square overflow-hidden">
                    <Image
                      src={`/assets/thumbs/${relatedRecipe.thumbnail}`}
                      fill
                      className="card-image"
                      alt={relatedRecipe.title}
                    />
                  </div>
                  <div className="p-3">
                    <h3 className="text-sm font-semibold text-ink group-hover:text-amber-dark transition-colors line-clamp-2">
                      {relatedRecipe.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </article>
    </main>
  );
};

export default RecipeDetails;
