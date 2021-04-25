import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import CategoryContext from "../context/CategoryContext";

const CategoryRecipe = () => {
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
    </div>
  );
};

export default CategoryRecipe;
