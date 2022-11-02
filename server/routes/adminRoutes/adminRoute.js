const router = require("express").Router();

const { adminLogin } = require("../../controller/authController");

const { verifyAdmin } = require("../../middlewares/authMiddleware");

const {
  fetchAllUsers,
  userBlocking,
} = require("../../controller/adminController");
const { adminUserBlog } = require("../../controller/blogController");

router.post("/login", adminLogin);

router.get("/fetch-allusers", verifyAdmin, fetchAllUsers);  

router.put("/block-user/:userId", verifyAdmin, userBlocking);

router.get("/user-blog/:userId", verifyAdmin, adminUserBlog);

router.get("/protect", verifyAdmin, (req, res) => res.json("hi from protect"));

module.exports = router;
