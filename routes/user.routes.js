// express 

const express = require('express')

const routes = express.Router()  

// import controller function 
const {allUser}= require('../controller/user.controller')
// post ,get,put,delete

routes.get('/',allUser)



module.exports = {routes}