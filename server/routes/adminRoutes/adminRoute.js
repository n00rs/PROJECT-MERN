const router = require("express").Router();

const { adminLogin } = require("../../controller/authController");

const { verifyAdmin } = require("../../middlewares/authMiddleware");

const {
  fetchAllUsers,
  userBlocking,
} = require("../../controller/adminController");

const {
  adminUserBlog,
  fetchAllBlogs,
  verifyBlog,
  deleteBlog,
} = require("../../controller/blogController");

router.post("/login", adminLogin);

router.get("/fetch-allusers", verifyAdmin, fetchAllUsers);

router.put("/block-user/:userId", verifyAdmin, userBlocking);

router.get("/user-blog/:userId", verifyAdmin, adminUserBlog);

router.get("/all-blogs", verifyAdmin, fetchAllBlogs);

router.put("/blog/:blogId", verifyAdmin, verifyBlog);

router.delete('/blog/:blogId',verifyAdmin,deleteBlog)
// router.get("/protect", verifyAdmin, (req, res) => res.json("hi from protect"));

module.exports = router;
