const { userLogin, userSignup } = require("../controller/authController");

const router = require("express").Router();

router.get("/", (req, res) => {
  console.log("hi");
  res.send("asdf");
});

router.post("/login", userLogin);

router.post("/signup", userSignup);

module.exports = router;
