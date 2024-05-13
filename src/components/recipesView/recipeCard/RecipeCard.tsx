import { Link } from "react-router-dom";
import "./recipecard.scss";
import emptyHeart from "/heart_empty.svg";
import fullHeart from "/heart_full.svg";
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { getAllUserFavs, userFavsType } from "../../../utils/Utils";
import { addDoc, collection, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../../config/firebaseConfig";

type Props = {
  readyInMinutes: number;
  healthScore: number;
  imageUrl: string;
  title: string;
  link: string;
  recipeID: number;
  userFavs: userFavsType[] | null;
  setUserFavs: (favs: userFavsType[] | null) => void;
};

function RecipeCard({
  readyInMinutes,
  healthScore,
  imageUrl,
  title,
  link,
  recipeID,
  userFavs,
  setUserFavs,
}: Props) {
  const { user } = useContext(AuthContext);
  const isFav: userFavsType[] | undefined = userFavs?.filter((favItem) => {
    return favItem.favRecipeID === recipeID;
  });

  const handleAddFavourite = async () => {
    const fav = {
      userID: user?.uid,
      recipeID: recipeID,
      recipeTitle: title,
      ImageUrl: imageUrl,
      healthScore: healthScore,
      readyInMinutes: readyInMinutes,
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

  return (
    <div className="recipe-card">
      <section className="recipe-card__header-section">
        <p className="recipe-card__cooking-time">
          Time:<span> {readyInMinutes}</span> min.
        </p>
        <p className="recipe-card__nutritional-score">
          Score:
          <span>{healthScore}</span>
        </p>
      </section>
      <section className="recipe-card__image-section">
        <img src={imageUrl} alt="recipe-image" />
        {user ? (
          isFav?.length !== 0 ? (
            <img
              src={fullHeart}
              alt=""
              className="heart"
              onClick={handleAddFavourite}
            />
          ) : (
            <img
              src={emptyHeart}
              alt=""
              className="heart"
              onClick={handleAddFavourite}
            />
          )
        ) : (
          ""
        )}
      </section>
      <p className="recipe-card__recipe-title">{title}</p>
      <section className="recipe-card__read-more-link">
        <Link to={link}>Read more</Link>
      </section>
    </div>
  );
}

export default RecipeCard;
