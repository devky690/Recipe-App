import React from "react";
import Search from "./components/Search";
import Navbar from "./components/Navbar";
import "./App.css";
import Home from "./components/Home";
import About from "./components/About";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import axios from "axios";
//Browser router being renamed to just Router
import { Route, BrowserRouter as Router } from "react-router-dom";

//so every component allows cookies to be set with axios
axios.defaults.withCredentials = true;

const App = () => {
  return (
    <Router>
      <Navbar> </Navbar>
      <div className="background">
        <div className="App" id="root">
          <Route path="/search" exact component={Search} />
          <Route path="/" exact component={Home} />
          <Route path="/about" exact component={About} />
          <Route path="/login" exact component={Login} />
          <Route path="/register" exact component={Register} />
        </div>
        {/* need exact here to seperate rendering
      from root path and subpath, / is the root path,
      /about is the subpath, to exclude / from /about
      use exact! render home component when path is exactly
      equal to / */}
        {/* you dont need switch but if you use switch,
      root directories should come last, subpaths
      first! or use exact property again */}
      </div>
    </Router>
  );
};

export default App;
