const { userLogin, userSignup, verifyEmail } = require("../controller/authController");

const router = require("express").Router();

router.get("/", (req, res) => {
  console.log("hi");
  res.send("asdf");
});

router.post("/login", userLogin);

router.post("/signup", userSignup);

router.get('/verify/:token',verifyEmail)

module.exports = router;
