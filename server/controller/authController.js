const UserModel = require("../models/UserModel");

//METHOD POST
//ROUTE /api/users/login

const userLogin = async (req, res) => {
  console.log(req.body);
  const user = await UserModel.create(req.body);
  res.status(200).json(user);
};

//METHOD POST
//ROUTE /api/users/signup
const userSignup = (req, res) => {
  console.log(req.body);
  res.status(201).json(req.body);
};

module.exports = { userLogin, userSignup };
