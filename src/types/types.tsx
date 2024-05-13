import { Timestamp } from "firebase/firestore";

export interface searchObject {
  searchVal: string;
  dishType: string;
  cuisine: string;
  dietType: string;
}

export interface RecipeGeneral {
  id: number;
  title: string;
  image: string;
  sustainable: boolean;
  healthScore: number;
  readyInMinutes: number;
  servings: number;
  summary: string;
  extendedIngredients: [
    {
      nameClean: string;
      original: string;
      measures: {
        metric: {
          amount: number;
          unitShort: string;
          unitLong: string;
        };
      };
    },
  ];
  analyzedInstructions: [
    {
      steps: [
        {
          number: number;
          step: string;
          length: {
            number: number;
            unit: string;
          };
        },
      ];
    },
  ];
}

export interface commentsType {
  authorID: string;
  recipeID: number;
  author: string;
  date: Timestamp | Date;
  message: string;
  picUrl: string;
  documentId?: string;
  edited?: Timestamp | Date;
}

export interface userFav {
  ImageUrl: string;
  recipeID: number;
  recipeTitle: string;
  userID: string;
  healthScore: number;
  readyInMinutes: number;
}

export type userFavsType = {
  favDocID: string;
  favData: userFav;
};

export interface RouteErrorType {
  data: string;
  error: {
    message: string;
  };
  status: number;
  statusText: string;
}

export interface searchObject {
  searchVal: string;
  dishType: string;
  cuisine: string;
  dietType: string;
}

export interface modalContent {
  header: string;
  body: string;
  confirmButton: string;
  cancelButton: string;
}

export type FetchErr = {
  status: number;
  message: string;
};
