const BlogModel = require("../models/BlogModel");
const ProductModel = require("../models/ProductModel");
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
    console.log(
      reqProperties.every((prop) => {
        // console.log(reqProperties.indexOf(prop));
        return addProperties.includes(prop) && req.body[prop] !== "";
      })
    );

    const check = reqProperties.every(
      (prop) => addProperties.includes(prop) && req.body[prop] !== ""
    );
    console.log(check);
    if (!check) throw { statusCode: 422, message: "invalid request" };

    const newProd = new ProductModel(req.body);
    const saveProd = await newProd.save();

    console.log(saveProd === newProd);
    res.status(201).json(saveProd === newProd);
  } catch (err) {
    next(err);
  }
};

//METHOD GET
//ROUTE /api/admin/products?page=

const fetchAllProducts = async (req, res, next) => {
  try {
    const pageSize = 30;
    const pageNo = req.query?.page;
    if (!pageNo) throw { statusCode: 422, message: "invalid query request" };
    // const totalDocs = req.query?.totalDocs;

    const totalDocs = await ProductModel.find().count();

    const fetchAllProducts = await ProductModel.find({}, { __v: 0 })
      .sort({
        delete: 1,
        createdAt: -1,
      })

      .limit(pageSize)
      .skip(pageNo * pageSize);

    const totalPages = Math.ceil(totalDocs / pageSize);
    res.status(200).json({ products: fetchAllProducts, totalPages, totalDocs });
  } catch (err) {
    next(err);
  }
};

//METHOD PUT
//ROUTE /api/admin/products/:prodId

const updateOutOfStock = async (req, res, next) => {
  try {
    console.log(req.params);
    const { prodId } = req.params;
    if (!prodId) throw { statusCode: 422, message: "invalid params request" };
    else {
      const markOutOfStock = await ProductModel.findByIdAndUpdate(
        prodId,
        {
          $set: { delete: true, size: {} },
        },
        { new: true, __v: false }
      );
      console.log(markOutOfStock);

      res.status(200).json(markOutOfStock);
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
};

module.exports = {
  addProduct,
  fetchAllProducts,
  updateOutOfStock,
};
