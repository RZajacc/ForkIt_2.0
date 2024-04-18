import { Link } from "react-router-dom";
import { RecipeGeneral } from "../../../types/types";
import "./recipecard.scss";

type Props = {
  recipe: RecipeGeneral;
  id: number;
};

function RecipeCard({ recipe, id }: Props) {
  return (
    <div className="recipe-card" key={id}>
      <section className="recipe-card__image-section">
        <img src={recipe.image} alt="recipe-image" />
        <p className="recipe-card__cooking-time">
          Time:
          <span>{recipe.readyInMinutes}</span> min.
        </p>
        <p className="recipe-card__nutritional-score">
          Score:
          <span> {recipe.healthScore}</span> pts.
        </p>
      </section>
      <p className="recipe-card__recipe-title">{recipe.title}</p>
      <section className="recipe-card__read-more-link">
        <Link to={`${recipe.id}`}>Read more</Link>
      </section>
    </div>
  );
}

export default RecipeCard;
