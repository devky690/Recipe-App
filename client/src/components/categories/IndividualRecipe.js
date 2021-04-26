import React, { useEffect } from "react";
import "../styles/Recipe.css";
import IndividIngred from "./IndividIngred";

const IndividualRecipe = (props) => {
  const { title, image, ingredients } = props;
  useEffect(() => {
    console.log("these ingredients" + ingredients);
  }, []);
  return (
    <div className="recipe-container category-recipe">
      <div className="recipe-content">
        <h1>{title}</h1>
        <IndividIngred ingredients={ingredients}></IndividIngred>

        <img src={image} alt="" />
      </div>
    </div>
  );
};

export default IndividualRecipe;
