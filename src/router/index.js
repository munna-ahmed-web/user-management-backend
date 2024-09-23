const express = require("express");
const userController = require("../controller/userController");
const authController = require("../controller/authController");

const router = express.Router();

//public routes
router.post("/register", userController.createUser);
router.post("/login", authController.login);

//private routes
router.get("/users", userController.getUsers);
router.patch("/users", userController.updateUsers);
router.delete("/delete/bulk", userController.deleteBulkUsers);
router.delete("/delete/:id", userController.deleteUserById);

module.exports = router;
