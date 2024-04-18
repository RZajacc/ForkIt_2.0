import { useState } from "react";
import SearchBar from "../components/recipesView/searchBar/SearchBar";
import RecipesList from "../components/recipesView/recipesList/RecipesList";
import Pagination from "../components/recipesView/Pagination";
import { searchObject } from "../types/types";

function RecipesView() {
  const [offset, setOffset] = useState<number>(0);
  const [searchObj, setSearchObj] = useState<searchObject>({
    searchVal: "",
    dishType: "",
    cuisine: "",
    dietType: "",
  });

  return (
    <>
      <main>
        <SearchBar setSearchObj={setSearchObj} />
        <RecipesList
          searchObj={searchObj}
          offset={offset}
          setOffset={setOffset}
        />
        <Pagination setOffset={setOffset} offset={offset} />
      </main>
    </>
  );
}

export default RecipesView;
