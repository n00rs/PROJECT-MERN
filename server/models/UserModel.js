const mongoose = require("mongoose");
const { hashSync, compareSync } = require("bcryptjs");

const addressSchema = new mongoose.Schema({
  phone: { type: String, required: true },
  address: { type: String, required: [true, "please provide an address"] },
  city: { type: String, required: [true, "please provide an city"] },
  state: { type: String, required: [true, "please provide an state"] },
  pincode: { type: String, required: [true, "please provide an pincode"] },
  landmark: String,
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
  address: [addressSchema],
  isBlocked: { type: Boolean, default: false },
});

//USER SIGNUP

userSchema.statics.signup = async function (userData) {
  console.log(userData, "data");

  const existingUser = await this.findOne({ email: userData.email }); //                    //checking for user already exist better  latency

  // console.log(existingUser);

  if (existingUser) throw { statusCode: 422, message: "user Exist please login" };

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

//USER LOGIN

userSchema.statics.login = async function ({ email, password }) {
  const user = await this.findOne(
    { email },
    { email_verified: true, password: true, firstName: true, isBlocked: true }
  );
  console.log(user);
  if (!user) throw { statusCode: 403, message: "user does'nt exist" };
  if (user && !user.email_verified) throw { statusCode: 403, message: "please verify your email" };
  if (user && user.isBlocked) throw { statusCode: 403, message: "this id has been blocked " };

  if (user && user.email_verified && !user.isBlocked && compareSync(password, user?.password))
    return { firstName: user.firstName, _id: user._id };
  else throw { statusCode: 403, message: "user does'nt exist or not verified" };
};

//not used

userSchema.statics.orderAddress = async function (query) {
  const { userId, addressId } = query;
  const address = await this.aggregate([
    {
      $match: {
        _id: userId,
      },
    },
    {
      $project: {
        name: { $concat: ["$firstName", " ", "$lastName"] },
        address: {
          $filter: {
            input: "$address",
            as: "add",
            cond: { $eq: ["$$add._id", addressId] },
          },
        },
      },
    },
    {
      $project: {
        address: { $mergeObjects: [{ $arrayElemAt: ["$address", 0] }, { name: "$name" }] },
      },
    },
    {
      $project: {
        _id: 0,
        name: "$address.name",
        phone: "$address.phone",
        address: {
          $concat: [
            "$address.address",
            " , ",
            "$address.city",
            " , ",
            "$address.state",
            " - ",
            "$address.pincode",
          ],
        },
        landmark: "$address.landmark",
      },
    },
  ]);
  return address;
};

module.exports = mongoose.model("User", userSchema);
