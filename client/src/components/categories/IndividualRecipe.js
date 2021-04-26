import React, { useEffect } from "react";
import "../styles/Recipe.css";
import IndividIngred from "./IndividIngred";

const IndividualRecipe = (props) => {
  const { title, ingredients } = props;
  useEffect(() => {
    console.log("these ingredients" + ingredients);
  }, []);
  return (
    <div className="recipe-container category-recipe">
      <div className="recipe-content">
        <h1>{title}</h1>
        {/* if ingredients render this component */}
        {ingredients && (
          <IndividIngred ingredients={ingredients}></IndividIngred>
        )}
        {!ingredients && <h2>no ingredients</h2>}
      </div>
    </div>
  );
};

export default IndividualRecipe;
