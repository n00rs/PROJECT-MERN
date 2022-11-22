const BlogModel = require("../models/BlogModel");
const CouponModel = require("../models/CouponModel");
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

    // console.log(
    //   reqProperties.every((prop) => {
    //     // console.log(reqProperties.indexOf(prop));
    //     return addProperties.includes(prop) && req.body[prop] !== "";
    //   })
    // );

    const check = reqProperties.every(
      (prop) => addProperties.includes(prop) && req.body[prop] !== ""
    );

    console.log(check);

    if (!check) throw { statusCode: 422, message: "invalid request" };

    const newProd = new ProductModel(req.body);

    const saveProd = await newProd.save();

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

//METHOD POST
//ROUTE /api/admin/update-product

const updateProduct = async (req, res, next) => {
  try {
    console.log(req.body, req.params);

    const { prodId } = req.params;

    if (!prodId || Object.keys(req.body).length === 0)
      throw { statusCode: 404, message: "invalid request params" };

    const updateProd = await ProductModel.findByIdAndUpdate(
      prodId,
      { $set: { ...req.body, delete: false } },
      { new: true }
    );
    if (updateProd) res.status(200).json(updateProd);
    else throw new Error("something wrong in server try again later");
  } catch (e) {
    next(e);
  }
};

//METHOD POST
//ROUTE /api/admin/coupon

const addCoupon = async (req, res, next) => {
  try {
    const {
      couponCode,
      maxDiscountPrice,
      discountPercent,
      minmumPurchaseAmount,
      expiryDate,
      type,
    } = req.body;
    // const requiredField = [];

    if (!couponCode || !minmumPurchaseAmount || !expiryDate)
      if (!maxDiscountPrice && !discountPercent)
        throw { statusCode: 400, message: "please provide validDetails" };

    const types = ["isPercentOnly", "isAmountOnly", "isUserOnly", "isConditional"];

    if (!types.includes(type))
      throw {
        statusCode: 400,
        message:
          'please provide valid type  ie either ;"isPercentOnly", "isAmountOnly", "isUserOnly", "isConditional"',
      };

    const newCoupon = await CouponModel.create(req.body);
    res.status(201).json(newCoupon);
    
  } catch (err) {
    next(err);
  }
};

module.exports = {
  addProduct,
  fetchAllProducts,
  updateOutOfStock,
  updateProduct,
  addCoupon,
};
