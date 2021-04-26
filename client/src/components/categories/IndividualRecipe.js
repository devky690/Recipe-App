import React from "react";

const IndividualRecipe = (props) => {
  const { id, title } = props;
  return (
    <div>
      <h3>{title}</h3>
      <h4>{id}</h4>
    </div>
  );
};

export default IndividualRecipe;
