import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../../../config/firebaseConfig";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { userFavs } from "../../../types/types";
import RecipeCard from "../../recipesView/recipeCard/RecipeCard";

import "./dashboard-favs.scss";
import { getAllUserFavs, userFavsType } from "../../../utils/Utils";

function DashboardFavs() {
  const { user } = useContext(AuthContext);
  const [userFavRecipes, setUserFavRecipes] = useState<userFavs[] | null>(null);
  const [userFavs, setUserFavs] = useState<userFavsType[] | null>([]);

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
      setUserFavRecipes(userFavsTemp);
    });
    (async () => {
      const favs = await getAllUserFavs(user);
      setUserFavs(favs);
    })();

    // * Prepare link
  }, [user, userFavRecipes]);

  return (
    <>
      <div className="fav-recipes-grid">
        {userFavRecipes?.length == 0 ? (
          <h4 className="noFavsText">...No favourites yet...</h4>
        ) : (
          ""
        )}

        {userFavRecipes &&
          userFavRecipes.map((recipe) => {
            return (
              <RecipeCard
                readyInMinutes={recipe.readyInMinutes}
                healthScore={recipe.healthScore}
                imageUrl={recipe.ImageUrl}
                title={recipe.recipeTitle}
                link={`../recipes/${recipe.recipeID}`}
                key={recipe.recipeID}
                recipeID={recipe.recipeID}
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
