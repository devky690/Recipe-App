import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

//create consumer
const AuthContext = createContext();

//useContext will let us use our consumer and access props from the provider

const AuthContextProvider = (props) => {
  //default is undefined...dont need to type
  const [loggedIn, setLoggedIn] = useState(false);

  async function getLoggedIn() {
    const loggedInRes = await axios.get(
      "https://recipe-for-all.herokuapp.com/users/loggedIn"
    );
    setLoggedIn(loggedInRes.data);
  }
  //only need to run the first time a component is created
  useEffect(() => {
    getLoggedIn();
  }, []);

  //we want to passIn the current state and also update
  //the currentState in case we log out(ask our server with
  //function)...
  return (
    <AuthContext.Provider value={{ loggedIn, getLoggedIn }}>
      {/* allows us to render all the children from app.js
        that our authcontext provider has*/}
      {props.children}
    </AuthContext.Provider>
  );
};

//default doesnt need curly braces on import
export default AuthContext;
export { AuthContextProvider };
