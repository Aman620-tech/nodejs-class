const mysqlCon = require("../model/db");
const bcrypt = require("bcrypt");
// console.log(bcrypt)
const jwt = require("jsonwebtoken");
const uuid = require("uuid");
let userRegister = async (req, res) => {
  try {
    let { fullName, email, mobileNumber, password } = req.body;
    const salt = await bcrypt.genSalt(8);

    let pass = await bcrypt.hash(password, salt);
    if (!fullName || !email || !mobileNumber || !password) {
      return res.json({ status: 400, response: "Missing parameter" });
    }

    // structure
    const data = {
      id: uuid.v4(),
      fullName,
      email,
      mobileNumber,
      password: pass,
      role: "admin",
    };

    console.log("first", data);
    let sqlQuery = `INSERT INTO user SET ?;`;
    const val = await mysqlCon.query(sqlQuery, data, (err, result) => {
      if (err) {
        return res.json({ status: 400, response: err.message });
      }
      res.json({
        status: 200,
        response: "user Registered Successfully",
        result,
      });
    });
    //  database store
  } catch (err) {
    res.json({ status: 400, response: err.message });
  }
};

let userLogin = async (req, res) => {
  try {
    let { email, mobileNumber, password } = req.body;
    let sqlQuery = `SELECT * FROM user WHERE email="${email}" OR mobileNumber="${mobileNumber}"`;
    await mysqlCon.query(sqlQuery, async (err, result) => {
      if (err) {
        return res.json({ status: 400, response: err.message });
      }
      //    conditional statement if /else
      if (result === undefined) {
      }
      const userPass = result[0].password;
      console.log(userPass);
      // password check
      const passwordCheck = await bcrypt.compare(password, userPass);
      console.log(passwordCheck);
      if (!passwordCheck) {
        return res.json({ status: 400, response: "oops wrong password" });
      }

      const token = await jwt.sign({ email }, process.env.JWT_SECRET_KEY, {
        expiresIn: "1d",
      });

      res.json({
        status: 200,
        response: "logged in successfully",
        token,
        result,
      });
    });
  } catch (err) {
    res.json({ status: 400, response: err.message });
  }
};

let allUser = async (req, res) => {
  try {
    let sqlQuery = `SELECT * FROM user`;
    await mysqlCon.query(sqlQuery, async (err, result) => {
      if (err) {
        return res.json({ status: 400, response: err.message });
      }

      res.json({
        status: 200,
        response: "All users",

        users: result,
      });
    });
  } catch (err) {
    res.json({ status: 400, response: err.message });
  }
};
let singleUser = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("first", id);
    let sqlQuery = `SELECT * FROM user where id =? `;
    await mysqlCon.query(sqlQuery, id, async (err, result) => {
      if (err) {
        return res.json({ status: 400, response: err.message });
      }

      res.json({
        status: 200,
        response: "All users",

        users: result,
      });
    });
  } catch (err) {
    res.json({ status: 400, response: err.message });
  }
};
let updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { fullName, email, mobileNumber, password } = req.body;
    const data = { fullName, email, mobileNumber, password };
    console.log("first", id);
    let sqlQuery = `update  user SET ? where id =? `;
    await mysqlCon.query(sqlQuery, [data, id], async (err, result) => {
      if (err) {
        return res.json({ status: 400, response: err.message });
      }
      res.json({
        status: 200,
        response: "All users",

        users: result,
      });
    });
  } catch (err) {
    res.json({ status: 400, response: err.message });
  }
};

let deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    // const { fullName, email, mobileNumber, password } = req.body;
    // const data = { fullName, email, mobileNumber, password };
    console.log("first", id);
    let sqlQuery = `DELETE FROM user  where id =? `;
    await mysqlCon.query(sqlQuery, id, async (err, result) => {
      if (err) {
        return res.json({ status: 400, response: err.message });
      }
      res.json({
        status: 200,
        response: "All users",

        users: result,
      });
    });
  } catch (err) {
    res.json({ status: 400, response: err.message });
  }
};

module.exports = {
  userRegister,
  userLogin,
  allUser,
  singleUser,
  updateUser,
  deleteUser,
};
