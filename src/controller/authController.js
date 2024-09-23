const authService = require("../service/authService");

const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const info = await authService.login({ email, password });
    res.status(200).json({ message: "Login Successful", data: info });
  } catch (error) {
    next(error);
  }
};

module.exports = { login };
