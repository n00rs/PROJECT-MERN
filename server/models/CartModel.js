const { Schema, Types, model } = require("mongoose");

const cartSchema = new Schema(
  {
    userId: { type: Types.ObjectId, required: true, ref: "User" },
    items: [
      {
        prodId: { type: Types.ObjectId, required: true, ref: "Product" },
        quantity: { type: Number, required: [true, "please provide quantity"] },
        size: { type: String, required: true },
      },
    ],
    total: Number,
  },
  { timestamps: true }
);
cartSchema.index({ userId: 1, unique: true });

cartSchema.statics.fetchUserCart = async function (query) {
  // cartSchemaaggregate([{$match}])
  console.log(query);
  const cart = await this.aggregate([
    { $match: query },
    { $unwind: "$items" },
    {
      $project: {
        // itemId: "$items._id",
        prodId: "$items.prodId",
        size: "$items.size",
        quantity: "$items.quantity",
        userId: 1,
      },
    },
    { $lookup: { from: "products", localField: "prodId", foreignField: "_id", as: "cartItems" } },
    {
      $project: {
        userId: 1,
        prodId: 1,
        // itemId: 1,
        quantity: 1,
        size: 1,
        products: { $arrayElemAt: ["$cartItems", 0] },
      },
    },
    {
      $group: {
        _id: "$_id",
        userId: { $first: "$userId" },
        cartItems: {
          $push: {
            // itemId: "$itemId",
            prodId: "$products._id",
            quantity: "$quantity",
            size: "$size",
            name: "$products.productName",
            price: "$products.price",
            image: { $arrayElemAt: ["$products.images", 0] },
            // itemTotal: { $sum: { $multiply: ["$quantity", "$products.price"] } },
          },
        },
        cartTotal: { $sum: { $multiply: ["$quantity", "$products.price"] } },
      },
    },
  ]);
  console.log(cart);
  return cart;
};

cartSchema.pre("findOneAndUpdate", (_id) => {
  console.log(this.items, _id(), "this");
});

module.exports = model("Cart", cartSchema);
