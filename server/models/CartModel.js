const { Schema, Types, model } = require("mongoose");

const cartSchema = new Schema(
  {
    userId: { type: Types.ObjectId, required: true, ref: "User" },
    items: [
      {
        prodId: { type: Types.ObjectId, required: true, ref: "Product" },
        quantity: { type: Number, required: [true, "please provide quantity"] },
        size: { type: String, required: true },
        _id:false
      },
    ],
    total: Number,
  },
  { timestamps: true }
);
cartSchema.index({ userId: 1 });
cartSchema.pre("updateOne", () => {
  console.log(this.items,'this');
});

module.exports = model("Cart", cartSchema);
