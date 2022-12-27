const express = require("express");
const app = express();
const userRoutes = require('./routes/user.routes')



app.use(express.json());
app.use('/',userRoutes)




app.listen(3000, () => console.log("server started 3000"));