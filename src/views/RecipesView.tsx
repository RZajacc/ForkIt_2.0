import { useContext, useEffect, useState } from "react";
import SearchBar from "../components/recipesView/searchBar/SearchBar";
import RecipesList from "../components/recipesView/recipesList/RecipesList";
import Pagination from "../components/recipesView/recipePagination/Pagination";
import { FetchErr, RecipeGeneral, searchObject } from "../types/types";
import { generateFetchUrl, getAllUserFavs } from "../utils/Utils";
import { ThreeCircles } from "react-loader-spinner";
import { AuthContext } from "../context/AuthContext";

function RecipesView() {
  const [isLoading, setIsLoading] = useState(false);
  const [offset, setOffset] = useState<number>(0);
  const [searchObj, setSearchObj] = useState<searchObject>({
    searchVal: "",
    dishType: "",
    cuisine: "",
    dietType: "",
  });
  const [userFavs, setUserFavs] = useState<number[] | null>([]);
  const { user } = useContext(AuthContext);

  // Prepare data in states
  const [totalResults, setTotalResults] = useState<number>(0);
  const [recipesData, setRecipesData] = useState<RecipeGeneral[]>([]);
  const [fetchErr, setFetchErr] = useState<FetchErr>({
    status: 0,
    message: "",
  });
  const [fetchErrClass, setFetchErrClass] = useState("hide-element");
  // Fetch date on page load and when other elements change
  useEffect(() => {
    // Prepare data to fetch
    const apiKey = import.meta.env.VITE_SPOONACULARKEY;
    const recipesAmount = 6;
    const url = generateFetchUrl(searchObj, apiKey, recipesAmount, offset);

    let ignore = false;
    setIsLoading(true);
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          setIsLoading(false);
          if (response.status === 402) {
            setFetchErr({
              status: response.status,
              message:
                "Sorry but request limit for my free tier is exceeded. Try again tomorrow!",
            });
            setFetchErrClass("fetch-error");
          } else if (response.status === 404) {
            setFetchErr({
              status: response.status,
              message: "Resource not found!",
            });
            setFetchErrClass("fetch-error");
          }
        } else {
          setFetchErr({ status: 200, message: "Fetch was successfull" });
          setFetchErrClass("hide-element");
          setIsLoading(false);
          return response.json();
        }
      })
      .then(async (data) => {
        if (!ignore) {
          setIsLoading(false);
          setRecipesData(data.results as RecipeGeneral[]);
          setTotalResults(data.totalResults as number);
          setOffset(data.offset as number);
          const favs = await getAllUserFavs(user);
          setUserFavs(favs);
        }
        return () => {
          ignore = true;
        };
      });
  }, [searchObj, offset, setOffset, setTotalResults, user]);

  return (
    <>
      <main>
        <SearchBar setSearchObj={setSearchObj} />
        {isLoading ? (
          <ThreeCircles height="120" width="120" wrapperClass="spinnerClass" />
        ) : (
          <RecipesList
            totalResults={totalResults}
            fetchErrClass={fetchErrClass}
            fetchErr={fetchErr}
            recipesData={recipesData}
            userFavs={userFavs}
          />
        )}
        {fetchErr.status === 200 ? (
          <Pagination
            setOffset={setOffset}
            offset={offset}
            totalResults={totalResults}
          />
        ) : (
          ""
        )}
      </main>
    </>
  );
}

export default RecipesView;
