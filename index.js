const bodyParser = require('body-parser');
const express = require('express');

const app = express();
const port = 3001;
// import routes from routes folder
const {routes} = require('./routes/user.routes');

app.use(express.json());

app.use('/get',routes)


app.listen(port , (error) =>{
    if(error){
        return error
    }else {
        console.log(`server listening on http://localhost${port}`)
    }
})

//  MVC  // Model- table through sequelize 
//  View // frontend 
// Controller // function which method which work register , full data ,delete ,update // logic    
// routes //    port/ - routes // method get,post,put,delete along with function 
