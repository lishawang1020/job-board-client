import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import React, { useState } from "react";
import "./Form.css";
import Navbar from "../Navbar/Navbar";

export default function SignUp() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  if (localStorage.getItem("jobhubUsername")) {
    return <Navigate to="/" />;
  }
  return (
    <div>
      <Navbar />
      <div className="text-center" id="main">
        <div className="form-signin" id="authForm">
          <h1 className="h3 mb-3 fw-normal">Sign Up</h1>

          <div className="form-floating">
            <input
              value={userData.username}
              onChange={(e) => {
                const username = e.target.value;
                setUserData({
                  ...userData,
                  username: username,
                });
              }}
              className="form-control"
              id="floatingInput"
              placeholder="Username"
            />
            <label>Username</label>
          </div>
          <div className="form-floating">
            <input
              value={userData.password}
              onChange={(e) => {
                const password = e.target.value;
                setUserData({
                  ...userData,
                  password: password,
                });
              }}
              type="password"
              className="form-control"
              id="floatingPassword"
              placeholder="Password"
            />
            <label>Password</label>
          </div>
          <div className="form-floating">
            <input
              value={userData.confirmPassword}
              onChange={(e) => {
                const confirmPassword = e.target.value;
                setUserData({
                  ...userData,
                  confirmPassword: confirmPassword,
                });
              }}
              type="password"
              className="form-control"
              id="floatingPassword"
              placeholder="Confirm Password"
            />
            <label>Confirm Password</label>
          </div>

          <button
            onClick={() => {
              if (!userData.username || !userData.password) {
                alert("Please enter username and password");
              } else if (userData.password !== userData.confirmPassword) {
                alert("Passwords do not match");
              } else {
                let data = {};
                data.username = userData.username;
                data.password = userData.password;
                axios
                  .post("/api/user", data)
                  .then((response) => {
                    if (response.status === 200) {
                      localStorage.setItem("jobhubUsername", userData.username);
                      navigate("/");
                    }
                  })
                  .catch((error) => {
                    if (error.response.status === 409) {
                      alert("Username already exists");
                    }
                  });
              }
            }}
            className="w-100 btn btn-lg btn-primary"
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}
