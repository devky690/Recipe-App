import React from "react";
import "./styles/Ingredients.css";

const Ingredients = ({ ingredients }) => {
  return ingredients.map(function (ingredient) {
    return ingredient + " , ";
  });
};

export default Ingredients;
