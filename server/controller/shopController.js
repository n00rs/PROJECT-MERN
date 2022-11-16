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

    console.log(matchQuery, "all");

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
    else res.status(200).json("no products found");
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

    const product = await ProductModel.findById(prodId);

    if (product) throw { statusCode: 400, message: "mogose coundnt find" };
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
    const { prodId, size } = req.body;
    if (!userId || !prodId || !size)
      throw { statusCode: 422, message: "please provide required detials" };

    const cart = await CartModel.findOne({ userId: userId });
    if (!cart) {
      const newCart = await new CartModel({
        userId,
        items: [{ prodId, quantity: 1, size }],
      }).save();

      console.log(newCart);
      res.status(201).json(newCart);
    } else {
      const prodExist = cart.items.findIndex((i) => i.prodId == prodId && i.size == size);
      if (prodExist != -1) {
        const incQuantity = await CartModel.findOneAndUpdate(
          { userId, items: { $elemMatch: { prodId: ObjectID(prodId), size: size } } },
          { $inc: { "items.$.quantity": 1 } },
          { new: true }
        );
        res.status(200).json(incQuantity);
      } else {
        const addProd = await CartModel.findOneAndUpdate(
          { userId },
          {
            $push: { items: { prodId, quantity: 1, size } },
          },
          { new: true }
        );

        res.status(201).json(addProd);

        console.log(addProd);
      }
      console.log(prodExist);
    }

    // const updataCart =  await
  } catch (err) {
    console.log(err);
    next(err);
  }
};

module.exports = { fetchProducts, fetchOneProd, addToCart };
