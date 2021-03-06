import React, { useState, useContext } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const Register = () => {
  //default value...empty string, not empty array or anything
  const [username, setName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVerify, setPassVer] = useState("");

  const { getLoggedIn } = useContext(AuthContext);
  //use history hook
  const history = useHistory();
  async function register(e) {
    //dont want the page to be reloaded
    e.preventDefault();
    try {
      //make sure state hook names are the same as model fields!
      const registerData = {
        username,
        password,
        passwordVerify,
      };
      //change to production url later, be careful with extra "/"
      //shouldve named auth instead of users but okay
      //withCredentials allows axios to change credentials
      await axios.post(
        "https://recipe-for-all.herokuapp.com/users/register",
        registerData,
        {
          withCredentials: true,
        }
      );
      await getLoggedIn();
      history.push("/");
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div>
      <h1 className="auth-title">Register a new account</h1>
      <form onSubmit={register}>
        <input
          className="auth-input"
          type="name"
          placeholder="username"
          //e is event data....e.target.value is the updated value for the event data
          onChange={(e) => setName(e.target.value)}
          value={username}
        />
        <div>
          <input
            className="auth-input"
            type="password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
        <div>
          <input
            className="auth-input"
            type="password"
            placeholder="retype password"
            onChange={(e) => setPassVer(e.target.value)}
            value={passwordVerify}
          />
        </div>
        <button className="btn" type="submit">
          {" "}
          Register{" "}
        </button>
      </form>
    </div>
  );
};

export default Register;
