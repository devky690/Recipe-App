import axios from "axios";
import React, { useState, useContext, useEffect } from "react";
import CategoryRecipe from "./CategoryRecipe";
import CategoryContext from "../context/CategoryContext";

//this is the listing of categories, outside the category

//categories array from data contains a property categories which is some of
// our documents (belongs to specific user) in our collection
//from mongo
const CategoryList = ({ categories }) => {
  //for conditional rendering
  const { active, setActive, setTitle, setCategoryId, categId } = useContext(
    CategoryContext
  );
  let selectedRecipe;
  let selectedRecipeIng;
  async function saveToCategory() {
    console.clear();
    if (localStorage.getItem("selectedRecipe") != null) {
      selectedRecipe = JSON.parse(localStorage.getItem("selectedRecipe"));
    }
    if (localStorage.getItem("selectedRecipeIng") != null) {
      selectedRecipeIng = JSON.parse(localStorage.getItem("selectedRecipeIng"));
      console.log(localStorage.getItem("selectedRecipeIng"));
    }
    const cachedRecipeData = {
      title: selectedRecipe.recipe.label,
      category_id: categId,
      ingredients: selectedRecipe.recipe.ingredientLines,
    };

    await axios.post(
      `https://recipe-for-all.herokuapp.com/category/${categId}/recipe`,
      cachedRecipeData
    );
    console.log(cachedRecipeData);
  }

  function renderCategories() {
    //key is just unique key...i is index...it will be incremented
    console.log(categories);
    return categories.map((category, i) => {
      return (
        <>
          <li key={i}>{category.title}</li>

          <button
            className="view-button"
            onClick={() => {
              setCategoryId(category._id);
              setTitle(category.title);
              setActive("other");
            }}
          >
            View
          </button>
          <button
            onClick={() => {
              setCategoryId(category._id);
              saveToCategory();
            }}
          >
            Save Recipe
          </button>
        </>
      );
    });
  }
  return (
    <div>
      <ul>{renderCategories()}</ul>
      {/* {active === "start" && <ul>{renderCategories()}</ul>} */}
      {/* {active === "other" && (
        //   need to map here as well
        <CategoryRecipe></CategoryRecipe>
      )}
    </div> */}
    </div>
  );
};

export default CategoryList;
