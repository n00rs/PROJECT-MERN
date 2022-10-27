const {
  userLogin,
  userSignup,
  verifyEmail,
  cart,
  resendEmail,
  userLogout,
  adminLogin,
} = require("../controller/authController");

const {
  fetchUsers,
  fetchMsgs,
  newBlog,
  allBlogs,
  myBlog,
  deleteBlog,
  addComment,
} = require("../controller/userController");

const verifyAccessToken = require("../middlewares/authMiddleware");

const { upload } = require("../middlewares/multer");

const router = require("express").Router();

router.post("/login", userLogin);

router.post("/signup", userSignup);

router.get("/verify/:token", verifyEmail);

router.patch("/verify", resendEmail);

router.get("/protect", verifyAccessToken, cart);

router.delete("/logout", verifyAccessToken, userLogout);

router.get("/fetchUsers", verifyAccessToken, fetchUsers);

router.get("/fetch-messages/:to", verifyAccessToken, fetchMsgs);

router.post(
  "/new-blog",
  verifyAccessToken,
  upload.single("blogImage"),
  newBlog
);

router.get("/all-blogs", allBlogs);

router.get("/my-blog", verifyAccessToken, myBlog);

router.delete("/my-blog/:blogId", verifyAccessToken, deleteBlog);

router.put("/blog/add-comment", addComment);
//admin

router.post("/adminlogin", adminLogin);

module.exports = router;
