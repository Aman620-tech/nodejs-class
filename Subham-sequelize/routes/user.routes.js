const express = require("express");
const userRoutes = express.Router();

const {Register,login} =require('../controller/user.controller') 



userRoutes.get('/',(req,res)=>{
    res.send({Status: "ok"})
})

userRoutes.post('/register', Register)
userRoutes.post('/login', login)

module.exports = userRoutes;