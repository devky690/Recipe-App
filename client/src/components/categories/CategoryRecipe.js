import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import CategoryContext from "../context/CategoryContext";
import IndividualRecipe from "../categories/IndividualRecipe";

//selectedCategory destructured should have the _id that we need to get recipes
//only request we need to make here is the request to /category/:categoryId/recipe
const CategoryRecipe = () => {
  const { setActive, categId, title } = useContext(CategoryContext);
  const [recipes, setRecipes] = useState([]);
  let recipeReq;
  useEffect(() => {
    getRecipesFromCateg();
  }, []);
  async function getRecipesFromCateg() {
    recipeReq = await axios.get(
      `http://localhost:8080/category/${categId}/recipe`
    );
    setRecipes(recipeReq.data);
    console.clear();
    console.log(categId);
    console.log(recipeReq.data);
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
      {recipes.map((recipe, i) => (
        //passing in recipe to title prop, recipe was self named
        //recipe is property of object we got from req
        //label = title
        <IndividualRecipe
          className="container"
          title={recipe.title}
          id={recipe._id}
          key={i}
        ></IndividualRecipe>
      ))}
    </div>
  );
};

export default CategoryRecipe;
