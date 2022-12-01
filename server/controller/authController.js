const { OAuth2Client } = require("google-auth-library");
const { verify, sign } = require("jsonwebtoken");
const UserModel = require("../models/UserModel");
const sendEmail = require("../utils/emailVerify");
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const moongoose = require("mongoose");
const { compareSync } = require("bcryptjs");

//METHOD POST
//ROUTE /api/users/login

const userLogin = async (req, res, next) => {
  try {
   //checking for google credentials
    if (req.headers?.authorization?.startsWith("Bearer")) {
      const credentials = req.headers.authorization.split(" ")[1];

      //user details from googleToken
      const data = await client.verifyIdToken({
        idToken: credentials,
        audience: process.env.GOOGLE_CLIENT_ID,
      });
      // console.log(data);

      const user = await UserModel.findOne(
        { email: data?.payload?.email },
        { firstName: true }
      );
      if (!user)
        throw { statusCode: 404, message: "please signup and try again" };
      if (user && user?.isBlocked)
        throw { statusCode: 403, message: "your id has been blocked" };
      // console.log(user);
      else loginRespone(res, user);
      //creating access token
    } else {
      const { email, password } = req.body;

      if (!email || !password)
        throw { statusCode: 400, message: "please provide login credentials" };

      const user = await UserModel.login(req.body);
      loginRespone(res, user);
    }
  } catch (err) {
    next(err);
  }
};

//METHOD POST
//ROUTE /api/users/signup

const userSignup = async (req, res, next) => {
  try {
    if (req?.headers?.authorization?.startsWith("Bearer")) {
      //checking for google credentials
      const token = req?.headers?.authorization?.split(" ")[1];

      const data = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID,
      });
      // console.log(data, "from");

      const userData = {
        email: data.payload.email,
        firstName: data.payload.given_name,
        lastName: data.payload.family_name,
        picture: data.payload.picture,
        email_verified: data.payload.email_verified,
      };

      // console.log(userData);
      const user = await UserModel.signup(userData);
      // console.log(user);
      res.status(200).json({ success: true, ...user });
    }
    // console.log(req.body);
    const { email } = req.body;
    const user = await UserModel.signup(req.body);
    console.log(user);
    await sendEmail(email);
    res.status(201).json({ message: "please verify your email" });
  } catch (err) {
    next(err);
  }
};

//METHOD GET
//ROUTE /api/users/verify/:token

const verifyEmail = async (req, res, next) => { 
  try {
    console.log(req.params);

    const { token } = req.params;
    if (!token) throw { statusCode: 400, message: "invalid request " };

    const decode = verify(token, process.env.EMAIL_SECRET);

    console.log(decode);

    const verifyEmail = await UserModel.findOneAndUpdate(
      { email: decode.email },
      { $set: { email_verified: true } },
      { new: true, select: "email_verified" }
    );
    console.log(verifyEmail);
    res.status(200).json(verifyEmail);
  } catch (err) {
    next(err);
  }
};

//METHOD PUT
//ROUTE /api/users/verify

const resendEmail = async (req, res, next) => {
  try {
    console.log(req.body, "from patch");
    const { email } = req?.body;
    if (!email) throw { statusCode: 400, message: "invalid request " };

    await sendEmail(email);
    res.status(200).json({ success: true });
  } catch (err) {
    next(err);
  }
};

//METHOD DELETE
//ROUTE /api/users/logout

const userLogout = (req, res, next) => {
  console.log(req.userId, req.cookiees);

  //clearing cookie

  res.clearCookie("access_token", { path: "/" });
  res.clearCookie("userId", { path: "/" });
  res.status(200).json({ logout: true });
};

//METHOD POST
//ROUTE /api/admin/login

const adminLogin = async (req, res, next) => {
  console.log(req.body, "admin");
  try {
    const { email, password } = req?.body;
    if (!email || !password)
      throw { statusCode: 403, message: "please provide admin credentials" };

    const admin = await moongoose.connection
      .collection("admin")
      .findOne({ email: email });
    // console.log(admin);

    if (!admin)
      throw { statusCode: 403, message: "please provide correct credentials" };

    console.log(compareSync(password, admin.password));
    if (admin && compareSync(password, admin.password)) {
      const adminToken = sign(
        { adminId: admin._id },
        process.env.ADMIN_JWT_KEY,
        { expiresIn: "1d" }
      );

      res
        .cookie("adminAccessToken", adminToken, {
          httpOnly: true,
          withCredentials: true,
          expires: new Date(Date.now() + 60 * 60 * 24 * 1000),
        })
        .cookie("admin", admin._id, {
          expires: new Date(Date.now() + 60 * 60 * 24 * 1000),
        });

      res.status(200).json({ adminId: admin._id });
    } else
      throw { statusCode: 403, message: "please provide correct credentials" };
  } catch (err) {
    next(err);
  }
};

module.exports = {
  userLogin,
  userSignup,
  verifyEmail,

  resendEmail,
  userLogout,
  adminLogin,
};

//login response to login user

const loginRespone = (res, user) => {
  const access_token = sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  // console.log(access_token);
  //setting access token in cookie

  res
    .cookie("access_token", access_token, {
      path: "/",
      httpOnly: true,
      withCredentials: true,
      expires: new Date(Date.now() + 60 * 60 * 24 * 1000),
    })

    .cookie("userId", user._id.toString(), {
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
