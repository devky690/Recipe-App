import React, { useState, useContext } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const Login = () => {
  //default value...empty string, not empty array or anything
  const [username, setName] = useState("");
  const [password, setPassword] = useState("");

  const { getLoggedIn } = useContext(AuthContext);

  //useHistory hook to redirect after loggin
  const history = useHistory();

  async function login(e) {
    //dont want the page to be reloaded
    e.preventDefault();
    try {
      //make sure state hook names are the same as model fields!
      const loginData = {
        username,
        password,
      };
      //change to production url later, be careful with extra "/"
      //shouldve named auth instead of users but okay
      //withCredentials allows axios to change credentials
      await axios.post(
        "https://recipe-for-all.herokuapp.com/users/login",
        loginData,
        {
          withCredentials: true,
        }
      );
      await getLoggedIn();
      history.push("/");
      //figure out how to redirect here
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div>
      <h1>login a new account</h1>
      <form onSubmit={login}>
        <input
          type="name"
          placeholder="username"
          //e is event data....e.target.value is the updated value for the event data
          onChange={(e) => setName(e.target.value)}
          value={username}
        />
        <input
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <button type="submit"> Login </button>
      </form>
    </div>
  );
};

export default Login;
