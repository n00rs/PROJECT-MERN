const {
  userLogin,
  userSignup,
  verifyEmail,
  cart,
  resendEmail,
  userLogout,
  adminLogin,
} = require("../controller/authController");

const { fetchUsers, fetchMsgs } = require("../controller/userController");

const verifyAccessToken = require("../middlewares/authMiddleware");

const router = require("express").Router();

router.get("/", (req, res) => {
  console.log("hi");
  res.send("asdf");
});

router.post("/login", userLogin);

router.post("/signup", userSignup);

router.get("/verify/:token", verifyEmail);

router.patch("/verify", resendEmail);

router.get("/protect", verifyAccessToken, cart);

router.delete("/logout", verifyAccessToken, userLogout);

router.get("/fetchUsers", verifyAccessToken, fetchUsers);

router.get('/fetch-messages/:to',verifyAccessToken,fetchMsgs)

//admin

router.post("/adminlogin", adminLogin);

module.exports = router;
