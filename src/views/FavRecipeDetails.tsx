import { useParams } from "react-router-dom";
import TopSection from "../components/TopSection";
import { Button, Container } from "react-bootstrap";
import { RecipeGeneral, userFavs } from "../types/types";
import Comments from "../components/Comments";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { addDoc, collection, deleteDoc, doc, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../config/firebaseConfig";
import "../style/Recipes.css"

function FavRecipeDetails() {

  const params = useParams();
  const recipeID = parseInt(params.id!);
  const [recipeData, setRecipeData] = useState<RecipeGeneral | null>(null);
  const { user } = useContext(AuthContext);
  const [favs, setFavs] = useState<userFavs[] | null>(null);
  const [favID, setFavID] = useState<string | null>(null);


  const fetchSingleRecipe = async () => {

    // * Prepare link
    const apiKey = import.meta.env.VITE_SPOONACULARKEY;
    const url = `https://api.spoonacular.com/recipes/${recipeID}/information?apiKey=${apiKey}`;

    try {
      // * ----- FETCH ----------------
      const response = await fetch(url);
      const data = await response.json();
      // * ----- ASSIGN VALUES ----------
      const recipeData = data as RecipeGeneral;
      // * ----- SET USESTATES ------------
      setRecipeData(recipeData);
    } catch (error) {
      console.log("Error --->", error);
    }
  }

  // *Adding recipe to favourites
  const handleAddFavourite = async () => {
    const fav = {
      userID: user?.uid,
      recipeID: recipeID,
      recipeTitle: recipeData?.title,
      ImageUrl: recipeData?.image,

    }

    if (favID) {
      await deleteDoc(doc(db, "favourites", favID));
      setFavID(null);
    } else {
      // Add a new document with a generated id.
      await addDoc(collection(db, "favourites"), fav);
    }
  }

  // * Get favourites with live update
  const getFavouritesLive = () => {
    const q = query(collection(db, "favourites"), where("userID", "==", user?.uid), where("recipeID", "==", recipeID));
    onSnapshot(q, (querySnapshot) => {
      const favs: userFavs[] = [];
      querySnapshot.forEach((doc) => {
        favs.push(doc.data() as userFavs);
        setFavID(doc.id);
      });
      setFavs(favs);
    });
  }

  useEffect(() => {
    fetchSingleRecipe();
    getFavouritesLive();
  }, [])



  return (
    <>
      <TopSection />
      <Container className="containerStyle">
        <h2 className="text-center">{recipeData?.title}
          {favs?.length != 0 ? (
            <Button className="favsButton" variant="info" onClick={handleAddFavourite}>
              <img src="https://firebasestorage.googleapis.com/v0/b/forkit-d574f.appspot.com/o/Full_Star.png?alt=media&token=cd7054c0-b436-4a17-a80d-95b0a8b0b951" alt="empty star" className="star" />
              Remove from favourites
            </Button>
          ) : (
            <Button className="favsButton" variant="info" onClick={handleAddFavourite}>
              <img src="https://firebasestorage.googleapis.com/v0/b/forkit-d574f.appspot.com/o/Empty_Star.png?alt=media&token=297da907-8326-4f14-95a7-ecb42c39853c" alt="empty star" className="star" />
              Add to favourites
            </Button>
          )}
        </h2>

        <p className="text-center">
          <b>Health score: </b><span className="nutritionStyle">{recipeData?.healthScore}</span>
          <b> Ready in (minutes): </b>  <span className="nutritionStyle">{recipeData?.readyInMinutes}</span>
          <b> Servings: </b>  <span className="nutritionStyle">{recipeData?.servings}</span>
          <b> Sustainable: </b>  <span className="nutritionStyle">{recipeData?.sustainable ? 'Yes' : 'No'}</span>
        </p>

        <div className="text-center">
          <img src={recipeData?.image} className="recipe-image" />
        </div>

        <h4 className="text-center sectionStyle">Ingredient list:</h4>
        <ul>
          {recipeData?.extendedIngredients.map((ingredient, indRec) => {
            return (
              <li key={indRec}>{ingredient.original} ({ingredient.measures.metric.amount} {ingredient.measures.metric.unitShort})</li>
            )
          })}
        </ul>

        <h4 className="text-center sectionStyle">Instructions: </h4>
        <ol>
          {recipeData?.analyzedInstructions[0].steps.map((step, idx) => {
            return <li key={idx}>{step.step}</li>
          })}
        </ol>

        <Comments recipeId={recipeID} />

      </Container>
    </>
  )
}

export default FavRecipeDetails