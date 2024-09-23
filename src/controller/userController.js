const userService = require("../service/userSevice");
const { generateHash, decodeJWTtoken } = require("../utils/index.js");
const { checkToken } = require("../utils/authenticate.js");

const getUsers = async (req, res, next) => {
  try {
    const token = checkToken(req);
    const users = await userService.getAllUsers(token);
    res.status(200).json({
      message: "Success",
      data: users,
    });
  } catch (error) {
    next(error);
  }
};

const createUser = async (req, res, next) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  const existedUser = await userService.findUserByEmail(email);
  if (existedUser !== null) {
    return res
      .status(409)
      .json({ message: "User already exists with this email" });
  }
  const hashedPass = generateHash(password);
  const userInfo = { name, email, password: hashedPass };
  const response = await userService.createUser(userInfo);
  res.status(201).json({ message: "created successfully" });
};

const updateUsers = async (req, res, next) => {
  const { status, selectedIds } = req.body;
  if (!status || !selectedIds.length) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    const token = checkToken(req);
    await userService.updateUsers({ status, selectedIds, token });
    res.status(200).json({ message: "updated successfully" });
  } catch (error) {
    next(error);
  }
};

const deleteUserById = async (req, res, next) => {
  try {
    const id = req.params.id;
    checkToken(req); //if token works then will go to the next line
    const response = await userService.deleteUserById(id);
    res.status(200).json({ message: "Deleted Successfully" });
  } catch (error) {
    next(error);
  }
};
const deleteBulkUsers = async (req, res, next) => {
  const selectedIds = req.body;

  if (selectedIds.length == 0) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    checkToken(req);
    const response = await userService.deleteBulkUsers(selectedIds);
    res.status(200).json({ message: "Deleted Successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUsers,
  createUser,
  updateUsers,
  deleteUserById,
  deleteBulkUsers,
};
