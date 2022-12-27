const db = require("../model/models/index");
const { hash, compare, genSalt } = require("bcrypt");
const { sign } = require("jsonwebtoken");
let Register = async (req, res) => {
  try {
    // destructure
    const { password, email, lastName, firstName } = req.body;

    // always string
    const salt = await genSalt(8);
    const hashPassword = await hash(password, salt);
    console.log("first", password, "second", hashPassword);
    // strucutring
    let data = { password: hashPassword, email, lastName, firstName };

    const registerUser = await db.User.create(data);

    // token
    res.send({ status: 200, response: registerUser });
  } catch (err) {
    res.send({ Error: err.message });
  }
};

let login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await db.User.findOne({ where: { email } });
    const checkPassword = await compare(password, user.password);

    if (checkPassword === false) {
      return res.send({ response: "password not matched" });
    }
    // token

    const token = await sign({id:user.id},"my name is aman",)

    res.send({ user,token });
  } catch (err) {
    res.json({ status: 200, response: err.message });
  }
};

module.exports = { Register, login };
