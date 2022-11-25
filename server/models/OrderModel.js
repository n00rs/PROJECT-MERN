const { Schema, Types, model } = require("mongoose");
const randomNum = Math.random().toFixed(6).slice(-6);

const orderSchema = new Schema(
  {
    userId: { type: Types.ObjectId, required: true, ref: "User" },
    reciptNo: { type: String, default: `proMERN ${randomNum}` },
    shippingAddress: {
      name: {type: String, required: true },
      phone: { type: String, required: true },
      address: { type: String, required: [true, "please provide an address"] },
      landmark: String,
    },
    products: [
      {
        prodId: { type: Types.ObjectId, required: true, ref: "Product" },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true },
        size: { type: String, required: true },
        status: { type: String, default: "order-placed" },
        name: String,
        image: String,
      },
    ],

    offer: {
      couponCode: String,
      offerAmount: Number,
    },
    paymentMethod: { type: String, required: true },

    subTotal: { type: Number, requred: true },

    total: { type: Number, default: this.subTotal },
  },
  { timestamps: true }
);

module.exports = model("Order", orderSchema);
