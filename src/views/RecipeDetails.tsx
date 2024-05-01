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

import "../style/recipeDetails.scss";
type responseType = {
  status: number;
  message: string;
};

type LoaderDataType = {
  loaderData: {
    response: responseType;
    recipe: RecipeGeneral;
  };
};

function RecipeDetails() {
  const { loaderData } = useLoaderData() as LoaderDataType;
  const { user } = useContext(AuthContext);
  const [favs, setFavs] = useState<userFavs[] | null>(null);
  const [favID, setFavID] = useState<string | null>(null);

  console.log("Response", loaderData);
  // Adding recipe to favourites
  const handleAddFavourite = async () => {
    const fav = {
      userID: user?.uid,
      recipeID: loaderData.recipe.id,
      recipeTitle: loaderData.recipe.title,
      ImageUrl: loaderData.recipe.image,
      healthScore: loaderData.recipe.healthScore,
      readyInMinutes: loaderData.recipe.readyInMinutes,
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
    if (loaderData.response.status !== 402) {
      const q = query(
        collection(db, "favourites"),
        where("userID", "==", user?.uid),
        where("recipeID", "==", loaderData.recipe.id)
      );
      onSnapshot(q, (querySnapshot) => {
        const favs: userFavs[] = [];
        querySnapshot.forEach((doc) => {
          favs.push(doc.data() as userFavs);
          setFavID(doc.id);
        });
        setFavs(favs);
      });
    }
  }, [loaderData.recipe.id, user?.uid, loaderData.response.status]);

  return (
    <>
      <main>
        {loaderData.response.status === 200 ? (
          <>
            <div className="recipe-details">
              <section className="recipe-details__header-section">
                <h3>{loaderData.recipe.title}</h3>
                {/* FAVS BUTTON DEPENDING ON STATE */}
                {favs?.length != 0 ? (
                  <button onClick={handleAddFavourite}>
                    <img
                      src="https://firebasestorage.googleapis.com/v0/b/forkit-d574f.appspot.com/o/Full_Star.png?alt=media&token=cd7054c0-b436-4a17-a80d-95b0a8b0b951"
                      alt="empty star"
                      className="add-remove-fav-star"
                    />
                    Remove from favourites
                  </button>
                ) : (
                  <button onClick={handleAddFavourite}>
                    <img
                      src="https://firebasestorage.googleapis.com/v0/b/forkit-d574f.appspot.com/o/Empty_Star.png?alt=media&token=297da907-8326-4f14-95a7-ecb42c39853c"
                      alt="empty star"
                      className="add-remove-fav-star"
                    />
                    Add to favourites
                  </button>
                )}
              </section>

              <section className="recipe-details__info-section">
                <p>
                  <strong>Health score: </strong>
                  {loaderData.recipe.healthScore}
                </p>
                <p>
                  <strong>Ready in: </strong>
                  {loaderData.recipe.readyInMinutes} min.
                </p>
                <p>
                  <strong>Servings: </strong>
                  {loaderData.recipe.servings}
                </p>
                <p>
                  <strong>Sustainable: </strong>
                  {loaderData.recipe.sustainable ? "Yes" : "No"}
                </p>
              </section>

              <section className="recipe-details__description-section">
                <img src={loaderData.recipe.image} />
                <p>{parse(loaderData.recipe.summary)}</p>
              </section>

              <section className="recipe-details__ingredients-section">
                <h4>Ingredient list:</h4>
                <ul>
                  {loaderData.recipe.extendedIngredients.map(
                    (ingredient, indRec) => {
                      return (
                        <li key={indRec}>
                          <strong>{ingredient.nameClean}</strong> -{" "}
                          {Math.floor(ingredient.measures.metric.amount)}{" "}
                          {ingredient.measures.metric.unitShort}.
                        </li>
                      );
                    }
                  )}
                </ul>
              </section>

              <section className="recipe-details__instructions-section">
                <h4>Instructions: </h4>
                <ol>
                  {loaderData.recipe.analyzedInstructions[0].steps.map(
                    (step, idx) => {
                      return <li key={idx}>{step.step}</li>;
                    }
                  )}
                </ol>
              </section>

              <Comments recipeId={loaderData.recipe.id} />
            </div>
          </>
        ) : (
          <>
            <div className="fetch-error-container">
              <p>{loaderData.response.message}</p>
            </div>
          </>
        )}
      </main>
    </>
  );
}

export default RecipeDetails;
