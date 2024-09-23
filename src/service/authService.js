const userService = require("./userSevice");
const { matchPassword, geneateJWTtoken } = require("../utils/index.js");

const login = async ({ email, password }) => {
  const user = await userService.findUserByEmail(email);
  if (!user) {
    const error = new Error("Invalid Credential");
    error.status = 401;
    throw error;
  }
  if (user.status == "blocked") {
    const error = new Error("You are a blocked user");
    error.status = 403;
    throw error;
  }
  const isMatched = matchPassword(password, user.password);
  if (!isMatched) {
    const error = new Error("Invalid Credential");
    error.status = 401;
    throw error;
  }

  const payload = {
    id: user.id,
    name: user.name,
    email: user.email,
  };
  const token = geneateJWTtoken(payload);
  if (!token) {
    const error = new Error("Internal server error");
    error.status = 500;
    throw error;
  }
  user.logInTime = new Date();
  await user.save();
  return {
    name: user.name,
    email: user.email,
    accessToken: token,
  };
};

module.exports = {
  login,
};
