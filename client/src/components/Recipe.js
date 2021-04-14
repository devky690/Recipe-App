import React from "react";
import "./styles/Recipe.css";
import Ingredients from "./Ingredients";

//destructuring, props
//without destructuring we would have props.title, etc.
const Recipe = ({ title, calories, image, ingredients }) => {
  return (
    <div className="recipe-container">
      <div className="recipe-content">
        <h1>{title}</h1>
        <Ingredients ingredients={ingredients}></Ingredients>
        <h3>Calories: {Math.floor(calories)}</h3>
        <img src={image} alt="" />
      </div>
    </div>
  );
};

export default Recipe;
