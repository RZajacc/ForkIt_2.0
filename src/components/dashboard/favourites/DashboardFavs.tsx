import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import RecipeCard from "../../recipesView/recipeCard/RecipeCard";

import "./dashboard-favs.scss";
import { getAllUserFavs } from "../../../utils/Utils";
import { userFavsType } from "../../../types/types";

function DashboardFavs() {
  const { user } = useContext(AuthContext);
  const [userFavs, setUserFavs] = useState<userFavsType[] | null>([]);

  useEffect(() => {
    (async () => {
      const favs = await getAllUserFavs(user);
      setUserFavs(favs);
    })();

    // * Prepare link
  }, [user]);

  return (
    <>
      <div className="fav-recipes-grid">
        {userFavs?.length == 0 ? (
          <h4 className="noFavsText">...No favourites yet...</h4>
        ) : (
          ""
        )}

        {userFavs &&
          userFavs.map((fav) => {
            return (
              <RecipeCard
                readyInMinutes={fav.favData.readyInMinutes}
                healthScore={fav.favData.healthScore}
                imageUrl={fav.favData.ImageUrl}
                title={fav.favData.recipeTitle}
                link={`../recipes/${fav.favData.recipeID}`}
                key={fav.favData.recipeID}
                recipeID={fav.favData.recipeID}
                userFavs={userFavs}
                setUserFavs={setUserFavs}
              />
            );
          })}
      </div>
    </>
  );
}

export default DashboardFavs;
