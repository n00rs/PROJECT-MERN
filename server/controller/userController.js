const BlogModel = require("../models/BlogModel");
const MessageModel = require("../models/MessageModel");
const UserModel = require("../models/UserModel");

//METHOD GET
//ROUTE /api/users/fetchusers

const fetchUsers = async (req, res, next) => {
  try {
    const userId = req.userId;

    const users = await UserModel.find({
      $and: [{ _id: { $ne: userId } }, { email_verified: true }],
    }).select(["firstName", "picture"]);
    // console.log(users);
    if (users) res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};

//METHOD GET
//ROUTE /api/admin/fetch-allusers

const fetchAllUsers = async (req, res, next) => {
  try {
    const users = await UserModel.find({}, { password: 0, __v: 0 });
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};

//METHOD POST
//ROUTE /api/users/fetch-messages/:to

const fetchMsgs = async (req, res, next) => {
  try {
    console.log(req.userId, req.params.to);

    const from = req?.userId,
      to = req?.params?.to;

    if (!from || !to) throw { statusCode: 400, message: "please provide chat details" };

    const messages = await MessageModel.find({
      users: { $all: [from, to] },
    }).sort({ updatedAt: 1 });

    // console.log(messages);
    const projectMsg = messages.map((msg) => {
      return {
        fromSelf: msg.sender.toString() === from,
        message: msg.message.text,
      };
    });
    console.log(projectMsg);

    res.status(200).json(projectMsg);
  } catch (err) {
    next(err);
  }
};

//METHOD PUT
//ROUTE /api/admin/block-user/:id

const userBlocking = async (req, res, next) => {
  try {
    console.log(req.body);
    console.log(req.paramas);
    const { userId } = req.params;

    if (!userId) throw { statusCode: 422, message: "please provide valid params" };

    const updateStatus = await UserModel.findByIdAndUpdate(
      userId,
      [{ $set: { isBlocked: { $not: "$isBlocked" } } }],
      { new: true, isBlocked: true }
    );

    if (updateStatus) res.status(200).json(updateStatus);
    else throw { statusCode: 500, message: "oops some wrong in mongo" };
  } catch (err) {
    next(err);
  }
};
module.exports = {
  fetchUsers,
  fetchMsgs,
  userBlocking,
  fetchAllUsers
};
