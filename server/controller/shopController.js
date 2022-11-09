const  ProductModel = require("../models/ProductModel");


const fetchProducts = async(req,res)=>{
    try {
        const fethProds = await ProductModel.find()
    } catch (error) {
        console.log(error);
    }
}

module.exports = {fetchProducts}