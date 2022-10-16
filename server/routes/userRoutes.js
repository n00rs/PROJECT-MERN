const {
  userLogin,
  userSignup,
  verifyEmail,
  cart,
} = require("../controller/authController");
const verifyAccessToken = require("../middlewares/authMiddleware");

const router = require("express").Router();

router.get("/", (req, res) => {
  console.log("hi");
  res.send("asdf");
});

router.post("/login", userLogin);

router.post("/signup", userSignup);

router.get("/verify/:token", verifyEmail);

router.get("/protect", verifyAccessToken, cart);

module.exports = router;
