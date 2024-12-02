const express = require("express");
const {
  addProduct,
  getAllProduct,
  deleteProduct,
  editProduct,
} = require("../../controllers/adminController/productController/productController");
const adminProductRouter = express.Router();

adminProductRouter.get("/getallproduct", getAllProduct);
adminProductRouter.post("/addproduct", addProduct);
adminProductRouter.post("/editproduct", editProduct);
adminProductRouter.delete("/deleteproduct/:id", deleteProduct);

module.exports = adminProductRouter;
