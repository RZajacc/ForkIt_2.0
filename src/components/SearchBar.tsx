import { Container, Row, Col, InputGroup, Form, Button } from "react-bootstrap"
import { ChangeEvent, useState } from "react";
import { searchObject } from "../types/types";
import "../style/SearchBar.css"

interface Props {
  setSearchObj: (searchObj: searchObject) => void,
}

function SearchBar({ setSearchObj }: Props) {

  // * Values to prefill select boxes
  const availableCuisines = ['African', 'Asian', 'American', 'British', 'Cajun',
    'Caribbean', 'Chinese', 'Eastern European', 'European', 'French', 'German',
    'Greek', 'Indian', 'Irish', 'Italian', 'Japanese', 'Jewish', 'Korean', 'Latin American',
    'Mediterranean', 'Mexican', 'Middle Eastern', 'Nordic', 'Southern', 'Spanish', 'Thai', 'Vietnamese'];

  const availableDishTypes = ['main course', 'side dish', 'dessert', 'appetizer', 'salad', 'bread',
    'breakfast', 'soup', 'beverage', 'sauce', 'marinade', 'fingerfood', 'snack', 'drink']

  const availableDietTypes = ['Gluten Free', 'Ketogenic', 'Vegetarian', 'Lacto-Vegetarian', 'Ovo-Vegetarian',
    'Vegan', 'Pescetarian', 'Paleo', 'Primal', 'Low FODMAP', 'Whole30']

  // * Values use states
  const [searchVal, setSearchVal] = useState<string>('')
  const [dishType, setDishType] = useState<string>('')
  const [cuisine, setCuisine] = useState<string>('')
  const [dietType, setDietType] = useState<string>('')


  const handleSearchButtonClick = () => {
    setSearchObj({
      searchVal: searchVal,
      dishType: dishType,
      cuisine: cuisine,
      dietType: dietType,
    })
  }

  const handleSearchValue = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchVal(e.target.value);
  }

  const handleDishType = (e: ChangeEvent<HTMLSelectElement>) => {
    setDishType(e.target.value);
  }

  const handleCuisineType = (e: ChangeEvent<HTMLSelectElement>) => {
    setCuisine(e.target.value);
  }

  const handleDietType = (e: ChangeEvent<HTMLSelectElement>) => {
    setDietType(e.target.value);
  }

  return (
    <Container fluid id="search-container">
      <Row className="justify-content-md-center" xs={1} md={2}>
        <Col >
          <Row className="justify-content-md-center search-boxes-container" xs={1} md={2}>
            <Col>
              <Form.Label>Search by name:</Form.Label>
              <InputGroup>
                <InputGroup.Text id="search-val">&#128269;</InputGroup.Text>
                <Form.Control
                  placeholder="Type here..."
                  aria-label="search-val"
                  aria-describedby="search-val"
                  onChange={handleSearchValue}
                />
              </InputGroup>
            </Col>

            <Col >
              <Form.Label>Select dish type:</Form.Label>
              <Form.Select aria-label="dish-type-select" onChange={handleDishType}>
                <option value={''}>All dish types</option>
                {availableDishTypes.map((type, idx) => {
                  return <option key={idx} value={type}>{type}</option>
                })}
              </Form.Select>
            </Col>
          </Row>

          <Row className="justify-content-md-center search-boxes-container" xs={1} md={2}>
            <Col >
              <Form.Label>Select cuisine:</Form.Label>
              <Form.Select aria-label="cousine-select" id="select-box" onChange={handleCuisineType}>
                <option value={''}>Any cuisine</option>
                {availableCuisines.map((cousine, idx) => {
                  return <option key={idx} value={cousine}>{cousine}</option>
                })}
              </Form.Select>
            </Col>

            <Col >
              <Form.Label>Select diet type:</Form.Label>
              <Form.Select aria-label="diet-type-select" onChange={handleDietType}>
                <option value={''}>Any diet type</option>
                {availableDietTypes.map((type, idx) => {
                  return <option key={idx} value={type}>{type}</option>
                })}
              </Form.Select>
            </Col>
          </Row>

          <Row className="justify-content-md-center" xs={1} md={1}>
            <Col className="text-center">
              <Button variant="warning" id="search-button" onClick={handleSearchButtonClick}>
                Search for recipes
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  )
}

export default SearchBar