const User = require("../model/userModel");
const { decodeJWTtoken } = require("../utils/index");

const getAllUsers = async (token) => {
  const { email } = decodeJWTtoken(token);
  const user = await findUserByEmail(email);
  if (!user) {
    const error = new Error("User does not exist");
    error.status = 404;
    throw error;
  }
  const users = await User.findAll({
    attributes: {
      exclude: ["password"],
    },
  });
  return users;
};

const createUser = async (userInfo) => {
  const { name, email, password } = userInfo;
  try {
    return await User.create({
      name,
      email,
      password,
      registrationTime: new Date(),
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const updateUsers = async ({ status, selectedIds = [], token }) => {
  const { email } = decodeJWTtoken(token);
  const user = await findUserByEmail(email);
  if (!user) {
    const error = new Error("Please log in first");
    error.status = 404;
    throw error;
  }

  if (user.status == "blocked") {
    const error = new Error("You are a blocked user");
    error.status = 403;
    throw error;
  }

  try {
    const updatedUsers = await User.update(
      { status: status },
      {
        where: {
          id: selectedIds,
        },
      }
    );
    return updatedUsers;
  } catch (error) {
    error.status = 500;
    error.message = "Server Error Occured";
    throw error;
  }
};

const deleteUserById = async (id) => {
  const user = await findUserById(id);
  if (!user) {
    return res.status(404).json({ message: "User doesn't exist" });
  }
  return User.destroy({ where: { id: id } });
};

const deleteBulkUsers = async (ids = []) => {
  try {
    const deletedCount = await User.destroy({ where: { id: ids } });
    if (deletedCount == 0) {
      const error = new Error("No users found with this provided id");
      error.status = 404;
      throw error;
    }
    return deletedCount;
  } catch (error) {
    error.status = 500;
    error.message = "server error occured";
    throw error;
  }
};

const findUserByEmail = async (email) => {
  return User.findOne({ where: { email: email } });
};

const findUserById = async (id) => {
  return User.findOne({ where: { id: id } });
};

module.exports = {
  getAllUsers,
  createUser,
  updateUsers,
  findUserByEmail,
  findUserById,
  deleteUserById,
  deleteBulkUsers,
};
