import Banner from "./components/Banner";
import SuperDelicious from "./components/SuperDelicious";
import PopularCategories from "./components/PopularCategories";
import NewsLetter from "./components/NewsLetter";
import HandPickedCollections from "./components/HandPickedCollections";
import LatestRecipes from "./components/LatestRecipes";

export default function Home() {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 md:pt-28">
      <Banner />
      <SuperDelicious />
      <PopularCategories />
      <NewsLetter />
      <HandPickedCollections />
      <LatestRecipes />
    </main>
  );
}
