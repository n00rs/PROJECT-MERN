const { Schema, model } = require("mongoose");

const CouponSchema = new Schema({
  couponCode: { type: String, required: true, index: { unique: true } ,uppercase: true},
  maxDiscountPrice: Number,
  discountPercent: String,
  expiryDate: { type: Date, required: true, expires: 0 },
  minmumPurchaseAmount: { type: Number, required: true },
  type: { type: String, required: true },
  
});

module.exports = model("coupons", CouponSchema);
