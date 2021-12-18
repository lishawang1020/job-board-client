import React from "react";
import { Link, NavLink } from "react-router-dom";

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: localStorage.getItem("jobhubUsername"),
    };
  }

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container">
          {this.state.loggedIn ? (
            <h1 className="navbar-brand" to="/">
              Hello {this.state.loggedIn}!
            </h1>
          ) : (
            <h1 className="navbar-brand" to="/">
              JobHub
            </h1>
          )}
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarNavAltMarkup"
          >
            <div className="navbar-nav">
              {this.state.loggedIn ? (
                <React.Fragment>
                  <NavLink className="nav-item nav-link" to="/" exact>
                    Home
                  </NavLink>
                  <NavLink className="nav-item nav-link" to="/favorites">
                    Favorites
                  </NavLink>
                  <NavLink className="nav-item nav-link" to="/post">
                    Post Job
                  </NavLink>
                  <NavLink className="nav-item nav-link" to="/signOut">
                    Sign Out
                  </NavLink>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <NavLink className="nav-item nav-link" to="/" exact>
                    Home
                  </NavLink>
                  <NavLink className="nav-item nav-link" to="/signIn">
                    Log In
                  </NavLink>
                  <NavLink className="nav-item nav-link" to="/signUp">
                    Sign Up
                  </NavLink>
                </React.Fragment>
              )}
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

export default Navbar;
