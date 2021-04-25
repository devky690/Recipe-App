import axios from "axios";
import React, { useState } from "react";
import CategoryRecipe from "./CategoryRecipe";

//categories array from data contains a property categories which is some of
// our documents (belongs to specific user) in our collection
//from mongo
const CategoryList = ({ categories }) => {
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [active, setActive] = useState("start");
  async function getCategory(categoryId) {
    try {
      const updatedSelect = await axios.get(
        `http://localhost:8080/category/?category_id=${categoryId}`
      );
      console.log(" hello " + updatedSelect);
      setSelectedCategory(selectedCategory);
    } catch (err) {
      console.log(err + "this is the error");
    }
  }
  function renderCategories() {
    //key is just unique key...i is index...it will be incremented
    return categories.map((category, i) => {
      return (
        <>
          <li key={i}>{category.title}</li>

          <button
            className="view-button"
            onClick={() => {
              getCategory(category._id);
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
      {" "}
      {active === "start" && <ul>{renderCategories()}</ul>}
      {active === "other" && (
        <CategoryRecipe selectedCategory={selectedCategory}></CategoryRecipe>
      )}
    </div>
  );
};

export default CategoryList;
