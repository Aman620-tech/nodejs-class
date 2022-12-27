const jwt = require("jsonwebtoken");
const SECURED_KEY = "my name is aman";
const { connectDb } = require("../database/dbConnect");

let tokenCreate = async (id) => {
  const token = await jwt.sign({ id }, SECURED_KEY);

  return token;
};

//  middleware

let adminCheck = async (req, res, next) => {
  try {
    const token = req.header("token");
    const tokenVerify = await jwt.verify(token, SECURED_KEY);

    if (tokenVerify) {
      const sqlQuery = "SELECT role FROM user where id = ?";

      await connectDb.query(sqlQuery, tokenVerify.id, (err, result) => {
        if (err) {
          return res.send({ status: 400, response: " inValid User" });
        }
        const role = result[0].role;

        if (role === "admin") {
          return next();
        }

        res.send({ status: 400, response: "  Not a Admin" });
      });
    }
  } catch (err) {
    res.send({ status: 400, response: "token required" });
  }
};

let userCheck = async (req, res, next) => {
  try {
    const token = req.header("token");

    if (!token) {
      return res.send({ status: 400, response: " No authorization is send" });
    }

    const tokenVerify = await jwt.verify(token, SECURED_KEY);

    if (tokenVerify) {
      const sqlQuery = "SELECT role FROM user where id = ?";

      await connectDb.query(sqlQuery, tokenVerify.id, (err, result) => {
        if (err) {
          return res.send({ status: 400, response: " inValid User" });
        }
        const role = result[0].role;

        if (role === "user") {
          return next();
        }

        res.send({ status: 400, response: "  Not Admin" });
      });
    }
  } catch (err) {
    res.send({ status: 400, response: "token required" });
  }
};

module.exports = { tokenCreate, adminCheck, userCheck };
