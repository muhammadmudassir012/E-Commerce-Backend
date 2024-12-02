const Product = require("../../../models/product.model");

const addProduct = (req, res) => {
  try {
    const {
      productName,
      productDescription,
      productPrice,
      productCategory,
      productQuantity,
      productImage,
    } = req.body;
    const product = new Product({
      productName,
      productDescription,
      productPrice,
      productCategory,
      productQuantity,
      productImage,
    });
    if (
      !productName ||
      !productDescription ||
      !productPrice ||
      !productCategory ||
      !productQuantity ||
      !productImage
    ) {
      return res.status(400).json({ msg: "All fields are required" });
    }
    product.save();
    console.log(product);
    return res.status(201).json({ msg: "Product Added Successfully", product });
  } catch (error) {
    console.log(error);

    return res
      .status(500)
      .json({ msg: "Something went wrong", error: error.message });
  }
};

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

const editProduct = async (req,res) => {
  try {
    const updateData = {
      productName: req.body.product.name,
      productDescription: req.body.product.description,
      productPrice: req.body.product.price,
      productCategory: req.body.product.category,
      productQuantity: req.body.product.quantity,
    };
    const editProduct = await Product.findOneAndUpdate(
      { _id: req.body.editable_id },
      updateData,
      { new: true } // Return the updated document
    );
      // console.log(req.body.editable_id);
      console.log(req.body.product);

    if (!editProduct) {
      return res.status(404).json({ msg: "Product not found" });
    }

    return res.status(201).json({ msg: "Product edited", editProduct });
  } catch (error) {
    return res.status(500).json({ msg: "Something went wrong", error: error.message });
  }
}

const deleteProduct = async (req, res) => {
  try {
    const {id} = req.params;
    const deleteProduct = await Product.findByIdAndDelete(id);
    if (!deleteProduct) {
      return res.status(404).json({ msg: "Product not found" });
    }
    return res.status(201).json({ msg: "Product Deleted", deleteProduct });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Something went wrong", error: error.message });
  }
};

module.exports = { addProduct, getAllProduct, deleteProduct, editProduct };
