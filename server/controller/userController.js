const BlogModel = require("../models/BlogModel");
const MessageModel = require("../models/MessageModel");
const UserModel = require("../models/UserModel");

//METHOD GET
//ROUTE /api/users/fetchusers
const fetchUsers = async (req, res) => {
  try {
    // console.log(req.userId);

    const userId = req.userId;

    const users = await UserModel.find({
      $and: [{ _id: { $ne: userId } }, { email_verified: true }],
    }).select(["firstName", "picture"]);
    // console.log(users);
    if (users) res.status(200).json(users);
  } catch (err) {
    const statusCode = err.status ? err.status : 500;
    res.status(statusCode).json(err.message);
  }
};

//METHOD POST
//ROUTE /api/users/fetch-messages/:to

const fetchMsgs = async (req, res) => {
  try {
    console.log(req.userId, req.params.to);

    const from = req?.userId,
      to = req?.params?.to;

    if (!from || !to)
      throw { status: 400, message: "please provide chat details" };

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
    const statusCode = err.status ? err.status : 500;

    res.status(statusCode).json(err.message);
  }
};

const newBlog = async (req, res) => {
  try {
    // console.log(req.file.filename);
    const userId = req?.userId;
    const url = req.protocol + "://" + req.get("host");
    const image = url + "/blog_images/" + req.file.filename;
    const { author, title, content, category } = req?.body;
 console.log(req.body,req.userId) ;
    if (!userId || !author || !title || !content || !category)
      throw { status: 400, message: "invalid request" };
 
      const blogObj = { author, title, content, category, image, userId };

    const blog = await BlogModel.create(blogObj);
    console.log(blog);
    res.status(201).json({ created: true });


  } catch (err) {
    
    console.log(err.message);
    const statusCode = err?.status ? err?.status : 500
    res.status(statusCode).json(err.message)  
  }
};

module.exports = { fetchUsers, fetchMsgs, newBlog };
