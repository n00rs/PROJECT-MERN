const { verifyAccessToken } = require("../../middlewares/authMiddleware");

const { upload } = require("../../middlewares/multer");

const router = require("express").Router();

const {
  userLogin,
  userSignup,
  verifyEmail,
  cart,
  resendEmail,
  userLogout,
  adminLogin,
} = require("../../controller/authController");
const {
  fetchProducts,
  fetchOneProd,
  addToCart,
  fetchCart,
  fetchCartCount,
  clearCart,
  verifyCoupon,
  newOrder,
  razorpayVerify,
  paypalClientToken,
  capturePayment,
  userOrders,
} = require("../../controller/shopController");

const {
  fetchUsers,
  fetchMsgs,
  fetchUserData,
  addAddress,
} = require("../../controller/userController");
const Paypal = require("../../utils/paypal");
const { techNews, fashionNews } = require("../../utils/scrap");

router.post("/login", userLogin);

router.post("/signup", userSignup);

router.get("/verify/:token", verifyEmail);

router.patch("/verify", resendEmail);

router.delete("/logout", verifyAccessToken, userLogout);

router.get("/fetchUsers", verifyAccessToken, fetchUsers);

router.get("/fetch-messages/:to", verifyAccessToken, fetchMsgs);

router.get("/user-details", verifyAccessToken, fetchUserData);

router.post("/user-details", verifyAccessToken, addAddress);

//shop

router.get("/shop/products", fetchProducts);

router.get("/shop/each-prod/:prodId", fetchOneProd);

router.post("/shop/cart", verifyAccessToken, addToCart);

router.get("/shop/cart", verifyAccessToken, fetchCart);

router.delete("/shop/cart", verifyAccessToken, clearCart);

router.get("/shop/cart-count", verifyAccessToken, fetchCartCount);

router.get("/shop/verify-coupon/", verifyCoupon);

router.post("/shop/new-order", verifyAccessToken, newOrder);

router.post("/razorpay-verify", verifyAccessToken, razorpayVerify);

router.get("/paypal/client-token", verifyAccessToken, paypalClientToken);

router.post("/paypal/orders/:orderId/capture", verifyAccessToken, capturePayment);

router.get("/shop/orders", verifyAccessToken, userOrders);

router.get("/news", async (req, res, next) => {
  try {
    const arr = [...(await techNews()), ...(await fashionNews())];
    res.status(200).json(arr);
  } catch (err) {
    next(err);
  }
});

module.exports = router; 
