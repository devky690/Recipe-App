import React, { useContext } from "react";
import "../styles/Navbar.css";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import LogOutBtn from "../auth/LogOutBtn";

const Navbar = () => {
  //useContext allows us to access values of props from the
  //provider
  const { loggedIn } = useContext(AuthContext);
  return (
    <nav>
      <span className="title">Recipe For All</span>
      <ul className="choices">
        <li className="item">
          {/* need to use Link instead of
              anchor tags because it allows
                for client side routing so your not
                reloading the entire page, your just
                changing the page */}
          <Link className="home" to="/">
            Home
          </Link>
        </li>
        <li className="item">
          <Link className="search" to="/search">
            Search
          </Link>
        </li>
        {/* if loggedIn is false then load these
        components */}
        {loggedIn === false && (
          <>
            <li className="item">
              <Link className="register" to="/register">
                Register
              </Link>
            </li>
            <li className="item">
              <Link className="login" to="/login">
                Login
              </Link>
            </li>
          </>
        )}
        {/* if loggedIn is true then load this component */}
        {loggedIn === true && (
          <>
            <li className="item">
              <Link className="category" to="/category">
                Category
              </Link>
            </li>
            <LogOutBtn />
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
