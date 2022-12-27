// 1- module call
const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

// 2 -  module assign  use
const app = express();

// Database access

const con = mysql.createConnection({
  host: "database-1.cphquvmh92gg.ap-south-1.rds.amazonaws.com", // RDS link
  user: "admin", // -u
  password: "12345678", // -p
  database: "zomato", //  database select
});

con.connect((err, res) => {
  if (err) {
    console.log(err.sqlMessage);
  } else {
    console.log("Boom guys Database se connection ho gya ");
  }
});

// 3-  function creation

//  server start

app.listen(3002, () => {
  console.log("Server started");
});
