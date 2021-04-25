import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import CategoryForm from "./CategoryForm";
import CategoryList from "./CategoryList";
import CategoryContext from "../context/CategoryContext";
import CategoryRecipe from "./CategoryRecipe";

const Category = () => {
  const { active, setActive, setlocalActive } = useContext(CategoryContext);
  const [categories, setCategories] = useState([]);

  async function getCategories() {
    const categoriesRes = await axios.get("http://localhost:8080/category");
    //.data property is an object that contains the actual json array of objects
    setCategories(categoriesRes.data);
  }

  useEffect(() => {
    getCategories();
    //when component loads...get categories
  }, []);

  return (
    <div>
      {active === "start" && (
        <>
          <CategoryForm getCategories={getCategories} />
          <CategoryList categories={categories} />
        </>
      )}
      {/* need to use .map to display recipe */}
      {active === "other" && <CategoryRecipe />}
    </div>
  );
};

export default Category;
// const [categories, setCategories] = useState([]);

// useEffect(() => {
//   getCategories();
// }, [categories]);

//adds category for a user
// async function addCategory() {
//   const user_id = await axios.get("http://localhost:8080/token");
//   const category = {
//     user_id,
//     title,
//   };
//   await axios.post("http://localhost:8080/category", category);
// }
//gets all categories for dropdown box
// async function getCategories() {
//   const categories = await axios.get("http://localhost:8080/category");
// }
