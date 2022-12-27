const express = require("express");
const app = express();
const port = 3001;
const cors = require('cors')
const upload= require('express-fileupload')
const { routes } = require('./routes/routes')
app.use(cors())
app.use(upload())
app.use(express.json())


app.use('/user',routes)


app.get("/", (req, res) => {
  res.send({ status: 200, response: "Hello Human" });
});

app.listen(port, (err) => {
  if (err) {
    return console.log({ Error: err.message });
  }
  console.log(`server started at http://localhost:${port}`);
});
