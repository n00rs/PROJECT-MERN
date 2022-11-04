const UserModel = require("../models/UserModel");

//METHOD POST
//ROUTE /api/admin/product

const addProduct = async (req, res, next) => {
  try {
    const addProperties = Object.keys(req.body);

    const reqProperties = [
      "category",
      "subcategory",
      "brand",
      "productName",
      "size",
      "price",
      "description",
      "images",
    ];
    const check = addProperties.every(
      (prop) => reqProperties.includes(prop) && req.body[prop] !== ""
    );

    if (!check) throw { statusCode: 422, message: "invalid request" };
const newProduct = await ProductModel
    res.status(201).json(req.body);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  addProduct,
};
