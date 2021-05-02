import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { AuthContextProvider } from "./components/context/AuthContext";
import { CategoryContextProvider } from "./components/context/CategoryContext";

ReactDOM.render(
  <React.StrictMode>
    <CategoryContextProvider>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </CategoryContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
