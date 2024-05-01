import { useEffect, useState } from "react";
import RecipeCard from "../recipeCard/RecipeCard";
import { RecipeGeneral, searchObject } from "../../../types/types";

import "./recipeslist.scss";
import { generateFetchUrl } from "../../../utils/Utils";

interface Props {
  searchObj: searchObject;
  offset: number;
  setOffset: (offset: number) => void;
  totalResults: number;
  setTotalResults: (totalResults: number) => void;
}

type FetchErr = {
  status: number;
  message: string;
};

function RecipesList({
  searchObj,
  offset,
  setOffset,
  totalResults,
  setTotalResults,
}: Props) {
  // Prepare data in states
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

    fetch(url)
      .then((response) => {
        if (response.ok) {
          setFetchErr({ status: 0, message: "" });
          setFetchErrClass("hide-element");
          return response.json();
        } else if (response.status === 402) {
          setFetchErr({
            status: response.status,
            message:
              "Sorry but request limit for my free tier is exceeded. Try again tomorrow!",
          });
          setFetchErrClass("fetch-error");
        }
      })
      .then((data) => {
        if (!ignore) {
          setRecipesData(data.results as RecipeGeneral[]);
          setTotalResults(data.totalResults as number);
          setOffset(data.offset as number);
        }
        return () => {
          ignore = true;
        };
      });
  }, [searchObj, offset, setOffset, setTotalResults]);

  return (
    <>
      <div className="recipe-amount">
        <p>
          Total amount or recipes found: <strong>{totalResults}</strong>
        </p>
        <p className={fetchErrClass}>
          {fetchErr.status !== 0 ? fetchErr.message : ""}
        </p>
      </div>
      <div className="recipes-card-grid">
        {recipesData &&
          recipesData.map((recipe) => {
            return (
              <RecipeCard
                readyInMinutes={recipe.readyInMinutes}
                healthScore={recipe.healthScore}
                imageUrl={recipe.image}
                title={recipe.title}
                link={`${recipe.id}`}
                key={recipe.id}
              />
            );
          })}
      </div>
    </>
  );
}

export default RecipesList;
