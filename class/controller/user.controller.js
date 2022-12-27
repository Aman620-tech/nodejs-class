const mysqlCon = require("../model/db");
const bcrypt = require("bcrypt");
// console.log(bcrypt)
const jwt = require("jsonwebtoken");
const uuid = require("uuid");

let addEmployee = async (req, res) => {
  try {
    const { userId } = req.params;
    let { fullName, mobileNumber, designation, skills } = req.body;
    const salt = await bcrypt.genSalt(8);

    if (!fullName || !mobileNumber || !designation || !skills) {
      return res.json({ status: 400, response: "Missing parameter" });
    }

    // structure
    const data = {
      id: uuid.v4(),
      mobileNumber,
      designation,
      skills,
      userId,
    };

    console.log("first", data);
    let sqlQuery = `INSERT INTO employee SET ? `;
    const val = await mysqlCon.query(sqlQuery, data, (err, result) => {
      if (err) {
        return res.json({ status: 400, response: err.sqlMessage });
      }
      res.json({
        status: 200,
        response: "employee Registered Successfully",
        result,
      });
    });
    //  database store
  } catch (err) {
    res.json({ status: 400, response: err.message });
  }
};

let viewEmployee = async (req, res) => {
  try {
    const { userId } = req.params;
    let sqlQuery = "SELECT * FROM employee where userId=?";

    const val = await mysqlCon.query(sqlQuery, userId, (err, result) => {
      if (err) {
        return res.json({ status: 400, response: err.message });
      }
      res.json({
        status: 200,
        response: "All Employee",
        employee: result,
      });
    });
  } catch (err) {
    res.json({ status: 400, response: err.message });
  }
};

module.exports = { addEmployee, viewEmployee,viewEmployee };
