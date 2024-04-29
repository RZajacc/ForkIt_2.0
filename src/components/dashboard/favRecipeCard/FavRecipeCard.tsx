import { RecipeGeneral, userFavs } from "../../../types/types";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "../../recipesView/recipeCard/recipecard.scss";

type Props = {
  recipe: userFavs;
};

function FavRecipeCard({ recipe }: Props) {
  const [recipeData, setRecipeData] = useState<RecipeGeneral>({
    id: 0,
    title: "",
    image: "",
    sustainable: false,
    healthScore: 0,
    readyInMinutes: 0,
    servings: 0,
    summary: "",
    extendedIngredients: [
      {
        nameClean: "",
        original: "",
        measures: {
          metric: {
            amount: 0,
            unitShort: "",
            unitLong: "",
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
  });

  useEffect(() => {
    // * Prepare link
    const apiKey = import.meta.env.VITE_SPOONACULARKEY;
    const url = `https://api.spoonacular.com/recipes/${recipe.recipeID}/information?apiKey=${apiKey}`;

    // * ----- FETCH ----------------
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setRecipeData(data as RecipeGeneral);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [recipe.recipeID]);

  return (
    <div className="recipe-card" key={recipeData.id}>
      <section className="recipe-card__header-section">
        <p className="recipe-card__cooking-time">
          Time:<span> {recipeData.readyInMinutes}</span> min.
        </p>
        <p className="recipe-card__nutritional-score">
          Score:
          <span>{recipeData.healthScore}</span>
        </p>
      </section>
      <section className="recipe-card__image-section">
        <img src={recipeData.image} alt="recipe-image" />
      </section>
      <p className="recipe-card__recipe-title">{recipeData.title}</p>
      <section className="recipe-card__read-more-link">
        <Link to={`../recipes/${recipeData.id}`} state={{ recipe: recipeData }}>
          Read more
        </Link>
      </section>
    </div>
  );
}

export default FavRecipeCard;
