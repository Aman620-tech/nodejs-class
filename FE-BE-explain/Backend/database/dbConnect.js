const mysql = require("mysql");

const connectDb = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "user",
});

connectDb.connect((err) => {
  if (err) {
    return console.log({ Error: err.sqlMessage });
  }
  console.log("Database Connected")
});

module.exports = { connectDb };
