import React, { useEffect, useState } from "react";
import Recipe from "./Recipe";
import "../styles/Search.css";
import axios from "axios";

//Flow:
//1) getting recipe state
//2) passing properties of req object into props (title, calories, image)
//3) Recipe is a child component of search that will
//retrieve these props through destructuring
const Search = () => {
  const APP_ID = "e8e5f1af";
  const APP_KEY = "b6d859b69375a24e3fd5a1627c099818";

  //default value is empty array, state consists of an array of
  //objects
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");

  const url = `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`;

  //need to save recipes to local storage
  useEffect(() => {
    //when query.length > 0 so we dont delete local storage
    //when query is empty
    if (query.length > 0) {
      getRecipes();
    }
    //shouldnt pass in search because for each letter, we will hit our
    //api limit for request allowed a minute if recipe is long
    //instead do on click
  }, [query]);

  useEffect(() => {
    saveRecipes(recipes);
  }, []);

  const getRecipes = async () => {
    const res = await fetch(url);
    const data = await res.json();
    setRecipes(data.hits);
    //reload page so old recipes dont stay
    window.location.reload();
    localStorage.setItem("recipes", JSON.stringify(data.hits));
    console.log(data.hits);
  };

  const saveRecipes = () => {
    const recipeJSON = localStorage.getItem("recipes");
    //everything form local storage is a string...converting string
    //to json object with parsing...valid json is valid js, since json
    //is a superset of js

    if (recipeJSON != null) setRecipes(JSON.parse(recipeJSON));
  };
  //need e for whenever search button is clicked...
  //e represents the button, we dont want search button
  //to refresh, we arent saving to local storage
  const getSearch = (e) => {
    //stops page refresh on click
    e.preventDefault();
    setQuery(search);
    setSearch("");
  };

  //e is the string input from the input
  const updateSearch = (e) => {
    setSearch(e.target.value);
  };

  //main
  return (
    <div className="list">
      <form className="search-form">
        {/* on change event needed or else default value "" from state
          will remain and we wouldnt be able to type*/}
        <input
          className="Search Bar"
          type="text"
          value={search}
          //so we can type
          onChange={updateSearch}
        />
        <button className="search-button" type="submit" onClick={getSearch}>
          Submit
        </button>
      </form>
      {recipes.map((recipe) => (
        //passing in recipe to title prop, recipe was self named
        //recipe is property of object we got from req
        //label = title
        <Recipe
          className="container"
          title={recipe.recipe.label}
          calories={recipe.recipe.calories}
          image={recipe.recipe.image}
          ingredients={recipe.recipe.ingredientLines}
          //uuid, dont have to use uuidv4
          key={recipe.recipe.label}
        ></Recipe>
      ))}
    </div>
  );
};

export default Search;
