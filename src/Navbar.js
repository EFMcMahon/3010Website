import React from "react";
import { NavLink } from "react-router-dom";

function Navbar({ isLoggedIn, setIsLoggedIn }) {
  return (
    <nav className="navbar navbar-inverse">
      <div className="container-fluid">
        <div className="navbar-header">
          <NavLink to="/" className="navbar-brand">
            <img src="/sns.png" alt="sns" width="50" height="30" />
          </NavLink>
        </div>
        <div className="navbar-links">
          <ul className="nav navbar-nav">
            <li>
              <NavLink
                to="/"
                exact
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Home
              </NavLink>
            </li>
          </ul>
          <ul className="nav navbar-nav navbar-right">
            {isLoggedIn ? (
              <>
                <li>
                  <NavLink
                    to="/account"
                    className={({ isActive }) => (isActive ? "active" : "")}
                  >
                    Account
                  </NavLink>
                </li>
                <li>
                  <a
                    href="#logout"
                    onClick={(e) => {
                      e.preventDefault();
                      setIsLoggedIn(false);
                    }}
                  >
                    Logout
                  </a>
                </li>
              </>
            ) : (
              <>
                <li>
                  <NavLink
                    to="/registration"
                    className={({ isActive }) => (isActive ? "active" : "")}
                  >
                    Register
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/login"
                    className={({ isActive }) => (isActive ? "active" : "")}
                  >
                    Login
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
