import React, { useState } from "react";
import axios from "axios";

function Registration() {
  const [newUser, setNewUser] = useState({
    username: "",
    password: "",
    repeatPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3001/register",
        newUser
      );
      console.log(response.data);
      // Handle registration success (e.g., notify the user, redirect, etc.)
    } catch (error) {
      console.error("Registration error:", error);
      // Handle the error (e.g., show an error message)
    }
  };

  return (
    <main>
      <form className="accountForm" onSubmit={handleSubmit}>
        <h1>Registration</h1>
        <label htmlFor="username">User Name</label>
        <input
          type="text"
          id="username"
          name="username"
          value={newUser.username}
          onChange={handleChange}
          required
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={newUser.password}
          onChange={handleChange}
          required
        />
        <label htmlFor="repeatPassword">Repeat Password</label>
        <input
          type="password"
          id="repeatPassword"
          name="repeatPassword"
          value={newUser.repeatPassword}
          onChange={handleChange}
          required
        />
        <input type="submit" value="Submit" />
        <input type="reset" value="Reset" />
      </form>
    </main>
  );
}

export default Registration;
