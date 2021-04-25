import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

const AuthContext = createContext();

const AuthContextProvider = (props) => {
  //default is undefined...dont need to type
  const [loggedIn, setLoggedIn] = useState(false);

  async function getLoggedIn() {
    const loggedInRes = await axios.get("http://localhost:8080/users/loggedIn");
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