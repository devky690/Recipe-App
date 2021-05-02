import axios from "axios";
import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "../context/AuthContext";
const LogOutBtn = () => {
  const { getLoggedIn } = useContext(AuthContext);
  const history = useHistory();
  async function logOut() {
    await axios.get("https://recipe-for-all.herokuapp.com/users/logout");
    //this function will update state of loggedIn and see that cookie
    //containing token is gone
    //await this async function because we want to redirect
    await getLoggedIn();
    history.push("/");
  }
  return (
    <button className="btn" onClick={logOut}>
      LogOut
    </button>
  );
};

export default LogOutBtn;
