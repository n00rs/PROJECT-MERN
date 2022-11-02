const UserModel = require("../models/UserModel");

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

//METHOD PUT
//ROUTE /api/admin/block-user/:id

const userBlocking = async (req, res, next) => {
  try {
    console.log(req.body);
    console.log(req.paramas);
    const { userId } = req.params;

    if (!userId)
      throw { statusCode: 422, message: "please provide valid params" };

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
  fetchAllUsers,
  userBlocking,
};
