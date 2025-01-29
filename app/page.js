import Banner from "./components/Banner";
import SuperDelicious from "./components/SuperDelicious";
import PopularCategories from "./components/PopularCategories";
import NewsLetter from "./components/NewsLetter";
import HandPickedCollections from "./components/HandPickedCollections";
import LatestRecipes from "./components/LatestRecipes";

export default function Home() {
  return (
    <>
      <main className="container mx-auto px-4 mt-[100px]">
        <Banner />
        <SuperDelicious />
        <PopularCategories />
        <NewsLetter />
        <HandPickedCollections />
        <LatestRecipes />
      </main>
    </>
  );
}
