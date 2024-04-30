import { Link } from "react-router-dom";
import "./recipecard.scss";

type Props = {
  readyInMinutes: number;
  healthScore: number;
  imageUrl: string;
  title: string;
  link: string;
};

function RecipeCard({
  readyInMinutes,
  healthScore,
  imageUrl,
  title,
  link,
}: Props) {
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
      </section>
      <p className="recipe-card__recipe-title">{title}</p>
      <section className="recipe-card__read-more-link">
        <Link to={link}>Read more</Link>
      </section>
    </div>
  );
}

export default RecipeCard;
