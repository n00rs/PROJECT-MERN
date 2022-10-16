const mongoose = require("mongoose");
const { hashSync, compareSync } = require("bcryptjs");

const addressSchema = new mongoose.Schema({
  street: String,
  city: String,
});

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: String,
  email: {
    unique: true,
    type: String,
    lowercase: true,
    required: true,
  },
  password: String,
  verified: {
    type: Boolean,
    default: false,
  },
  address: addressSchema,
});

userSchema.statics.signup = async function (userData) {
  console.log(userData, "data");

//   const existingUser = await this.findOne({ email: userData.email }); //checking for user already exist better  latency

//   console.log(existingUser);

//   if (existingUser) throw { status: 422, message: "user Exist please login" };

  const hashPass = hashSync(userData.password);
  const userObj = {
    firstName: userData.firstName,
    lastName: userData.lastName,
    email: userData.email,
    password: hashPass,
  };

  const newUser = await this.create(userObj);
  console.log(newUser);
  return newUser;
};
userSchema.statics.login = async function ({ email, password }) {
  if (!email || !password)
    throw { status: 400, message: "please provide login credentials" };
  const user =await this.findOne({ email });
  console.log(user);
  if (user && user.verified && compareSync(password, user?.password))
    return user;
  else throw { status: 403, message: "user does'nt exist or not verified" };
};
module.exports = mongoose.model("User", userSchema);
