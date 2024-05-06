import { LoaderFunctionArgs } from "react-router-dom";
import { RecipeGeneral } from "../types/types";

export async function loader({ params }: LoaderFunctionArgs) {
  //  Prepare link
  const apiKey = import.meta.env.VITE_SPOONACULARKEY;
  const url = `https://api.spoonacular.com/recipes/${params.id}/information?apiKey=${apiKey}`;

  const response = await fetch(url);
  if (response.status === 402) {
    throw new Response("Sorry limit have been exceeded, come back tomorrow!", {
      status: 402,
      statusText: "Payment required",
    });
  } else if (response.status === 404) {
    throw new Response("Recipe with provided ID does not exist!", {
      status: 404,
      statusText: "Not found",
    });
  } else {
    const recipe: RecipeGeneral = await response.json();
    return { recipe };
  }
}
