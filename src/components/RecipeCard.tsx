import { Card, Col } from "react-bootstrap"
import { Link } from "react-router-dom"
import "../style/Recipes.css"
import { RecipeGeneral } from "../types/types"

type Props = {
  recipe: RecipeGeneral,
  id: number,
}


function RecipeCard({ recipe, id }: Props) {
  return (
    <Col key={id}>
      <Card>
        <Card.Img variant="top" src={recipe.image} />
        <Card.Body className="text-center">
          <Card.Title className="cardTitle">{recipe.title}</Card.Title>
          <Link to={`${recipe.id}`} className="linkStyle" state={{ recipe: recipe }}>See more details</Link>
        </Card.Body>
      </Card>
    </Col>
  )
}

export default RecipeCard