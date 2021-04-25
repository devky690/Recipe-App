import React, { createContext, useState } from "react";

//this context is for conditional rendering

//create consumer
const CategoryContext = createContext();

//useContext will let us use our consumer and access props from the provider

const CategoryContextProvider = (props) => {
  const [active, setActive] = useState("start");

  function setlocalActive() {
    localStorage.setItem("active", active);
  }

  //we want to passIn the current state
  return (
    <CategoryContext.Provider value={{ active, setActive, setlocalActive }}>
      {props.children}
    </CategoryContext.Provider>
  );
};

//default doesnt need curly braces on import
export default CategoryContext;
export { CategoryContextProvider };
