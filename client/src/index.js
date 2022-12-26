import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import App from "./App";
console.log(window.location.pathname);

window.onbeforeunload = (event) => {
  if (
    !(
      window.location.pathname === "/" ||
      window.location.pathname === "/admin" ||
      window.location.pathname === "/instructor" ||
      window.location.pathname === "/individual-trainee" ||
      window.location.pathname === "/corporate-trainee"
    )
  )
    localStorage.setItem("refresh", "true");
};
ReactDOM.createRoot(document.getElementById("root")).render(<App />);
