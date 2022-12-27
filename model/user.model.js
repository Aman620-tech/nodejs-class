//  sequelize  table create 
const { Sequelize } = require('sequelize');

// connection create
const deepak = new Sequelize('nest', 'postgres', '12345', {  // mysql username - root , password - ""
    host: 'localhost',
    dialect: 'postgres' ,
    port :5432,
    logging: false
  });

//  check connection

  deepak.authenticate()
.then(console.log("database connected"))
.catch((err)=> console.log(err.message));

// table create

const sahu = deepak.define('deepak_seq',{
    firstName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      lastName: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true, // value is unique not repeat 
      },
});

//first time 
// tabel database create 

// sahu.sync().then(()=> {
//     return sahu.create({   // create - insert  mysql command 
//         firstName: "Aman",
//         lastName: "Pandey",
//         email: "aman@123"}
//         )}).then(console.log("User added"))



 // connectivity   // table name 

module.exports ={deepak , sahu}