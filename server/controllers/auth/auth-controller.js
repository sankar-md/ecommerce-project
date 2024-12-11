const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const user = require("../../models/User.model");

//regiister
const registerUser = async (req, res) => {
  const { userName, email, password } = req.body;

  try {
    const checkEmail = await user.findOne({ email });
    const checkUser = await user.findOne({ userName });
    if (checkUser)
      return res.json({
        success: false,
        message:
          "User already exist with the same User name! please try with any other username!",
      });
    if (checkEmail)
      return res.json({
        success: false,
        message:
          "User already exist with the same email! please try with any other email!",
      });

    const hashPassword = await bcrypt.hash(password, 12);
    const newUser = new user({
      userName,
      email,
      password: hashPassword,
    });
    await newUser.save();
    res.status(200).json({
      success: true,
      message: "Registration successful",
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "some error occured",
    });
  }
};

//login
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const checkUser = await user.findOne({ email });
    if (!checkUser)
      return res.json({
        success: false,
        message: "User doesn't exists! please Signup first",
      });
    const checkPassMatch = await bcrypt.compare(password, checkUser.password);
    if (!checkPassMatch)
      return res.json({
        success: false,
        message: "Incorrect Password! Please try again",
      });

    const token = jwt.sign(
      {
        id: checkUser._id,
        role: checkUser.role,
        email: checkUser.email,
      },
      "CLIENT_SECRET-KEY",
      { expiresIn: "30m" }
    );
    res.cookie("token", token, { httpOnly: true, secure: false }).json({
      success: true,
      message: "Logged in successfully!",
      user: {
        email: checkUser.email,
        role: checkUser.role,
        id: checkUser._id,
      },
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "some error occured",
    });
  }
};

//logout
const logoutUser = (req, res) => {
  res.clearCookie("token").json({
    success: true,
    message: "Logged Out Successfully!",
  });
};

//middleware
const authMiddleware = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token)
    return res.status(401).json({
      success: false,
      message: "Unauthorized user!",
    });

  try {
    const decoded = jwt.verify(token, "CLIENT_SECRET-KEY");
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Unauthorized user!",
    });
  }
};

module.exports = { registerUser, loginUser, logoutUser, authMiddleware };
