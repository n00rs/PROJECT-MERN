const { ObjectID } = require("bson");
// const { } = require('mongoose')
const { mongo } = require("mongoose");
const CartModel = require("../models/CartModel");
const ProductModel = require("../models/ProductModel");

//METHOD GET
//ROUTE /api/users/shop/

const fetchProducts = async (req, res, next) => {
  try {
    const pageSize = 10;

    const PageNo = req.query.page || 0;
    let category = req.query.category;
    console.log(category, "category");

    const matchQuery = category
      ? { $match: { $and: [{ delete: false }, { category }] } }
      : { $match: { delete: false } };
    //  console.log(category, "all");

    // console.log(matchQuery, "all");

    const products = await ProductModel.aggregate([
      matchQuery,
      {
        $facet: {
          metaData: [
            { $count: "total_docs" },
            { $addFields: { totalPages: { $ceil: { $divide: ["$total_docs", pageSize] } } } },
          ],
          data: [{ $skip: PageNo * pageSize }, { $limit: pageSize }],
        },
      },
    ]);

    if (products[0]?.data?.length > 0) res.status(200).json(products[0]);
    else throw { statusCode: 404, message: "no products found" };
  } catch (err) {
    console.log(err);
    next(err);
  }
};

//METHOD GET
//ROUTE /api/users/shop/each-prod/:prodId

const fetchOneProd = async (req, res, next) => {
  try {
    const { prodId } = req.params;
    console.log(prodId);
    if (!prodId) throw { statusCode: 422, message: "invalide req Params" };

    const product = await ProductModel.findById(prodId, {
      __v: 0,
      createdAt: 0,
      updatedAt: 0,
      "size._id": 0,
    });
    console.log(product, "pro");
    if (!product) throw { statusCode: 400, message: "mogose coundnt find" };
    else res.status(200).json(product);
  } catch (err) {
    next(err);
  }
};

//METHOD POST
//ROUTE /api/users/shop/cart

const addToCart = async (req, res, next) => {
  try {
    const { userId } = req;
    const { prodId, size, quantity } = req.body;

    if (!userId || !prodId || !size)
      throw { statusCode: 422, message: "please provide required detials" };

    const cart = await CartModel.findOne({ userId: userId }); //1 query

    if (!cart) {
      const newCart = await new CartModel({
        userId,
        items: [{ prodId, quantity, size }],
      }).save();

      console.log(newCart);
      res.status(201).json(newCart);
    } else {
      //checking for cartItem exist and size is equal

      const cartItem = cart.items.find((i) => i.prodId == prodId && i.size == size);

      console.log(cartItem);

      if (!cartItem && quantity != -1) {
        //no cartItem found then updating

        const addProd = await CartModel.findOneAndUpdate(
          { userId },
          {
            $push: { items: { prodId, quantity, size } },
          },
          { new: true }
        );

        res.status(201).json(addProd);

        // console.log(cartItem.quantity, quantity);
      } else if (cartItem.quantity == 1 && quantity == -1) {
        //removing if existing quantity is 1 and the updating quantity is -1

        const removeProd = await CartModel.findOneAndUpdate(
          { userId },
          { $pull: { items: { prodId: ObjectID(prodId), size } } },
          { new: true }
        );
        res.status(200).json(removeProd);
      } else {
        const incQuantity = await CartModel.findOneAndUpdate(
          { userId, items: { $elemMatch: { prodId: ObjectID(prodId), size: size } } },
          { $inc: { "items.$.quantity": quantity } },
          { new: true }
        );
        res.status(200).json(incQuantity);
        // console.log(addProd);
      }
      // console.log(cartItem);
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
};

// const addToCart = async (req, res, next) => {
//   try {
//     const { userId } = req;

//     const { prodId, size } = req.body;

//     if (!userId || !prodId || !size)
//       throw { statusCode: 422, message: "please  provide required details" };

//     // const crt = await CartModel.findOneAndUpdate(
//     //   { userId },
//     //   [
//     //     {
//     //       $set: {
//     //         items: {
//     //           $cond: [
//     //             { $in: [ObjectID(prodId), "$items.prodId"] },
//     //             {
//     //               $map: {
//     //                 input: "$items",
//     //                 in: {
//     //                   $cond: [
//     //                     {
//     //                       $and: [
//     //                         { $eq: ["$$this.prodId", ObjectID(prodId)] },
//     //                         { $eq: ["$$this.size", size] },
//     //                       ],
//     //                     },
//     //                     {
//     //                       $mergeObjects: ["$$this", { quantity: { $add: ["$$this.quantity", 1] } }],
//     //                     },
//     //                     "$$this",
//     //                   ],
//     //                 },
//     //               },
//     //             },
//     //             { $concatArrays: ["$items", [{ prodId, size, quantity: 1 }]] },
//     //           ],
//     //         },
//     //       },
//     //     },
//     //   ],
//     //   { new: true }
//     // );

//     const crt = await CartModel.findOneAndUpdate({ userId }, [
//       {
//         $set: {
//           items: {
//             $map: {
//               input: "$items",
//               in: {
//                 $cond: [
//                   {
//                     $and: [
//                       { $eq: ["$$this.prodId", ObjectID(prodId)] },
//                       { $eq: ["$$this.size", size] },
//                     ],
//                   },
//                   { $mergeObjects: ["$$this", { quantity: { $add: ["$$this.quantity", 1] } }] },
//                   {
//                     $concatArrays: ["$items", [{ prodId, size, quantity: 1 }]],
//                   },
//                 ],
//               },
//             },
//           },
//         },
//       },
//     ]);
//     if (!crt) {
//       const newCart = await new CartModel({
//         userId,
//         items: [{ prodId, quantity: 1, size }],
//       }).save();

//       console.log(newCart);
//       res.status(201).json(newCart);
//     }
//     res.status(200).json(crt);
//   } catch (err) {
//     console.log(err);
//     next(err);
//   }
// };

//METHOD GET
//ROUTE /api/users/shop/cart-count

const fetchCartCount = async (req, res, next) => {
  try {
    const { userId } = req;
    if (!userId) throw { statusCode: 403, message: "no access " };

    console.log(userId);

    const count = await CartModel.aggregate([
      { $match: { userId: ObjectID(userId) } },
      { $project: { count: { $size: "$items" } } },
    ]);
    console.log(count);
    if (count) res.status(200).json(count);
  } catch (err) {
    next(err);
  }
};

//METHOD GET
//ROUTE /api/users/shop/fetch-cart

const fetchCart = async (req, res, next) => {
  try {
    const { userId } = req;
    const cart = await CartModel.fetchUserCart({ userId: ObjectID(userId) });

    console.log(cart);
    if (cart) res.status(200).json(cart);
  } catch (err) {
    next(err);
  }
};

//METHOD DELETE
//ROUTE /api/users/shop/cart

const clearCart = async (req, res, next) => {
  try {
    const { userId } = req;

    const removeCart = await CartModel.deleteOne({ userId: ObjectID(userId) });

    console.log(removeCart);

    res.status(200).json(removeCart);


    
  } catch (err) {
    next(err);
  }
};

module.exports = { fetchProducts, fetchOneProd, addToCart, fetchCartCount, fetchCart, clearCart };
