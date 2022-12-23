const BlogModel = require("../models/BlogModel");





//METHOD GET
//ROUTE /api/admin/user-blog/:userId

const adminUserBlog = async (req, res, next) => {
  try {
    const { userId } = req.params;
    if (!userId) throw { statusCode: 422, message: "please provide valid paramd" };

    const userBlog = await BlogModel.find({ userId }, { __v: 0 }).sort({
      createdAt: -1,
    });
    if (!userBlog) throw { statusCode: 404, message: "not found" };
    else res.status(200).json(userBlog);
  } catch (err) {
    next(err);
  }
};

//METHOD GET
//ROUTE /api/users/blog/my-blog

const myBlog = async (req, res, next) => {
  try {
    if (!req.userId) throw { statusCode: 403, message: "no authorization" };
    const userId = req.userId;
    const blogs = await BlogModel.find({ userId }).sort({ createdAt: -1 });
    if (!blogs) throw { statusCode: 404, message: "not found" };
    else res.status(200).json(blogs);
  } catch (err) {
    next(err);
  }
};

//METHOD POST
//ROUTE /api/users/blog/new-blog

const newBlog = async (req, res, next) => {
  try {
    // console.log(req.file.filename);
    const userId = req?.userId;
    const url = req.protocol + "://" + req.get("host");
    const image = url + "/blog_images/" + req.file.filename;
    const { author, title, content, category } = req?.body;
    console.log(req.body, req.userId);

    if (!userId || !author || !title || !content || !category)
      throw { statusCode: 400, message: "invalid request" };

    const blogObj = { author, title, content, category, image, userId };

    const blog = await BlogModel.create(blogObj);

    console.log(blog);

    res.status(201).json({ created: true });
  } catch (err) {
    next(err);
  }
};

//METHOD GET
//ROUTE /api/users/blog/all-blogs?pages=

const allBlogs = async (req, res, next) => {
  try {
    const pageSize = 6;

    const pageNumber = req.query.page;
    if (!pageNumber) throw { statusCode: 400, message: "please provide an page number" };

    const totalDocs = await BlogModel.aggregate([
      { $match: { verified: true } },
      { $count: "total_docs" },
    ]);


    const blogs = await BlogModel.find({ verified: true })
      .limit(pageSize)
      .skip(pageNumber * pageSize);

    // console.log(blogs);

    const totalPages = Math.ceil(totalDocs[0]?.total_docs / pageSize);
    res.status(200).json({ blogs, totalPages });
  } catch (err) {
    next(err);
  }
};

//METHOD  DELETE
//ROUTE /api/users/blog/my-blog/:blogId

const deleteBlog = async (req, res, next) => {
  try {
    const { blogId } = req.params;

    if (!blogId) throw { statusCode: 422, message: "please provide an blogId" };

    const { deletedCount } = await BlogModel.deleteOne({ _id: blogId });

    console.log(deletedCount);
    if (deletedCount === 1) res.status(200).json({ removed: "removed" });
    else throw { statusCode: 500, message: "data base betrayed" };
  } catch (error) {
    next(err);
  }
};

//METHOD PUT
//ROUTE /api/users/blog/add-comment

const addComment = async (req, res, next) => {
  try {
    console.log(req.body);
    const { blogId, name, comment } = req.body;

    if ((!blogId, !name, !comment)) throw { statusCode: 400, message: "invalid data" };

    const addComments = await BlogModel.findByIdAndUpdate(
      blogId,
      {
        $push: { comments: { name, comment } },
      },
      { new: true }
    ).select("comments -_id");

    console.log(addComments, "afteradding comment");

    res.status(200).json(addComments);
  } catch (err) {
    next(err);
  }
};

//METHOD DELETE
//ROUTE /api/users/blog/delete-comment

const deleteComment = async (req, res, next) => {
  try {
    console.log(req.params);
    const commentId = req?.params?.commentId;
    if (!commentId) throw { statusCode: 403, message: "invalid request" };

    const deleteComm = await BlogModel.findOneAndUpdate(
      { "comments._id": commentId },
      { $pull: { comments: { _id: commentId } } },
      { new: true }
    );

    console.log(deleteComm);
    res.status(200).json(deleteComm);
  } catch (err) {
    next(err);
  }
};

//METHOD PUT
//ROUTE /api/users/blog/update-blog

const updateBlog = async (req, res, next) => {
  try {
    console.log(req.body);
    const { content, title, blogId } = req.body;
    if (!content || !title || !blogId) throw { statusCode: 400, message: "invalid update request" };
    const updateBlg = await BlogModel.findByIdAndUpdate(
      blogId,
      { $set: { content, title } },
      { new: true }
    );

    res.status(200).json(updateBlg);
  } catch (err) {
    next(err);
  }
};

//METHOD GET
//ROUTE /api/users/blog/search?text=

const search = async (req, res, next) => {
  try {
    const { text } = req.query;
    if (!text) throw { statusCode: 400, message: "invalid search data" };

    // console.log(text);
    const searchDocs = await BlogModel.find({ $text: { $search: text } }).sort({
      score: { $meta: "textScore" },
    });

    res.status(200).json(searchDocs);
  } catch (err) {
    next(err);
  }
};

//METHOD GET
//ROUTE /api/users/blog/:blogId

const fetchEachBlog = async (req, res, next) => {
  try {
    // const blogID = req.params.blogId
    const { blogId } = req.params;

    if (!blogId) throw { statusCode: 404, message: "please provide an id" };

    const blog = await BlogModel.findById(blogId).select("-__v -userId -verified");

    res.status(200).json(blog);
  } catch (err) {
    next(err);
  }
};

async function featuredBlog (){

} 

//METHOD GET
//ROUTE /api/users/blog/featured-blog

const fetchFeaturedBlog = async (req, res, next) => {
  try {
    const featuredBlog = await BlogModel.aggregate([
      {
        $project: {
          title: 1,
          author: 1,
          createdAt: 1,
          content: 1,
          commentsCount: { $size: "$comments" },
        },
      },
      { $sort: { commentsCount: -1 } },
      { $limit: 1 },
    ]);
    if (featuredBlog.length > 0) res.status(200).json(featuredBlog[0]);
    else throw new Error("opps. somethings wrong in moongoose");
  } catch (err) {
    next(err);
  }
};

//METHOD GET
//ROUTE /api/admin/all-blogs

const fetchAllBlogs = async (req, res, next) => {
  try {
    const allBlogs = await BlogModel.find({}, { userId: 0, __v: 0, updatedAt: 0 });
    res.status(200).json(allBlogs);
  } catch (err) {
    next(err);
  }
};

//METHOD PUT
//ROUTE /api/admin/verify-blog/:blogId

const verifyBlog = async (req, res) => {
  try {
    const { blogId } = req.params;
    if (!blogId) throw { statusCode: 422, message: "invalid params" };
    else {
      const verifyBlog = await BlogModel.findByIdAndUpdate(
        blogId,
        {
          $set: { verified: true },
        },
        { new: true }
      ).select("-userId -__v -updatedAt");
      res.status(200).json(verifyBlog);
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  newBlog,
  allBlogs,
  myBlog,
  deleteBlog,
  addComment,
  deleteComment,
  updateBlog,
  search,
  fetchEachBlog,
  fetchFeaturedBlog,
  adminUserBlog,
  fetchAllBlogs,
  verifyBlog,
};
