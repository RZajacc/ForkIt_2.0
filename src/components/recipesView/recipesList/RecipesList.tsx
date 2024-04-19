import { useEffect, useState } from "react";
import RecipeCard from "../recipeCard/RecipeCard";
import { RecipeGeneral, searchObject } from "../../../types/types";

import "./recipeslist.scss";
import { generateFetchUrl } from "../../../utils/Utils";

interface Props {
  searchObj: searchObject;
  offset: number;
  setOffset: (offset: number) => void;
}

function RecipesList({ searchObj, offset, setOffset }: Props) {
  // * ------------ DEFINE USESTATES -------------------------------
  const [recipesData, setRecipesData] = useState<RecipeGeneral[]>([
    {
      id: 0,
      title: "",
      image: "",
      sustainable: false,
      healthScore: 0,
      readyInMinutes: 0,
      servings: 0,
      extendedIngredients: [
        {
          original: "",
          measures: {
            metric: {
              amount: 0,
              unitShort: "",
            },
          },
        },
      ],
      analyzedInstructions: [
        {
          steps: [
            {
              number: 0,
              step: "",
              length: {
                number: 0,
                unit: "",
              },
            },
          ],
        },
      ],
    },
  ]);
  const [totalResults, setTotalResults] = useState<number>(0);

  useEffect(() => {
    // Prepare data to fetch
    const apiKey = import.meta.env.VITE_SPOONACULARKEY;
    const recipesAmount = 6;
    const url = generateFetchUrl(searchObj, apiKey, recipesAmount, offset);

    let ignore = false;

    fetch(url)
      .then((response) => response.json())
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
  }, [searchObj, offset, setOffset]);

  return (
    <>
      <div className="text-center">
        <p>
          Total amount or recipes found: <strong>{totalResults}</strong>
        </p>
      </div>
      <div className="recipes-card-grid">
        {recipesData &&
          recipesData.map((recipe) => {
            return (
              <RecipeCard recipe={recipe} id={recipe.id} key={recipe.id} />
            );
          })}
      </div>
    </>
  );
}

export default RecipesList;
