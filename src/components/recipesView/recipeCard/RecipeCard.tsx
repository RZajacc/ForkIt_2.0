import { Link } from "react-router-dom";
import "./recipecard.scss";
import emptyHeart from "/heart_empty.svg";
import fullHeart from "/heart_full.svg";
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";

type Props = {
  readyInMinutes: number;
  healthScore: number;
  imageUrl: string;
  title: string;
  link: string;
  isFav: boolean;
};

function RecipeCard({
  readyInMinutes,
  healthScore,
  imageUrl,
  title,
  link,
  isFav,
}: Props) {
  const { user } = useContext(AuthContext);
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
          isFav ? (
            <img src={fullHeart} alt="" className="heart" />
          ) : (
            <img src={emptyHeart} alt="" className="heart" />
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
