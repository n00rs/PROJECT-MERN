const { verify } = require("jsonwebtoken");
const UserModel = require("../models/UserModel");
const sendEmail = require("../utils/emailVerify");

//METHOD POST
//ROUTE /api/users/login

const userLogin = async (req, res) => {
  try {
    // var users = {
    //     agent: req.header('user-agent'), // User Agent we get from headers
    //     referrer: req.header('referrer'), //  Likewise for referrer
    //     ip: req.header('x-forwarded-for') || req.connection.remoteAddress, // Get IP - allow for proxy
    //     screen: { // Get screen info that we passed in url post data
    //       width: req.param('width'),
    //       height: req.param('height')
    //     }
    //   };
    // console.log(req.body,users);
   
    const user = await UserModel.login(req.body);
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    const statusCode = err.status ? err.status : 500;
    res.status(statusCode).json(err.message);
  }
};

//METHOD POST
//ROUTE /api/users/signup
const userSignup = async (req, res) => {
  try {
    console.log(req.body);
    const { email } = req.body;

    const user = await UserModel.signup(req.body);
    console.log(user);
    await sendEmail(email);
    res.status(201).json({ message: "please verify your email" });
  } catch (error) {
    console.log(error.message);
    const statusCode = error.status ? error.status : 500;
    res.status(statusCode).json(error.message);
  }
};

//METHOD GET
//ROUTE /api/users/verify/:token

const verifyEmail = async (req, res) => {
  try {
    console.log(req.params);
    const { token } = req.params;
    const decode = verify(token, process.env.EMAIL_SECRET);
    console.log(decode);
    const verifyEmail = await UserModel.findOneAndUpdate(
      { email: decode.email },
      { $set: { verified: true } },
      { new: true, select: "verified" }
    );
    console.log(verifyEmail);
    res.json(verifyEmail);
  } catch (err) {
    console.log(err);
    res.status(500).json(err.message);
  }
};
module.exports = { userLogin, userSignup, verifyEmail };
