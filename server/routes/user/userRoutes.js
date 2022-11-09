const {
  userLogin,
  userSignup,
  verifyEmail,
  cart,
  resendEmail,
  userLogout,
  adminLogin,
} = require("../../controller/authController");

const { fetchUsers, fetchMsgs } = require("../../controller/userController");

const {verifyAccessToken} = require("../../middlewares/authMiddleware");

const { upload } = require("../../middlewares/multer");

const router = require("express").Router();

router.post("/login", userLogin);

router.post("/signup", userSignup);

router.get("/verify/:token", verifyEmail);

router.patch("/verify", resendEmail);

router.delete("/logout", verifyAccessToken, userLogout);

router.get("/fetchUsers", verifyAccessToken, fetchUsers);

router.get("/fetch-messages/:to", verifyAccessToken, fetchMsgs);

//admin

router.get('/shop/products',)

module.exports = router;
