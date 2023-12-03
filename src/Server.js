const express = require("express");
const app = express();
const cors = require("cors");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const UserAccountsRepository = require("./repositories/userAccountsRepository");
const UserAccountDetailsRepository = require("./repositories/userAccountDetailsRepository");

app.use(cors());
app.use(express.json());

const userAccountsRepository = new UserAccountsRepository();
const userAccountDetailsRepository = new UserAccountDetailsRepository();

const validateRequestBody = (req, res, next) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).send("Request body is missing");
  }
  next();
};

app.post("/login", validateRequestBody, async (req, res) => {
  try {
    const { userName, password } = req.body;
    const existingUser = await userAccountsRepository.select(userName);
    if (!existingUser) {
      return res.status(400).send("User account does not exist");
    }
    const match = await bcrypt.compare(password, existingUser.password);
    if (match) {
      res.status(200).json({ id: existingUser.id });
    } else {
      res.status(401).send("Password does not match");
    }
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).send("An error occurred during login");
  }
});

app.post("/register", validateRequestBody, async (req, res) => {
  try {
    const { userName, password } = req.body;
    const existingUser = await userAccountsRepository.select(userName);
    if (existingUser) {
      return res.status(409).send("Username already exists");
    }
    const salt = await bcrypt.genSalt(saltRounds);
    const passwordHash = await bcrypt.hash(password, salt);
    const newUser = await userAccountsRepository.insert(userName, passwordHash);
    res.status(201).json({ id: newUser.id });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).send("An error occurred during registration");
  }
});

app.post("/account", validateRequestBody, async (req, res) => {
  try {
    const { userId, ...accountDetails } = req.body;
    console.log("Received user ID:", userId);

    const existingDetails = await userAccountDetailsRepository.select(userId);
    let details;
    if (existingDetails) {
      details = await userAccountDetailsRepository.update(
        userId,
        accountDetails
      );
    } else {
      details = await userAccountDetailsRepository.insert(
        userId,
        accountDetails
      );
    }
    res.status(existingDetails ? 200 : 201).json(details);
  } catch (error) {
    console.error("Account update error:", error);
    res.status(500).send("An error occurred updating account details");
  }
});

app.get("/account/:userId", async (req, res) => {
  const { userId } = req.params;
  const details = await userAccountDetailsRepository.select(userId);
  if (details) {
    res.status(200).json(details);
  } else {
    res.status(204).send();
  }
});

app.get("/current-user", async (req, res) => {
  if (req.session && req.session.userId) {
    res.json({ userId: req.session.userId });
  } else {
    res.status(401).send("User not authenticated");
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});