import React, { useState, useEffect } from "react";
import axios from "axios";
import CategoryForm from "./CategoryForm";
import CategoryList from "./CategoryList";
const Category = () => {
  return (
    <div>
      <CategoryForm />
      <CategoryList />
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
