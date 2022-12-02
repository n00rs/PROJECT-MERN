const { ObjectID } = require("bson");
const CartModel = require("../models/CartModel");
const CouponModel = require("../models/CouponModel");
const OrderModel = require("../models/OrderModel");
const ProductModel = require("../models/ProductModel");
const UserModel = require("../models/UserModel");
const CurrencyConverter = require("../utils/currencyConverter");
const Paypal = require("../utils/paypal");
const { createOrder, veriryPaymentSign } = require("../utils/razorpay");

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

//      const crt = await CartModel.findOneAndUpdate(
//   { userId },
//   [
//     {
//       $set: {
//         items: {
//           $cond: [
//             { $in: [ObjectID(prodId), "$items.prodId"] },
//             {
//               $map: {
//                 input: "$items",
//                 in: {
//                   $cond: [
//                     {
//                       $and: [
//                         { $eq: ["$$this.prodId", ObjectID(prodId)] },
//                         { $eq: ["$$this.size", size] },
//                       ],
//                     },
//                     {
//                       $mergeObjects: ["$$this", { quantity: { $add: ["$$this.quantity", 1] } }],
//                     },
//                     "$$this",
//                   ],
//                 },
//               },
//             },
//             { $concatArrays: ["$items", [{ prodId, size, quantity: 1 }]] },
//           ],
//         },
//       },
//     },
//   ],
//   { new: true }
// );
//
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
//
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
    const query = { userId: ObjectID(userId) };
    const cart = await CartModel.fetchUserCart(query);
    // console.log(cart);
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

//METHOD GET
//ROUTE /api/users/shop/verify-coupon?couponCode=""

const verifyCoupon = async (req, res, next) => {
  try {
    console.log(req.params);
    const { couponCode } = req.query;
    // const { couponCode } = req.params;

    if (!couponCode) throw { statusCode: 404, message: "invalid reqeust" };

    const fetchCoupon = await CouponModel.findOne({ couponCode }, { __v: 0 });

    console.log(fetchCoupon);

    if (!fetchCoupon) throw { statusCode: 404, message: "invalid coupon code please try again" };
    else res.status(200).json(fetchCoupon);
  } catch (err) {
    next(err);
  }
};

//METHOD POST
//ROUTE /api/users/shop/new-order

const newOrder = async (req, res, next) => {
  try {
    const { userId } = req,
      { cartId, addressId, couponCode, payment } = req.body;

    if (!userId || !cartId || !addressId || !payment)
      throw { statusCode: 422, message: "please provide required data" };

    const paymentOptions = ["COD", "STRIPE", "RAZORPAY", "PAYPAL", "PAYTM"];

    if (!paymentOptions.includes(payment))
      throw { statusCode: 422, message: `please select either ${paymentOptions}` };

    const query = { _id: userId, "address._id": addressId };

    const projection = { firstName: 1, "address.$": 1, _id: 0 };

    const userInfo = await UserModel.findOne(query, projection); ///// q1

    if (!userInfo?.firstName || !userInfo?.address) throw { message: "cant find orderaddress" };
    const {
      firstName,
      address: [address],
    } = userInfo;
    // console.log(firstName, address);

    const shippingAddress = {
      name: firstName,
      phone: address.phone,
      address: `${address.address} ,  ${address.city} , ${address.state} - ${address.pincode}`,
      landmark: address.landmark,
    };

    const [cart] = await CartModel.fetchUserCart({ _id: ObjectID(cartId) }); //q2
    if (!cart) throw { message: "cant find the cart" };

    const products = [...cart.cartItems];

    const offer = await CouponModel.applyOffer({ couponCode, cartTotal: cart.cartTotal }); //q3

    let total = cart.cartTotal;

    if (offer) total = total - offer.offerAmount;

    console.log(offer);

    const newOrder = await new OrderModel({
      userId,
      shippingAddress,
      products,
      offer,
      paymentMethod: payment,
      subTotal: cart.cartTotal,
      total,
    }).save();

    if (!newOrder) throw { message: "error in placing order", statusCode: 501 };

    const removeCart = await CartModel.deleteOne({ _id: ObjectID(cartId) });

    switch (payment) {
      case "COD":
        res.status(201).json({ payment, data: "success" });
        break;
      case "RAZORPAY":
        const order = await createOrder({ total, orderId: newOrder._id });
        res.status(201).json({ payment, data: order });
        break;
      case "PAYPAL":
        const currencyConverter = new CurrencyConverter("INR", "USD");
        console.log(total);
        const amountInUsd = await currencyConverter.convert(total);
        const payPalorder = await Paypal.createOrder({
          orderId: newOrder._id,
          amount: amountInUsd,
        });
        res.status(201).json({ payment, data: payPalorder });
        break;
      default:
        break;
    }
  } catch (err) {
    next(err);
  }
};

//METHOD POST
//ROUTE /api/users/razorpay-verify

const razorpayVerify = async (req, res, next) => {
  try {
    console.log(req.body, "raxoypay");
    const { razorpayOrderId, razorpayPaymentId, razorpaySignature, orderId } = req.body;
    const checkSignature = veriryPaymentSign({
      razorpayOrderId,
      razorpayPaymentId,
      razorpaySignature,
    });
    if (!checkSignature) throw { statusCode: 400, message: "failed to verify payments" };
    const updatePaymentStat = await OrderModel.updateOne(
      { _id: orderId },
      { $set: { paymentStatus: "received", paymentId: razorpayPaymentId } }
    );
    res.status(200).json({ data: "success" });
  } catch (e) {
    next(err);
  }
};

//METHOD GET
//ROUTE /api/users/paypal/client-token

const paypalClientToken = async (req, res, next) => {
  try {
    const clientID = await Paypal.generateClientToken();
    res.status(200).json({ clientID });
  } catch (err) {
    next(err);
  }
};

//METHOD POST
//ROUTE /api/users/paypal/:orderId/capture

const capturePayment = async (req, res, next) => {
  try {
    const { orderId } = req.params;
    console.log(orderId);
    const captureData = await Paypal.capturePayment(orderId);

    const transaction = captureData.purchase_units[0].payments.captures[0];
    const orderID = captureData.purchase_units[0].reference_id;
    console.log(captureData);

    console.log(transaction.status, transaction.id, orderID);

    if (transaction.status === "COMPLETED") {
      const updatePaymentStat = await OrderModel.updateOne(
        { _id: orderID },
        { $set: { paymentStatus: "received", paymentId: transaction.id } }
      );
      res.status(200).json({ data: "success" });
    } else throw new Error("failed payment");
  } catch (err) {
    next(err);
  }
};

module.exports = {
  fetchProducts,
  fetchOneProd,
  addToCart,
  fetchCartCount,
  fetchCart,
  clearCart,
  verifyCoupon,
  newOrder,
  razorpayVerify,
  paypalClientToken,
  capturePayment,
};
