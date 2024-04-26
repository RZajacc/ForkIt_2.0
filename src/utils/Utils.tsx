import { Timestamp } from "firebase/firestore";
import { searchObject } from "../types/types";

// * Helper function to format date
export const formatDate = (date: Timestamp | Date): string => {
  if (date instanceof Timestamp) {
    return new Date(date.seconds * 1000).toLocaleString();
  } else {
    return new Date(date).toLocaleString();
  }
};

export const generateFetchUrl = (
  searchObj: searchObject,
  apiKey: string,
  recAmout: number,
  offset: number
) => {
  // * Prepare custom queries if they are selected
  const query =
    searchObj.searchVal != "" ? `&query=${searchObj.searchVal}` : "";
  const dishType =
    searchObj.dishType != "" ? `&type=${searchObj.dishType}` : "";
  const cuisineType =
    searchObj.cuisine != "" ? `&cuisine=${searchObj.cuisine}` : "";
  const dietType =
    searchObj.dietType != "" ? `&diet=${searchObj.dietType}` : "";

  // * Prepare link
  const baseUrl = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&number=${recAmout}&offset=${offset}&addRecipeInformation=true&fillIngredients=true&instructionsRequired=true`;

  const url = `${baseUrl}${query}${dishType}${cuisineType}${dietType}`;

  return url;
};
