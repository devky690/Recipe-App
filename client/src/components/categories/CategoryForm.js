import React, { useState } from "react";
import axios from "axios";

const CategoryForm = ({ getCategories }) => {
  const [categoryName, setCategoryName] = useState("");

  async function saveCategory(e) {
    e.preventDefault();
    try {
      const user_id = await axios.get("http://localhost:8080/token");
      const categoryData = {
        title: categoryName,
        user_id,
      };
      await axios.post("http://localhost:8080/category", categoryData);
      //this will cause this component to load thus the useEffect from category component will
      //run since this component is inside the category component...so we dont need
      //to refresh to see updated categories
      getCategories();
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div>
      <form onSubmit={saveCategory}>
        <input
          type="text"
          placeholder="Category name"
          onChange={(e) => {
            setCategoryName(e.target.value);
          }}
          //   value changes in input field we change
          value={categoryName}
        />
        <button type="submit">Save new category</button>
      </form>
    </div>
  );
};

export default CategoryForm;
