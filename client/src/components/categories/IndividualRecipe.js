import React, { useEffect, useContext } from "react";
import "../styles/Recipe.css";
import IndividIngred from "./IndividIngred";
import CategoryContext from "../context/CategoryContext";
import axios from "axios";

const IndividualRecipe = (props) => {
  const { title, ingredients, setRecipes, recipes, id } = props;
  const { categId } = useContext(CategoryContext);
  async function deleteRecipe() {
    await axios.delete(
      //need to use actual id for recipes for delete to show right away
      //since state update happens on next rerender
      `http://localhost:8080/category/${categId}/recipe/${id}`
    );
    //so our state updates appropiately, setting this state will cause
    //a state change in other component category's useeffect
    //the id will belong to the individual component that holds the recipe
    setRecipes(recipes.filter((recipe) => recipe._id !== id));
  }
  return (
    <div className="recipe-container category-recipe">
      <div className="recipe-content">
        <h1>{title}</h1>
        {/* if ingredients render this component */}
        {ingredients && (
          <IndividIngred ingredients={ingredients}></IndividIngred>
        )}
        {!ingredients && <h2>no ingredients</h2>}
        <button className="btn btn-danger" onClick={() => deleteRecipe()}>
          Delete Recipe
        </button>
      </div>
    </div>
  );
};

export default IndividualRecipe;
