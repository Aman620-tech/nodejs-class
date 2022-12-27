// require 
const { Sequelize } = require('sequelize');

// connection 

// mysql.createconnection({
//     host ,port use ...
// })
// concetion create 

const sequelize = new Sequelize('aman', 'admin', '12345678', {
    host: 'database-1.cphquvmh92gg.ap-south-1.rds.amazonaws.comost',
    dialect: 'mysql'
});

sequelize.
    authenticate().
    then(console.log('Connection has been established successfully.'))
    .catch((err) => ("error could not connectto database "))

// export 
// table name
const User = sequelize.define('student', {
    Name: {
        type: Sequelize.toString,
        allowNull: false,

    },
    Mobile: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true
    }
})

//  first time data send
// Insert into () values ()
sequelize.sync()
    .then(() => {
        return User.create({  //insert 
            Name: "aman",
            Mobile: 12345
        }).then((result))
            .catch((err) => {
                console.log("Error")
            })
    })



// sync().then(function () {
//     //   return Users.create({ // variable name comes here
//     //     firstName: "Aman",
//     //     lastName: "Pandey",
//     //     email: "aman@123",
//     //     Secpass: "Aman12300",
//     //     mobile: "9993935261",
//     //   }).then((result) => {
//     //     console.log(result.get({ plain: true }));
//     //   });
//     // });




