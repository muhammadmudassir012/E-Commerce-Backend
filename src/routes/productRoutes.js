const express = require("express");
const { getAllProduct } = require("../controllers/productController/productController");
const productRouter = express.Router();

productRouter.get("/getallproduct", getAllProduct);

module.exports = productRouter;
