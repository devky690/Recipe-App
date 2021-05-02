import React, { createContext, useState } from "react";

//this context is for conditional rendering...needed it for child to share state
//with parent

//create consumer
const CategoryContext = createContext();

//useContext will let us use our consumer and access props from the provider

const CategoryContextProvider = (props) => {
  const [active, setActive] = useState("start");
  //to obtain category to view...need to do here because of conditional
  //rendering
  const [categId, setCategoryId] = useState("");
  const [title, setTitle] = useState("");

  // function setlocalActive() {
  //   localStorage.setItem("active", active);
  // }

  //we want to passIn the current state
  return (
    <CategoryContext.Provider
      value={{ active, setActive, categId, setCategoryId, title, setTitle }}
    >
      {props.children}
    </CategoryContext.Provider>
  );
};

//default doesnt need curly braces on import
export default CategoryContext;
export { CategoryContextProvider };
