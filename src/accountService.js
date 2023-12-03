const UserAccountDetailsRepository = require("./repositories/userAccountDetailsRepository");

const createAccountDetails = async (request, response) => {
  const userAccountDetailsRepository = new UserAccountDetailsRepository();
  const accountDetails = request.body;

  try {
    const newDetails = await userAccountDetailsRepository.insert(
      accountDetails
    );
    response.status(201).json(newDetails);
  } catch (error) {
    console.error("Account creation error:", error);
    response.status(500).send("An error occurred creating account details");
  }
};

module.exports = createAccountDetails;
