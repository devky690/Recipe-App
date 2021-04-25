import axios from "axios";
import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";

const LogOutBtn = () => {
  const { getLoggedIn } = useContext(AuthContext);

  async function logOut() {
    await axios.get("http://localhost:8080/users/logout");
    //this function will update state of loggedIn and see that cookie
    //containing token is gone
    getLoggedIn();
  }
  return <button onClick={logOut}>LogOut</button>;
};

export default LogOutBtn;
