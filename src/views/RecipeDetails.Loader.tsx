import { LoaderFunctionArgs } from "react-router-dom";
import { RecipeGeneral } from "../types/types";

type responseType = {
  status: number;
  message: string;
};

type LoaderType = {
  response: responseType;
  recipe: RecipeGeneral;
};

export async function loader({ params }: LoaderFunctionArgs) {
  //  Prepare link
  const apiKey = import.meta.env.VITE_SPOONACULARKEY;
  const url = `https://api.spoonacular.com/recipes/${params.id}/information?apiKey=${apiKey}`;

  const blankRecipe: RecipeGeneral = {
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
        measures: { metric: { amount: 0, unitShort: "", unitLong: "" } },
      },
    ],
    analyzedInstructions: [
      { steps: [{ number: 0, step: "", length: { number: 0, unit: "" } }] },
    ],
  };

  //  ----- FETCH ----------------
  try {
    const response = await fetch(url);
    if (response.status === 402) {
      throw new Response("Payment required", {
        status: 402,
        statusText:
          "Sorry but request limit for my free tier is exceeded. Try again tomorrow!",
      });
    } else {
      const recipe: RecipeGeneral = await response.json();
      const loaderData: LoaderType = {
        recipe: recipe,
        response: { status: 200, message: "All good" },
      };
      return { loaderData };
    }
  } catch (error) {
    // Check if error is actually a response that I thrown before
    if (error instanceof Response) {
      const loaderData: LoaderType = {
        response: {
          status: error.status,
          message: error.statusText,
        },
        recipe: blankRecipe,
      };
      return { loaderData };
    }
  }
}
