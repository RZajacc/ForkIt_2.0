import { useLoaderData } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { db } from "../config/firebaseConfig";
import { collection, addDoc, deleteDoc, doc } from "firebase/firestore";
import Comments from "../components/comments/Comments";
import { AuthContext } from "../context/AuthContext";
import parse from "html-react-parser";
import { RecipeGeneral, userFavsType } from "../types/types";

import fullHeart from "/heart_full.svg";
import emptyHeart from "/heart_empty.svg";

import "../style/recipeDetails.scss";
import { getAllUserFavs } from "../utils/Utils";

type LoaderDataType = {
  recipe: RecipeGeneral;
};

function RecipeDetails() {
  const { recipe } = useLoaderData() as LoaderDataType;
  const { user } = useContext(AuthContext);
  const [userFavs, setUserFavs] = useState<userFavsType[] | null>([]);
  const isFav: userFavsType[] | undefined = userFavs?.filter((favItem) => {
    return favItem.favData.recipeID === recipe.id;
  });

  // Adding recipe to favourites
  const handleAddFavourite = async () => {
    const fav = {
      userID: user?.uid,
      recipeID: recipe.id,
      recipeTitle: recipe.title,
      ImageUrl: recipe.image,
      healthScore: recipe.healthScore,
      readyInMinutes: recipe.readyInMinutes,
    };

    if (isFav?.length !== 0) {
      await deleteDoc(doc(db, "favourites", isFav ? isFav[0].favDocID : ""));
      const favs = await getAllUserFavs(user);
      setUserFavs(favs);
    } else {
      // Add a new document with a generated id.
      await addDoc(collection(db, "favourites"), fav);
      const favs = await getAllUserFavs(user);
      setUserFavs(favs);
    }
  };

  useEffect(() => {
    (async () => {
      const favs = await getAllUserFavs(user);
      setUserFavs(favs);
    })();
  }, [user, setUserFavs]);

  return (
    <>
      <main>
        <div className="recipe-details">
          <section className="recipe-details__header-section">
            <h3>{recipe.title}</h3>
            {/* FAVS BUTTON DEPENDING ON STATE */}
            {isFav?.length !== 0 ? (
              <button onClick={handleAddFavourite}>
                Remove from favourites
                <img
                  src={fullHeart}
                  alt="empty-star-icon"
                  className="add-remove-fav-star"
                />
              </button>
            ) : (
              <button onClick={handleAddFavourite}>
                Add to favourites
                <img
                  src={emptyHeart}
                  alt="full-star-icon"
                  className="add-remove-fav-star"
                />
              </button>
            )}
          </section>

          <section className="recipe-details__info-section">
            <p>
              <strong>Health score: </strong>
              {recipe.healthScore}
            </p>
            <p>
              <strong>Ready in: </strong>
              {recipe.readyInMinutes} min.
            </p>
            <p>
              <strong>Servings: </strong>
              {recipe.servings}
            </p>
            <p>
              <strong>Sustainable: </strong>
              {recipe.sustainable ? "Yes" : "No"}
            </p>
          </section>

          <section className="recipe-details__description-section">
            <img src={recipe.image} />
            <p>{parse(recipe.summary)}</p>
          </section>

          <section className="recipe-details__ingredients-section">
            <h4>Ingredient list:</h4>
            <ul>
              {recipe.extendedIngredients.map((ingredient, indRec) => {
                return (
                  <li key={indRec}>
                    <strong>{ingredient.nameClean}</strong> -{" "}
                    {Math.floor(ingredient.measures.metric.amount)}{" "}
                    {ingredient.measures.metric.unitShort}.
                  </li>
                );
              })}
            </ul>
          </section>

          <section className="recipe-details__instructions-section">
            <h4>Instructions: </h4>
            <ol>
              {recipe.analyzedInstructions[0].steps.map((step, idx) => {
                return <li key={idx}>{step.step}</li>;
              })}
            </ol>
          </section>

          <Comments recipeId={recipe.id} />
        </div>
      </main>
    </>
  );
}

export default RecipeDetails;
