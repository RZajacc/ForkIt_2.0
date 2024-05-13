import RecipeCard from "../recipeCard/RecipeCard";
import { FetchErr, RecipeGeneral, userFavsType } from "../../../types/types";

import "./recipeslist.scss";

interface Props {
  totalResults: number;
  fetchErrClass: string;
  fetchErr: FetchErr;
  recipesData: RecipeGeneral[];
  userFavs: userFavsType[] | null;
  setUserFavs: (favs: userFavsType[] | null) => void;
}

function RecipesList({
  totalResults,
  fetchErrClass,
  fetchErr,
  recipesData,
  userFavs,
  setUserFavs,
}: Props) {
  return (
    <>
      <div className="recipe-amount">
        <p>
          Total amount or recipes found: <strong>{totalResults}</strong>
        </p>
        <p className={fetchErrClass}>
          {fetchErr.status !== 0 ? fetchErr.message : ""}
        </p>
      </div>
      <div className="recipes-card-grid">
        {recipesData &&
          recipesData.map((recipe) => {
            return (
              <RecipeCard
                readyInMinutes={recipe.readyInMinutes}
                healthScore={recipe.healthScore}
                imageUrl={recipe.image}
                title={recipe.title}
                link={`${recipe.id}`}
                key={recipe.id}
                recipeID={recipe.id}
                userFavs={userFavs}
                setUserFavs={setUserFavs}
              />
            );
          })}
      </div>
    </>
  );
}

export default RecipesList;
