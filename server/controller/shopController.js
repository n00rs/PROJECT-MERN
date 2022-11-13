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
 
const fetchOneProd = async (req, res, next) => {
  try {
    const { prodId } = req.params;
    if (!prodId) throw { statusCode: 422, message: "invalide req Params" };
    const product = await ProductModel.findById(prodId);

    if (!product) res.status(200).json(product);
    else throw { statusCode: 400, message: "mogose coundnt find" };
  } catch (err) {
    next(err);
  }
};

module.exports = { fetchProducts, fetchOneProd };
