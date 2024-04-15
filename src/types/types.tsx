import { Timestamp } from "firebase/firestore";

export interface searchObject {
  searchVal: string,
  dishType: string,
  cuisine: string,
  dietType: string,
}

export interface RecipeGeneral {
  id: number,
  title: string,
  image: string,
  sustainable: boolean,
  healthScore: number,
  readyInMinutes: number,
  servings: number,
  extendedIngredients: [
    {
      original: string,
      measures: {
        metric: {
          amount: number,
          unitShort: string,
        }
      }
    }
  ],
  analyzedInstructions: [
    {
      steps: [
        {
          number: number,
          step: string,
          length: {
            number: number,
            unit: string,
          }

        }
      ]
    }
  ],
}

export interface commentsType {
  authorID: string,
  recipeID: number,
  author: string;
  date: Timestamp | Date;
  message: string;
  picUrl: string;
}

export interface userFavs {
  ImageUrl: string,
  recipeID: number,
  recipeTitle: string,
  userID: string,
}

export interface RouteErrorType {
  data: string,
  error: {
    message: string,
  }
  status: number,
  statusText: string,
}

export interface searchObject {
  searchVal: string,
  dishType: string,
  cuisine: string,
  dietType: string,
}