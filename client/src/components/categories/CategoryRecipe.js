import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import CategoryContext from "../context/CategoryContext";

//selectedCategory destructured should have the _id that we need to get recipes
//only request we need to make here is the request to /category/:categoryId/recipe
const CategoryRecipe = () => {
  const { setActive, categId, title } = useContext(CategoryContext);
  let recipes;

  async function getRecipesFromCateg() {
    recipes = await axios.get(
      `http://localhost:8080/category/${categId}/recipe`
    );
  }

  return (
    <div>
      <h1>{title}</h1>
      <h2>{categId}</h2>
      <button
        onClick={() => {
          setActive("start");
        }}
      >
        Go Back
      </button>
      {/* {recipes.map((recipe) => (
        //passing in recipe to title prop, recipe was self named
        //recipe is property of object we got from req
        //label = title
        <IndividualRecipe
          className="container"
          title={recipe.recipe.label}
          calories={recipe.recipe.calories}
          image={recipe.recipe.image}
          ingredients={recipe.recipe.ingredientLines}
          //uuid, dont have to use uuidv4
          key={recipe.recipe.label}
        ></IndividualRecipe>
      ))} */}
    </div>
  );
};

export default CategoryRecipe;
