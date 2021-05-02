import React from "react";
import "../styles/Home.css";

const Home = () => {
  return (
    <div className="home">
      <h1 className="home-title">Welcome to Recipe For All!</h1>
      <h2 className="about-title">Who is This Website For?</h2>
      <div className="about">
        <h4>For those who seek to have a collection of recipes</h4>
      </div>
      <h2 className="about-title">Features</h2>
      <div className="features">
        <div className="features item-1">
          <i class="fas fa-search">
            <div>Search For Recipes</div>
          </i>
        </div>
        <div className="features item-2">
          <i class="fas fa-book">
            <div>Save Recipes to Your Category</div>
          </i>
        </div>
      </div>
      <h2 className="instr-title">Instructions to get started</h2>
      <ol className="instr-list">
        <li className="item-1">Register an account</li>
        <li className="item-2">Search for a recipe</li>
        <li className="item-3">Cache a recipe</li>
        <li className="item-4">Go to Categories and save recipe </li>
        <li className="item-4">You can only add one recipe at a time!</li>
      </ol>
    </div>
  );
};

export default Home;
