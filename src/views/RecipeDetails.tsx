import { useLoaderData } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { db } from "../config/firebaseConfig";
import {
  collection,
  addDoc,
  query,
  where,
  onSnapshot,
  deleteDoc,
  doc,
} from "firebase/firestore";
import Comments from "../components/comments/Comments";
import { AuthContext } from "../context/AuthContext";
import parse from "html-react-parser";
import { RecipeGeneral, userFavs } from "../types/types";

import fullStar from "/Full_Star.png";
import emptyStar from "/Empty_Star.png";

import "../style/recipeDetails.scss";

type LoaderDataType = {
  recipe: RecipeGeneral;
};

function RecipeDetails() {
  const { recipe } = useLoaderData() as LoaderDataType;
  const { user } = useContext(AuthContext);
  const [favs, setFavs] = useState<userFavs[] | null>(null);
  const [favID, setFavID] = useState<string | null>(null);

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

    if (favID) {
      await deleteDoc(doc(db, "favourites", favID));
      setFavID(null);
    } else {
      // Add a new document with a generated id.
      await addDoc(collection(db, "favourites"), fav);
    }
  };

  useEffect(() => {
    const q = query(
      collection(db, "favourites"),
      where("userID", "==", user?.uid),
      where("recipeID", "==", recipe.id)
    );
    onSnapshot(q, (querySnapshot) => {
      const favs: userFavs[] = [];
      querySnapshot.forEach((doc) => {
        favs.push(doc.data() as userFavs);
        setFavID(doc.id);
      });
      setFavs(favs);
    });
  }, [recipe.id, user?.uid]);

  return (
    <>
      <main>
        <div className="recipe-details">
          <section className="recipe-details__header-section">
            <h3>{recipe.title}</h3>
            {/* FAVS BUTTON DEPENDING ON STATE */}
            {favs?.length != 0 ? (
              <button onClick={handleAddFavourite}>
                <img
                  src={emptyStar}
                  alt="empty-star-icon"
                  className="add-remove-fav-star"
                />
                Remove from favourites
              </button>
            ) : (
              <button onClick={handleAddFavourite}>
                <img
                  src={fullStar}
                  alt="full-star-icon"
                  className="add-remove-fav-star"
                />
                Add to favourites
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
