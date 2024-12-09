const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const user = require("../../models/User.model");

//regiister
const registerUser = async (req, res) => {
  const { userName, email, password } = req.body;
  try {
    const hashPassword = await bcrypt.hash(password, 12);
    const newUser = new user({
      userName,
      email,
      password: hashPassword,
    });
    await newUser.save();
    res.status(200).json({
      success: "true",
      message: "Registration successful",
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: "false",
      message: "some error occured",
    });
  }
};

//login
const login = async (req, res) => {
  try {
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: "false",
      message: "some error occured",
    });
  }
};

//logout

//middleware

module.exports = { registerUser };
