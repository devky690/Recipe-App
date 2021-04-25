import React, { useState, useEffect } from "react";
import axios from "axios";
import CategoryForm from "./CategoryForm";
import CategoryList from "./CategoryList";
const Category = () => {
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
      <CategoryForm getCategories={getCategories} />
      <CategoryList categories={categories} />
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
