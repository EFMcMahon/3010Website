import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
  Navigate,
} from "react-router-dom";
import { UserContext, UserProvider } from "./userContext";
import Home from "./Home";
import Account from "./Account";
import Login from "./Login";
import Registration from "./Registration";
import "./App.css";

function App() {
  return (
    <UserProvider>
      <Router>
        <Navigation />
        <MainRoutes />
        <Footer />
      </Router>
    </UserProvider>
  );
}

function Navigation() {
  const { user, logout } = useContext(UserContext);
  const isLoggedIn = user !== null;

  return (
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
                    logout();
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
  );
}

function MainRoutes() {
  const { user } = useContext(UserContext);
  const isLoggedIn = user !== null;

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/account"
        element={isLoggedIn ? <Account /> : <Navigate to="/login" />}
      />
      <Route
        path="/login"
        element={!isLoggedIn ? <Login /> : <Navigate to="/account" />}
      />
      <Route
        path="/registration"
        element={!isLoggedIn ? <Registration /> : <Navigate to="/account" />}
      />
    </Routes>
  );
}

function Footer() {
  return (
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
  );
}

export default App;
