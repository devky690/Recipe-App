import React, { useState } from "react";
import axios from "axios";
import "../styles/Category.css";

const CategoryForm = ({ getCategories }) => {
  const [categoryName, setCategoryName] = useState("");

  async function saveCategory(e) {
    e.preventDefault();
    try {
      const user_id = await axios.get(
        "https://recipe-for-all.herokuapp.com/token"
      );
      const categoryData = {
        title: categoryName,
        user_id,
      };
      await axios.post(
        "https://recipe-for-all.herokuapp.com/category",
        categoryData
      );
      //this will cause this component to load thus the useEffect from category component will
      //run since this component is inside the category component...so we dont need
      //to refresh to see updated categories
      getCategories();
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <form className="category-form" onSubmit={saveCategory}>
      <input
        className="category-input"
        type="text"
        placeholder="Category name"
        onChange={(e) => {
          setCategoryName(e.target.value);
        }}
        //   value changes in input field we change
        value={categoryName}
      />
      <button className="btn btn-success" type="submit">
        Save new category
      </button>
    </form>
  );
};

export default CategoryForm;
