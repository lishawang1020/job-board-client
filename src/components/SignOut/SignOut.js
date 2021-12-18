import React from "react";
import { Navigate } from "react-router-dom";

const SignOut = (props) => {
  if (localStorage.getItem("jobhubUsername")) {
    localStorage.removeItem("jobhubUsername");
  }
  return <Navigate to="/signIn" />;
};

export default SignOut;
