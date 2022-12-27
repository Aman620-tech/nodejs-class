// const { extensions } =  require("sequelize/types/utils/validator-extras");
const { upload } = require("./fileupload");

const register = async (req, res) => {
  const { firstName, email } = req.body;
  //
  //   console.log(req.body);
  const image = req.files["image"];
  extensions = [".png", ".jpg", ".jpeg"];
  //
  const link = await upload(image, extensions);

  const data = { email, firstName, profile: link };
  // res.json({data})
  res.json({ data });
};

module.exports = { register };
