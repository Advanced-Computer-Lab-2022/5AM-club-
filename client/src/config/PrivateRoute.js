import React from "react";
import { Navigate } from "react-router-dom";

function PrivateRoute({ type, children }) {
  if (
    localStorage.getItem("type") === type ||
    (!localStorage.getItem("type") && type === "guest")
  ) {
    return <> {children} </>;
  }
  return (
    <Navigate
      to={
        localStorage.getItem("type")
          ? localStorage.getItem("type") === "individual" ||
            localStorage.getItem("type") === "corporate"
            ? "/" + localStorage.getItem("type") + "-trainee"
            : "/" + localStorage.getItem("type")
          : "/"
      }
    />
  );
}

export default PrivateRoute;
