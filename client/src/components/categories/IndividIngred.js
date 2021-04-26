import React from "react";

const IndividIngred = ({ ingredients }) => {
  // couldve mapped in other component
  return ingredients.map(function (ingredient) {
    return ingredient + " , ";
  });
};

export default IndividIngred;
