import axios from "axios";
import React, { useContext } from "react";
import { useHistory } from "react-router";
import AuthContext from "../context/AuthContext";

const LogOutBtn = () => {
  const { getLoggedIn } = useContext(AuthContext);
  const history = useHistory();
  async function logOut() {
    await axios.get("http://localhost:8080/users/logout");
    //this function will update state of loggedIn and see that cookie
    //containing token is gone
    //await this async function because we want to redirect
    await getLoggedIn();
    history.push("/");
  }
  return <button onClick={logOut}>LogOut</button>;
};

export default LogOutBtn;
