import { searchObject } from "../../types/types";
import availableCuisines from "./searchOptions/availableCouisines.json";
import availableDishTypes from "./searchOptions/availableDishTypes.json";
import availableDietTypes from "./searchOptions/availableDietTypes.json";

import "./searchbar.scss";

interface Props {
  setSearchObj: (searchObj: searchObject) => void;
}

function SearchBar({ setSearchObj }: Props) {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Create form data instance
    const formData = new FormData(event.currentTarget);
    // Get form data values
    const searchVal = formData.get("recipe-name") as string;
    const dishType = formData.get("meal-type") as string;
    const cuisine = formData.get("cousine") as string;
    const dietType = formData.get("diet-type") as string;
    // Set the search object with collected values
    setSearchObj({
      searchVal: searchVal,
      dishType: dishType,
      cuisine: cuisine,
      dietType: dietType,
    });
  };

  return (
    <section>
      <form id="recipe-search-form" onSubmit={handleSubmit}>
        <label htmlFor="recipe-name">Recipe by name:</label>
        <input type="text" name="recipe-name" />
        <label htmlFor="meal-type">Select a meal type:</label>
        <select name="meal-type">
          {availableDishTypes.map((type, idx) => {
            return (
              <option value={type} key={idx}>
                {type}
              </option>
            );
          })}
        </select>
        <label htmlFor="cousine">Choose couisine:</label>
        <select name="cousine">
          {availableCuisines.map((type, idx) => {
            return (
              <option value={type} key={idx}>
                {type}
              </option>
            );
          })}
        </select>
        <label htmlFor="diet-type">Choose diet type:</label>
        <select name="diet-type">
          {availableDietTypes.map((type, idx) => {
            return (
              <option value={type} key={idx}>
                {type}
              </option>
            );
          })}
        </select>
        <button type="submit">Search for a recipe</button>
      </form>
    </section>
  );
}

export default SearchBar;
