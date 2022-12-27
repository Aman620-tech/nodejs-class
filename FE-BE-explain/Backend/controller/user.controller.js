//
const { connectDb } = require("../database/dbConnect");
const uuid = require("uuid");
const bcrypt = require("bcrypt");

const { tokenCreate } = require("../middleware/auth");

let viewFunction = (req, res) => {
  res.send({ status: 200, response: "controller file access" });
};

// let userRegister = async (req, res) => {
//   try {
//     const { name, email, password } = req.body;
//     if (!name || !email || !password) {
//       return res.json({ status: 400, response: "All attributes required" });
//     }

//     const salt = await bcrypt.genSalt(8);

//     const passwordHash = await bcrypt.hash(password, salt);

//     const userData = {
//       id: uuid.v4(),
//       name,
//       email,
//       password: passwordHash,
//       role: "user",
//     };
//     const sqlQuery = "INSERT INTO user SET ?";
//     await connectDb.query(sqlQuery, userData, async(err, result) => {
//       if (err) {
//         return res.json({ status: 400, response: err.sqlMessage });
//       }
//       const token = await tokenCreate(result[0].id);

//       res.json({ status: 200, response: "User Created Successfully", result ,token});
//     });
//   } catch (err) {
//     res.json({ status: 400, response: err.message });
//   }
// };

let adminRegister = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // hash
    const salt = await bcrypt.genSalt(8);

    const passwordHash = await bcrypt.hash(password, salt);

    const userData = {
      id: uuid.v4(),
      name,
      email,
      password: passwordHash,
      role: "admin",
    };
    const sqlQuery = "INSERT INTO user SET ?";
    await connectDb.query(sqlQuery, userData, async (err, res1) => {
      if (err) {
        return res.json({ Error: err.sqlMessage });
      }
      await connectDb.query(
        "select * from user where email= ?",
        email,
        async (err, result) => {
          if (err) {
            return res.json({ Error: err.sqlMessage });
          }
          const token = await tokenCreate(result[0].id);
          res.json({
            status: 200,
            response: "User Created Successfully",
            result,
            token,
          });
        }
      );
    });
  } catch (err) {
    res.json({ status: 400, response: err.message });
  }

  //
  //   {
  //     "name": "aman pandey",
  //     "email": "admin@gmail.com",
  //     "password": "123456"
  // }

  //   console.log("userData", userData);

  //   res.json({ status: 200, response: userData });
};

let login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const sqlQuery = "SELECT * FROM user where email=?";
    await connectDb.query(sqlQuery, email, async (err, result) => {
      if (err) {
        return res.json({ status: 400, response: err.sqlMessage });
      }
      console.log("result", result[0]);
      if (result[0] === undefined) {
        return res.json({ status: 400, response: "no user found" });
      }
      const dbPassword = await result[0].password;
      const passwordCheck = await bcrypt.compare(password, dbPassword);

      if (passwordCheck === false) {
        return res.json({ status: 400, response: "InCorrect password" });
      }
      const token = await tokenCreate(result[0].id);

      res.json({
        status: 200,
        response: "logged in Successfully",
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
    // direct query
    let sqlQuery = `SELECT id,name,email,role FROM user`;
    connectDb.query(sqlQuery, (err, result) => {
      if (err) {
        return res.json({ status: 400, response: err.sqlMessage });
      }
      res.json({
        status: 200,
        response: "All User",
        user: result,
      });
    });
  } catch (err) {
    res.json({ status: 400, response: err.message });
  }
};

module.exports = {
  viewFunction,
  // userRegister,
  adminRegister,
  login,
  allUser,
};
