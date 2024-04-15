import { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import RecipeCard from "./RecipeCard";
import { RecipeGeneral, searchObject } from "../types/types";


interface Props {
  searchObj: searchObject,
  offset: number,
  setOffset: (offset: number) => void,
}

function RecipesList({ searchObj, offset, setOffset }: Props) {

  // * ------------ DEFINE USESTATES -------------------------------
  const [recipesData, setRecipesData] = useState<RecipeGeneral[]>([
    {
      id: 0,
      title: '',
      image: '',
      sustainable: false,
      healthScore: 0,
      readyInMinutes: 0,
      servings: 0,
      extendedIngredients: [
        {
          original: '',
          measures: {
            metric: {
              amount: 0,
              unitShort: '',
            }
          }
        }
      ],
      analyzedInstructions: [
        {
          steps: [
            {
              number: 0,
              step: '',
              length: {
                number: 0,
                unit: '',
              }
            }
          ]
        }
      ]
    }
  ])
  const [totalResults, setTotalResults] = useState<number>(0)

  const fetchRecipesList = async () => {

    // * Prepare custom queries if they are selected
    const query = searchObj.searchVal != '' ? `&query=${searchObj.searchVal}` : '';
    const dishType = searchObj.dishType != '' ? `&type=${searchObj.dishType}` : '';
    const cuisineType = searchObj.cuisine != '' ? `&cuisine=${searchObj.cuisine}` : '';
    const dietType = searchObj.dietType != '' ? `&diet=${searchObj.dietType}` : '';

    // * Prepare link
    const apiKey = import.meta.env.VITE_SPOONACULARKEY;
    const number = 6;
    const baseUrl = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&number=${number}&offset=${offset}&addRecipeInformation=true&fillIngredients=true`;


    const url = `${baseUrl}${query}${dishType}${cuisineType}${dietType}`;


    try {
      // * ----- FETCH ----------------
      const response = await fetch(url);
      const data = await response.json();
      // * ----- ASSIGN VALUES ----------
      const recipeData = data.results as RecipeGeneral[];
      const totalResVal = data.totalResults as number;
      // * ----- SET USESTATES ------------
      setTotalResults(totalResVal)
      setOffset(data.offset as number);
      setRecipesData(recipeData);
    } catch (error) {
      console.log("Error --->", error);
    }
  }

  useEffect(() => {
    fetchRecipesList();
  }, [searchObj, offset])



  return (
    <>
      <Container id="recipes-list-container">
        <div className="text-center">
          <p>Total amount or recipes found: <strong>{totalResults}</strong></p>
        </div>
        <Row xs={2} md={3} className="g-4">
          {recipesData && recipesData.map((recipe) => {
            return <RecipeCard recipe={recipe} id={recipe.id} key={recipe.id} />
          })}
        </Row>

      </Container>
    </>
  )
}

export default RecipesList