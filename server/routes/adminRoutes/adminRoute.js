const router = require("express").Router();

const { adminLogin } = require("../../controller/authController");

const { verifyAdmin } = require("../../middlewares/authMiddleware");

const { fetchAllUsers, userBlocking } = require("../../controller/userController");

const {
  adminUserBlog,
  fetchAllBlogs,
  verifyBlog,
  deleteBlog,
} = require("../../controller/blogController");

const {
  addProduct,
  fetchAllProducts,
  updateOutOfStock,
  updateProduct,
  addCoupon,
  fetchOffers,
  paypalDetails,
  razorpayPaymentDetails,
} = require("../../controller/adminController");

//ROUTES

router.post("/login", adminLogin);

router.get("/fetch-allusers", verifyAdmin, fetchAllUsers);

router.put("/block-user/:userId", verifyAdmin, userBlocking);

router.get("/user-blog/:userId", verifyAdmin, adminUserBlog);

router.get("/all-blogs", verifyAdmin, fetchAllBlogs);

router.put("/blog/:blogId", verifyAdmin, verifyBlog);

router.delete("/blog/:blogId", verifyAdmin, deleteBlog);

router.post("/products", verifyAdmin, addProduct);

router.get("/products", verifyAdmin, fetchAllProducts);

router.put("/products/:prodId", verifyAdmin, updateOutOfStock);

router.post("/update-product/:prodId", verifyAdmin, updateProduct);

router.post("/coupon", verifyAdmin, addCoupon);

router.get("/paypal/payment-details/:paymentId", paypalDetails);

router.get("/razorpay/payment-details/:paymentId",razorpayPaymentDetails);
// router.get("/protect", verifyAdmin, (req, res) => res.json("hi from protect"));

router.get('/coupon',fetchOffers)

module.exports = router;
