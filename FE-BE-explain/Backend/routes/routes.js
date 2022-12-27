const express = require("express");
const routes = express.Router();
const {
  viewFunction,
  // userRegister,
  adminRegister,
  login,
  allUser,
} = require("../controller/user.controller");
// const userFile =   require("../controller/user.controller");
const {adminCheck,userCheck} = require('../middleware/auth')


routes.get("/view", viewFunction);
// routes.get("/view-user",userCheck, viewFunction);
// routes.post("/register", userRegister);
routes.post("/admin-register", adminRegister);
routes.post("/login", login);



routes.get("/all-user",adminCheck,allUser);

module.exports = { routes };
