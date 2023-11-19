import React, { useState } from "react";
import axios from "axios";

function Login({ setIsLoggedIn }) {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

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
      console.log(response.data);
      setIsLoggedIn(true);
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <main>
      <form className="accountForm" onSubmit={handleLogin}>
        <h1>Login</h1>
        <label htmlFor="username">User Name</label>
        <input
          type="text"
          id="username"
          name="username"
          value={credentials.username}
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
