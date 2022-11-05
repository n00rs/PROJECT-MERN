const mongoose = require("mongoose");

const sizeSchema = new mongoose.Schema({
  small: { type: Number, default: 0 },
  medium: { type: Number, default: 0 },
  large: { type: Number, default: 0 },
  extraLarge: { type: Number, default: 0 },
  xxl: { type: Number, default: 0 },
  freeSize: { type: Number, default: 0 },
});

const productSchema = new mongoose.Schema(
  {
    category: { type: String, required: true },
    subcategory: { type: String, required: true },
    brand: { type: String, required: true },
    productName: { type: String, required: true },
    size: {type: sizeSchema, required: true },
    delete: { type: Boolean, default: false },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    images: { type: Array, required: true, unique: true },
    offer: { type: Boolean, default: false },
  },
  { timestamps: true }
);

productSchema.index({ category: 1, price: 1, createdAt: 1, delete: 1, offer: 1 });

// productSchema.pre("save", function (next) {
//   this.size.medium=44
//   console.log(this);
//   next();
// });

module.exports = mongoose.model("Product", productSchema);
