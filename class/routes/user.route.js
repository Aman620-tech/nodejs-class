const express = require("express");
const userRoutes = express.Router();
const {
  userRegister,
  userLogin,
  allUser,
  singleUser,
  updateUser,
  deleteUser,
} = require("../controller/auth.controller");
const { addEmployee, viewEmployee } = require("../controller/user.controller");

userRoutes.post("/register", userRegister);
userRoutes.post("/login", userLogin);
userRoutes.get("/all-user", allUser);
userRoutes.get("/:id", singleUser);
userRoutes.patch("/update/:id", updateUser);
userRoutes.delete("/delete/:id", deleteUser);
userRoutes.post("/add-employee/:userId", addEmployee);
userRoutes.post("/view-employee/:userId", viewEmployee);

module.exports = { userRoutes };
