import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import CategoryForm from "./CategoryForm";
import CategoryList from "./CategoryList";
import CategoryContext from "../context/CategoryContext";
import CategoryRecipe from "./CategoryRecipe";
import "../styles/Category.css";

const Category = () => {
  const { active, setActive, setlocalActive } = useContext(CategoryContext);
  const [categories, setCategories] = useState([]);

  async function getCategories() {
    const categoriesRes = await axios.get(
      "https://recipe-for-all.herokuapp.com/category"
    );
    //.data property is an object that contains the actual json array of objects
    setCategories(categoriesRes.data);
  }

  // if we don't specify an empty array ([])
  // as the second argument of the useEffect hook, the hook will exhibit the behaviour of an componentDidUpdate. It means every time some prop's value changes,
  // the useEffect hook will be triggered.
  useEffect(() => {
    getCategories();
    //when component loads...get categories
  }, []);

  return (
    <div>
      {active === "start" && (
        <>
          <h1 className="category-title">Your Categories </h1>
          <CategoryForm getCategories={getCategories} />
          <CategoryList
            categories={categories}
            setCategories={setCategories}
            getCategories={getCategories}
          />
        </>
      )}
      {/* need to use .map to display recipe */}
      {active === "other" && <CategoryRecipe />}
    </div>
  );
};

export default Category;
