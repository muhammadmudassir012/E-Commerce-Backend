const express = require("express");
const { getAllCategory, addCategory, getCategoriesWithProductCount } = require("../../controllers/adminController/categoryController/categoryController");
const adminCategoryRouter = express.Router();

adminCategoryRouter.get("/getallcategory", getAllCategory);
adminCategoryRouter.post("/addcategory", addCategory);
adminCategoryRouter.get("/categorywiseproduct", getCategoriesWithProductCount);
// adminCategoryRouter.delete("/deleteuser/:id", deleteUser);

module.exports = adminCategoryRouter;
