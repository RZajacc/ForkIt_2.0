import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../../../config/firebaseConfig";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { userFavs } from "../../../types/types";
import RecipeCard from "../../recipesView/recipeCard/RecipeCard";

import "./dashboard-favs.scss";

function DashboardFavs() {
  const { user } = useContext(AuthContext);
  const [userFavs, setUserFavs] = useState<userFavs[] | null>(null);

  useEffect(() => {
    // * Get favourites with live update
    const q = query(
      collection(db, "favourites"),
      where("userID", "==", user?.uid)
    );
    onSnapshot(q, (querySnapshot) => {
      const userFavsTemp: userFavs[] = [];

      querySnapshot.forEach((doc) => {
        userFavsTemp.push(doc.data() as userFavs);
      });
      setUserFavs(userFavsTemp);
    });

    // * Prepare link
  }, [user?.uid]);

  return (
    <>
      <div className="fav-recipes-grid">
        {userFavs?.length == 0 ? (
          <h4 className="noFavsText">...No favourites yet...</h4>
        ) : (
          ""
        )}

        {userFavs &&
          userFavs.map((recipe) => {
            return (
              <RecipeCard
                readyInMinutes={recipe.readyInMinutes}
                healthScore={recipe.healthScore}
                imageUrl={recipe.ImageUrl}
                title={recipe.recipeTitle}
                link={`../recipes/${recipe.recipeID}`}
                key={recipe.recipeID}
              />
            );
          })}
      </div>
    </>
  );
}

export default DashboardFavs;
