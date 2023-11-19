import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
  Navigate,
} from "react-router-dom";

import Home from "./Home";
import Account from "./Account";
import Login from "./Login";
import Registration from "./Registration";
import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <nav className="navbar navbar-inverse">
        <div className="container-fluid">
          <div className="navbar-header">
            <NavLink to="/" className="navbar-brand">
              <img src="/sns.png" alt="Home" width="50" height="30" />
            </NavLink>
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
          </div>
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
      </nav>

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/account"
          element={isLoggedIn ? <Account /> : <Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={
            !isLoggedIn ? (
              <Login setIsLoggedIn={setIsLoggedIn} />
            ) : (
              <Navigate to="/account" />
            )
          }
        />
        <Route
          path="/registration"
          element={!isLoggedIn ? <Registration /> : <Navigate to="/account" />}
        />
      </Routes>
      <footer className="footer">
        <div className="container-fluid text-center">
          <a
            href="https://www.youtube.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            YouTube
          </a>
        </div>
      </footer>
    </Router>
  );
}

export default App;
