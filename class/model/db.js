const mysql = require("mysql");

const mysqlCon = mysql.createConnection({
  host: process.env.DB_HOST,
  port: 3306,
  user: process.env.DB_user,
  password: process.env.DB_password,
  database: process.env.DB_database,
  insecureAuth: true,
});

mysqlCon.connect((err) => {
  if (err) {
    return console.log(err.sqlMessage);
  }
  console.log("Mysql connection done");
});

module.exports = mysqlCon;
