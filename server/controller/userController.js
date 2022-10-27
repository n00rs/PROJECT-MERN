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

//METHOD POST
//ROUTE /api/users/new-blog

const newBlog = async (req, res) => {
  try {
    // console.log(req.file.filename);
    const userId = req?.userId;
    const url = req.protocol + "://" + req.get("host");
    const image = url + "/blog_images/" + req.file.filename;
    const { author, title, content, category } = req?.body;
    console.log(req.body, req.userId);

    if (!userId || !author || !title || !content || !category)
      throw { status: 400, message: "invalid request" };

    const blogObj = { author, title, content, category, image, userId };

    const blog = await BlogModel.create(blogObj);

    console.log(blog);

    res.status(201).json({ created: true });
  } catch (err) {
    console.log(err.message);
    const statusCode = err?.status ? err?.status : 500;
    res.status(statusCode).json(err.message);
  }
};

//METHOD GET
//ROUTE /api/users/all-blogs?pages=

const allBlogs = async (req, res) => {
  try {
    const pageSize = 6;

    const pageNumber = req.query.page;
    if (!pageNumber)
      throw { status: 400, message: "please provide an page number" };

    const totalDocs = await BlogModel.aggregate([
      { $match: { verified: true } },
      { $count: "total_docs" },
    ]);

    console.log(totalDocs);

    const blogs = await BlogModel.find({ verified: true })
      .limit(pageSize)
      .skip(pageNumber * pageSize);

    // console.log(blogs);

    const totalPages = Math.ceil(totalDocs[0]?.total_docs / pageSize);
    res.status(200).json({ blogs, totalPages });
  } catch (err) {
    const statusCode = err.status ? err.status : 500;
    res.status(statusCode).json(err.message);
  }
};

//METHOD GET
//ROUTE /api/users/my-blog

const myBlog = async (req, res) => {
  try {
    if (!req.userId) throw { statusCode: 403, message: "no authorization" };
    const userId = req.userId;
    const blogs = await BlogModel.find({ userId }).sort({ createdAt: -1 });
    if (!blogs) throw { statusCode: 404, message: "not found" };
    else res.status(200).json(blogs);
  } catch (err) {
    const statusCode = err.statusCode ? err.statusCode : 500;
    res.status(statusCode).json(err.message);
  }
};

//METHOD  DELETE
//ROUTE /api/users/my-blog/:blogId

const deleteBlog = async (req, res) => {
  try {
    const { blogId } = req.params;

    if (!blogId) throw { statusCode: 400, message: "please provide an blogId" };
    const { deleteBlog } = await BlogModel.deleteOne({ _id: blogId });
    console.log(deleteBlog);
    res.status(200).json({ removed: "removed" });
  } catch (error) {
    const statusCode = err.statusCode ? err.statusCode : 500;
    res.status(statusCode).json(err.message);
  }
};


//METHOD PUT
//ROUTE /api/users/blog/add-comment

const addComment = async (req, res) => {
  try {
    console.log(req.body);
    const { blogId, name, comment } = req.body;
    
    
    if ((!blogId, !name, !comment))
      throw { statusCode: 400, message: "invalid data" };

    const addComments = await BlogModel.findByIdAndUpdate(blogId, {
      $push: { comments: { name, comment } },
    },{new:true}).select('comments -_id');

    console.log(addComments,'afteradding comment');
    
    res.status(200).json(addComments);
  } catch (err) {
    const statusCode = err.statusCode ? err.statusCode : 500;
    res.status(statusCode).json(err.message);
    console.log(err.message);
  }
};

module.exports = {
  fetchUsers,
  fetchMsgs,
  newBlog,
  allBlogs,
  myBlog,
  deleteBlog,
  addComment,
};
