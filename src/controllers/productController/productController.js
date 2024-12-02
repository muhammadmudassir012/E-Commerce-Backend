const Product = require("../../models/product.model");

const getAllProduct = async (req, res) => {
    try {
      const getData = await Product.find();
      return res.status(201).json({ msg: "Product Get Successfully", getData });
    } catch (error) {
      return res
        .status(500)
        .json({ msg: "Something went wrong", error: error.message });
    }
};

module.exports = { getAllProduct };