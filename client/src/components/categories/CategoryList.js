import axios from "axios";
import React, { useState, useContext, useEffect } from "react";
import CategoryRecipe from "./CategoryRecipe";
import CategoryContext from "../context/CategoryContext";

//categories array from data contains a property categories which is some of
// our documents (belongs to specific user) in our collection
//from mongo
const CategoryList = ({ categories }) => {
  //for conditional rendering
  const { active, setActive, setTitle, setCategoryId } = useContext(
    CategoryContext
  );

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
