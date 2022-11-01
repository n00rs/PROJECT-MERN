const router = require("express").Router();
const verifyAccessToken = require("../../middlewares/authMiddleware");
const { upload } = require("../../middlewares/multer");
const {
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
} = require("../../controller/userController");

router.post(
  "/new-blog",
  verifyAccessToken,
  upload.single("blogImage"),
  newBlog
);

router.get("/all-blogs", allBlogs);

router.get("/my-blog", verifyAccessToken, myBlog);

router.delete("/my-blog/:blogId", verifyAccessToken, deleteBlog);

router.put("/comment", addComment);

router.delete("/comment/:commentId", verifyAccessToken, deleteComment);

router.put("/update-blog", verifyAccessToken, updateBlog); 

router.get("/search", search);

router.get("/featured-blog", fetchFeaturedBlog); 

router.get("/:blogId", fetchEachBlog);

module.exports = router;
 