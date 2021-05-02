import React, { useContext, createContext } from "react";
import Search from "./components/layout/Search";
import Navbar from "./components/layout/Navbar";
import "./components/styles/App.css";
import Home from "./components/layout/Home";
import About from "./components/layout/About";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Category from "./components/categories/Category";
import axios from "axios";
//Browser router being renamed to just Router
import { Route, BrowserRouter as Router } from "react-router-dom";
import { AuthContextProvider } from "./components/context/AuthContext";
import AuthContext from "./components/context/AuthContext";
//so every component allows cookies to be set with axios
axios.defaults.withCredentials = true;

const App = () => {
  //useContext replaces consumer to access props/values
  //from the provider
  const { loggedIn } = useContext(AuthContext);

  return (
    <Router>
      <Navbar> </Navbar>
      <div className="background">
        <div className="App" id="root">
          <Route path="/search" exact component={Search} />
          <Route path="/" exact component={Home} />
          {loggedIn === false && (
            <>
              <Route path="/login" exact component={Login} />
              <Route path="/register" exact component={Register} />
            </>
          )}
          {loggedIn === true && (
            <Route path="/category" exact component={Category} />
          )}
          {/* need exact here to seperate rendering
      from root path and subpath, / is the root path,
      /about is the subpath, to exclude / from /about
      use exact! render home component when path is exactly
    equal to / */}
          {/* you dont need switch but if you use switch,
      root directories should come last, subpaths
    first! or use exact property again */}
        </div>
      </div>
    </Router>
  );
};

export default App;
