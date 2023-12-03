import React, { useState } from "react";
import axios from "axios";

function Registration() {
  const [newUser, setNewUser] = useState({
    userName: "",
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

    if (newUser.password !== newUser.repeatPassword) {
      console.error("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3001/register", {
        userName: newUser.userName,
        password: newUser.password,
      });
      console.log(response.data);
    } catch (error) {
      console.error(
        "Registration error:",
        error.response?.data?.error || error
      );
    }
  };

  return (
    <main>
      <form className="accountForm" onSubmit={handleSubmit}>
        <h1>Registration</h1>
        <label htmlFor="userName">User Name</label>
        <input
          type="text"
          id="userName"
          name="userName"
          value={newUser.userName}
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
