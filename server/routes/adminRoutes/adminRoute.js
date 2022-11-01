const router = require("express").Router();

const { adminLogin } = require("../../controller/authController");

const {} = require("../../controller/adminController");
const { verifyAdmin } = require("../../middlewares/authMiddleware");

router.post("/login", adminLogin);

router.get("/protect", verifyAdmin, (req, res) => res.json("hi from protect"));

module.exports = router;
