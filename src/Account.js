import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserContext } from "./userContext"; 
import "./Account.css";

function Account() {
  const { user } = useContext(UserContext); 
  const userId = user ? user.userId : null; 

  const [accountInfo, setAccountInfo] = useState({
    userId: userId,
    firstName: "",
    lastName: "",
    address1: "",
    address2: "",
    city: "",
    state: "state1",
    zipCode: "",
    phoneNumber: "",
    email: "",
  });

  useEffect(() => {
    if (!userId) {
      console.error("No user ID provided");
    }
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAccountInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleReset = () => {
    setAccountInfo({
      userId,
      firstName: "",
      lastName: "",
      address1: "",
      address2: "",
      city: "",
      state: "state1",
      zipCode: "",
      phoneNumber: "",
      email: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3001/account",
        accountInfo
      );
      console.log(response.data);
    } catch (error) {
      console.error("Account update error:", error);
    }
  };

  return (
    <main className="accountForm">
      <h1>Account Information</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="firstName">First Name</label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          value={accountInfo.firstName}
          onChange={handleChange}
          required
        />

        <label htmlFor="lastName">Last Name</label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          value={accountInfo.lastName}
          onChange={handleChange}
          required
        />

        <label htmlFor="address1">Address Line 1</label>
        <input
          type="text"
          id="address1"
          name="address1"
          value={accountInfo.address1}
          onChange={handleChange}
          required
        />

        <label htmlFor="address2">Address Line 2</label>
        <input
          type="text"
          id="address2"
          name="address2"
          value={accountInfo.address2}
          onChange={handleChange}
        />

        <label htmlFor="city">City</label>
        <input
          type="text"
          id="city"
          name="city"
          value={accountInfo.city}
          onChange={handleChange}
          required
        />

        <label htmlFor="state">State</label>
        <select
          id="state"
          name="state"
          value={accountInfo.state}
          onChange={handleChange}
        >
          <option value="state1">State 1</option>
          <option value="state2">State 2</option>
        </select>

        <label htmlFor="zipCode">Zip Code</label>
        <input
          type="text"
          id="zipCode"
          name="zipCode"
          value={accountInfo.zipCode}
          onChange={handleChange}
          required
        />

        <label htmlFor="phoneNumber">Phone Number</label>
        <input
          type="text"
          id="phoneNumber"
          name="phoneNumber"
          value={accountInfo.phoneNumber}
          onChange={handleChange}
          required
        />

        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={accountInfo.email}
          onChange={handleChange}
          required
        />

        <input type="submit" value="Submit" />
        <input type="reset" value="Reset" onClick={handleReset} />
      </form>
    </main>
  );
}

export default Account;
