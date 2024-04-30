import { LoaderFunctionArgs } from "react-router-dom";
import { RecipeGeneral } from "../types/types";

export async function loader({ params }: LoaderFunctionArgs) {
  // * Prepare link
  const apiKey = import.meta.env.VITE_SPOONACULARKEY;
  const url = `https://api.spoonacular.com/recipes/${params.id}/information?apiKey=${apiKey}`;

  // * ----- FETCH ----------------
  try {
    const response = await fetch(url);
    const recipe: RecipeGeneral = await response.json();
    return { recipe };
  } catch (error) {
    console.log(error);
  }
}
