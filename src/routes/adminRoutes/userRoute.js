const express = require("express");
const { getAllUsers, deleteUser } = require("../../controllers/adminController/userController/userController");
const adminUserRouter = express.Router();

adminUserRouter.get("/getallusers", getAllUsers);
adminUserRouter.delete("/deleteuser/:id", deleteUser);

module.exports = adminUserRouter;
