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
  password: { type: String, default: null },
  picture: { type: String, default: null },
  email_verified: { type: Boolean, default: false },
  address: addressSchema,
  isBlocked: { type: Boolean, default: false },
});

userSchema.statics.signup = async function (userData) {
  console.log(userData, "data");

  const existingUser = await this.findOne({ email: userData.email });  //                    //checking for user already exist better  latency

  console.log(existingUser);

  if (existingUser)
    throw { statusCode: 422, message: "user Exist please login" };

  const hashPass = userData.password && hashSync(userData.password);
  const userObj = {
    firstName: userData.firstName,
    lastName: userData.lastName,
    email: userData.email,
    password: hashPass ? hashPass : null,
    picture: userData?.picture,
    email_verified: userData.email_verified,
  };

  const newUser = await this.create(userObj);
  console.log(newUser);
  return newUser;
};

userSchema.statics.login = async function ({ email, password }) {
  const user = await this.findOne(
    { email },
    { email_verified: true, password: true, firstName: true, isBlocked: true }
  );
  console.log(user);
  if (!user) throw { statusCode: 403, message: "user does'nt exist" };
  if (user && !user.email_verified)
    throw { statusCode: 403, message: "please verify your email" };
  if (user && user.isBlocked)
    throw { statusCode: 403, message: "this id has been blocked " };

  if (
    user &&
    user.email_verified &&
    !user.isBlocked &&
    compareSync(password, user?.password)
  )
    return { firstName: user.firstName, _id: user._id };
  else throw { statusCode: 403, message: "user does'nt exist or not verified" };
};

module.exports = mongoose.model("User", userSchema);
