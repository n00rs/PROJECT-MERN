const { OAuth2Client } = require("google-auth-library");
const { verify, sign } = require("jsonwebtoken");
const UserModel = require("../models/UserModel");
const sendEmail = require("../utils/emailVerify");
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

//METHOD POST
//ROUTE /api/users/login

const userLogin = async (req, res) => {
  try {
    console.log();
    //checking for google credentials
    if (req?.headers?.authorization?.startsWith("Bearer")) {
      const credentials = req.headers.authorization.split(" ")[1];

      //user details from google
      const data = await client.verifyIdToken({
        idToken: credentials,
        audience: process.env.GOOGLE_CLIENT_ID,
      });
      console.log(data);

      const user = await UserModel.find(
        { email: data?.payload?.email },
        { firstName: true }
      );

      console.log(user);

      loginRespone(res, user);
      //creating access token
    } else {
      const { email, password } = req.body;
      if (!email || !password)
        throw { status: 400, message: "please provide login credentials" };
      const user = await UserModel.login(req.body);

      loginRespone(res, user);
    }
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
    if (req?.headers?.authorization?.startsWith("Bearer")) {
      //checking for google credentials
      const token = req?.headers?.authorization?.split(" ")[1];

      const data = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID,
      });
      console.log(data, "from");

      const userData = {
        email: data.payload.email,
        firstName: data.payload.given_name,
        lastName: data.payload.family_name,
        picture: data.payload.picture,
        email_verified: data.payload.email_verified,
      };

      console.log(userData);
      const user = await UserModel.signup(userData);
      console.log(user);
      res.status(200).json({ success: true, ...user });
    }
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

const cart = (req, res) => {
  try {
    res.status(200).json(req.userId);
  } catch (err) {
    const statusCode = err.status ? err.status : 500;
  }
};

module.exports = { userLogin, userSignup, verifyEmail ,cart};

const loginRespone = (res, user) => {
  const access_token = sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  //setting access token in cookie

  res
    .cookie("access_token", access_token, {
      path: "/",
      httpOnly: true,
      withCredentials: true,
      expires: new Date(Date.now() + 60 * 60 * 24 * 1000),
    })

    .cookie("userId", user._id, {
      path: "/",
      httpOnly: false,
      expires: new Date(Date.now() + 60 * 60 * 24 * 1000),
    });

  res.status(200).json(user);
};

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
