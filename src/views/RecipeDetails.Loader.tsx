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

  //  ----- FETCH ----------------
  try {
    const response = await fetch(url);
    if (response.status === 402) {
      throw new Response("Payment required", {
        status: 402,
        statusText: "Payment required",
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
    const loaderData: LoaderType = {
      response: {
        status: 402,
        message:
          "Sorry but request limit for my free tier is exceeded. Try again tomorrow!",
      },
      recipe: {
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
      },
    };
    // const error2 = { status: 402, message: "dupa" };
    return { loaderData };
  }
}
