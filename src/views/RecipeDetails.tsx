import { useLocation } from "react-router-dom";
import { RecipeGeneral, userFavs } from "../types/types";
import Comments from "../components/Comments";
import {
  collection,
  addDoc,
  query,
  where,
  onSnapshot,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { db } from "../config/firebaseConfig";
import "../style/recipeDetails.scss";

interface LocationState {
  recipe: RecipeGeneral;
}

function RecipeDetails() {
  const location = useLocation();
  const { recipe } = location.state as LocationState;
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
        <section className="recipe-header-section">
          <h3>{recipe.title}</h3>
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

        <section className="recipe-info-section">
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

        <div className="text-center">
          <img src={recipe.image} width={"300px"} />
        </div>

        <h4 className="text-center sectionsStyle">Ingredient list:</h4>
        <ul>
          {recipe.extendedIngredients.map((ingredient, indRec) => {
            return (
              <li key={indRec}>
                {ingredient.original} ({ingredient.measures.metric.amount}{" "}
                {ingredient.measures.metric.unitShort})
              </li>
            );
          })}
        </ul>

        <h4 className="text-center sectionsStyle">Instructions: </h4>
        <ol>
          {recipe.analyzedInstructions[0].steps.map((step, idx) => {
            return <li key={idx}>{step.step}</li>;
          })}
        </ol>

        <Comments recipeId={recipe.id} />
      </main>
    </>
  );
}

export default RecipeDetails;
