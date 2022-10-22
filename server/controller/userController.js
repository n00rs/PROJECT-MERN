const UserModel = require("../models/UserModel");





//METHOD GET
//ROUTE /api/users/fetchusers
const fetchUsers = async (req, res) => {
  try {
    console.log(req.userId);

    const userId = req.userId;

    const users = await UserModel.find({
      $and: [{ _id: { $ne: userId } }, { email_verified: true }],
    }).select(["firstName", "picture"]);
    console.log(users);
   if(users) res.status(200).json(users);

  } catch (err) {
    const statusCode = err.status ? err.status : 500;
    res.status(statusCode).json(err.message);
  }
};


module.exports={fetchUsers}