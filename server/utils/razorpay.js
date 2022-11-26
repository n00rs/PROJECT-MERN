const Razorpay = require("razorpay");
const { RAZORPAY_SECRET, RAZORPAY_KEY_ID } = process.env;
const { createHmac } = require("crypto");

const createOrder = async ({ total, orderId }) => {
  // console.log(orderId);

  const instance = new Razorpay({ key_id: RAZORPAY_KEY_ID, key_secret: RAZORPAY_SECRET });
  const options = {
    amount: total * 100, 
    currency: "INR",
    receipt: orderId.toString(),
  };
  const order = await instance.orders.create(options);
  // res.status(200).json(order); 
  if (!order) throw { message: "error in creating order razorpay" };
  return order;
};

const veriryPaymentSign = async ({ razorpayOrderId, razorpayPaymentId, razorpaySignature }) => {
  const expectedSignature = createHmac("sha256", RAZORPAY_SECRET)
    .update(`${razorpayOrderId}|${razorpayPaymentId}`)
    .digest("hex");

  console.log(`expected sign ${expectedSignature}   razorpaySignature ${razorpaySignature}`);

  return expectedSignature === razorpaySignature;
};

module.exports = { createOrder, veriryPaymentSign };
 