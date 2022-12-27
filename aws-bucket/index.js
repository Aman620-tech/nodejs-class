const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });
const port = parseInt(process.env.PORT) || 3002;
const express = require("express");
const app = express();
const upload = require("express-fileupload");
// ======================

const { router } = require("./router");

// ======================
app.use(upload());
app.use(express.json());

app.use("/", router);

// ======================
app.listen(port, () => {
  console.log(` server started at http://localhost:${port}`);
});
