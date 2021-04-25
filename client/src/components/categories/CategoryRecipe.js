import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import CategoryContext from "../context/CategoryContext";

//selectedCategory destructured should have the _id that we need to get recipes
//only request we need to make here is the request to /category/:categoryId/recipe
const CategoryRecipe = ({ _id }) => {
  const { setActive } = useContext(CategoryContext);
  return (
    <div>
      Recipe for this category
      <button
        onClick={() => {
          setActive("start");
        }}
      >
        Go Back
      </button>
      <h1>{"hello" + _id}</h1>
    </div>
  );
};

export default CategoryRecipe;
