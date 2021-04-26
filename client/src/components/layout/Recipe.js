import React from "react";
import "../styles/Recipe.css";
import Ingredients from "./Ingredients";
import axios from "axios";

//destructuring, props
//without destructuring we would have props.title, etc.
const Recipe = ({ title, calories, image, ingredients, thisRecipe }) => {
  // async function addRecipeToCategory(category) {
  //   //object id from categories
  //   //prop will become category_id for new recipe
  //   const recipe = {
  //     title,
  //     category_id,
  //   };
  //   await axios.post("http://localhost:8080/category", recipe);
  // }
  function saveRecipeToLocal() {
    localStorage.setItem("selectedRecipe", JSON.stringify(thisRecipe));
  }

  return (
    <div className="recipe-container">
      <div className="recipe-content">
        <h1>{title}</h1>
        <Ingredients ingredients={ingredients}></Ingredients>
        <h3>Calories: {Math.floor(calories)}</h3>

        <img src={image} alt="" />
        <button
          className="recipe-button"
          onClick={() => {
            saveRecipeToLocal();
          }}
        >
          Cache Recipe
        </button>
      </div>
    </div>
  );
};

export default Recipe;
