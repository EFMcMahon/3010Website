import React, { useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "./userContext";

function Login({ setIsLoggedIn }) {
  const [credentials, setCredentials] = useState({
    userName: "",
    password: "",
  });

  const { login } = useContext(UserContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3001/login",
        credentials
      );
      login(response.data);
      setIsLoggedIn(true);
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <main>
      <form className="accountForm" onSubmit={handleLogin}>
        <h1>Login</h1>
        <label htmlFor="userName">User Name</label>
        <input
          type="text"
          id="userName"
          name="userName"
          value={credentials.userName}
          onChange={handleChange}
          required
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={credentials.password}
          onChange={handleChange}
          required
        />
        <input type="submit" value="Submit" />
        <input type="reset" value="Reset" />
      </form>
    </main>
  );
}

export default Login;
