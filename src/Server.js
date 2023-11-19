const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

app.post("/login", (req, res) => {
  console.log("Login data:", req.body);
  res.status(200).send("Logged in successfully");
});

app.post("/register", (req, res) => {
  console.log("Registration data:", req.body);
  res.status(201).send("Registered successfully");
});

app.post("/account", (req, res) => {
  console.log("Account data:", req.body);
  res.status(200).send("Account updated successfully");
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
