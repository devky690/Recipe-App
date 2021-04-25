import axios from "axios";
import React, { useState, useContext } from "react";
import CategoryRecipe from "./CategoryRecipe";
import CategoryContext from "../context/CategoryContext";

//categories array from data contains a property categories which is some of
// our documents (belongs to specific user) in our collection
//from mongo
const CategoryList = ({ categories }) => {
  const { active, setActive } = useContext(CategoryContext);
  //to obtain selected category to view
  const [selectedCategory, setSelectedCategory] = useState([]);
  //for conditional rendering

  //need to add use effect

//   useEffect(() => {
//     //when query.length > 0 so we dont delete local storage
//     //when query is empty
//     if (query.length > 0) {
//       getRecipes();
//     }

//     //shouldnt pass in search because for each letter, we will hit our
//     //api limit for request allowed a minute if recipe is long
//     //instead do on click
//   }, [query]);

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
    console.log(categories);
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
        //   need to map here as well
        <CategoryRecipe selectedCategory={selectedCategory}></CategoryRecipe>
      )}
    </div>
  );
};

export default CategoryList;
