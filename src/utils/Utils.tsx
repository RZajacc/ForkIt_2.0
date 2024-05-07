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

export const passwordValidator = (password: string) => {
  const validatePass = {
    length: false,
    uppercaseChar: false,
    number: false,
    specialChar: false,
  };

  let counter = 0;

  type pass = {
    [n: number]: { [val: string]: string };
  };
  const passwordStrength: pass = {
    0: { percentage: "0%", status: "Very weak" },
    1: { percentage: "25%", status: "Weak" },
    2: { percentage: "50%", status: "Moderate" },
    3: { percentage: "75%", status: "Strong" },
    4: { percentage: "100%", status: "Very strong" },
  };

  // Check password length
  if (password.length >= 8) {
    validatePass.length = true;
    counter += 1;
  }
  // Check if it contains any capital letter
  if (/[A-Z]/.test(password) && validatePass.length) {
    validatePass.uppercaseChar = true;
    counter += 1;
  }
  // Check if it contains a special character
  if (
    /[-’/`~!#*$@_%+=.,^&(){}[\]|;:”<>?\\]/g.test(password) &&
    validatePass.length
  ) {
    validatePass.specialChar = true;
    counter += 1;
  }
  // Check it it contains a number
  if (/[0-9]/.test(password) && validatePass.length) {
    validatePass.number = true;
    counter += 1;
  }

  return {
    percentage: passwordStrength[counter].percentage,
    status: passwordStrength[counter].status,
  };
};
