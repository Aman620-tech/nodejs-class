const dotenv = require("dotenv");
dotenv.config({ path: ".env" });
const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());

const { userRoutes } = require("./routes/user.route");

// middleware
//   acess

app.use("/user", userRoutes);

app.get("/", (req, res) => {
  res.send("Hello Human");
});

app.listen(4000, () => {
  console.log("server started ");
});
