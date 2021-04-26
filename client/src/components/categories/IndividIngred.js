import React from "react";

const IndividIngred = ({ ingredients }) => {
  return ingredients.map(function (ingredient) {
    return ingredient + " , ";
  });
};

export default IndividIngred;
