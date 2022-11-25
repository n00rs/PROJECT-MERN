const { Schema, model } = require("mongoose");

const CouponSchema = new Schema({
  couponCode: { type: String, required: true, index: { unique: true }, uppercase: true },
  maxDiscountPrice: Number,
  discountPercent: String,
  expiryDate: { type: Date, required: true, expires: 0 },
  minmumPurchaseAmount: { type: Number, required: true },
  type: { type: String, required: true },
});

CouponSchema.statics.applyOffer = async function ({ couponCode, cartTotal }) {
  if (!couponCode || !cartTotal) return null;

  const discount = await this.findOne({ couponCode }, { __v: 0, _id: 0 });

  if (!discount || cartTotal < discount.minmumPurchaseAmount) return null;

  let offerAmount;


  switch (discount.type) {
    case "isPercentOnly":
      offerAmount = (cartTotal * parseInt(discount.discountPercent)) / 100;
      // subTotal = cartTotal - offerAmount;
      break;

    case "isAmountOnly":
      offerAmount = discount.maxDiscountPrice;
      // subTotal = cartTotal - offerAmount;
      break;

    case "isConditional":
      const discPercent = cartTotal * (parseInt(discount.discountPercent) / 100);
      console.log(`discpercent ${discPercent}`);
      if (discPercent > discount.maxDiscountPrice) offerAmount = discount.maxDiscountPrice;
      if (discPercent < discount.maxDiscountPrice) offerAmount = discPercent;
      // subTotal = cartTotal - offerAmount;
      break;

    case "isUserOnly":
      console.log(`;pennding`);
      break;

    default:
      console.log(`this was not supposed to be happen`);
      break;
  }
  return { couponCode: discount.couponCode, offerAmount };
};

module.exports = model("coupons", CouponSchema);
