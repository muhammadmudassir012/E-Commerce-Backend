const Category = require("../../../models/category.model");

const addCategory = (req, res) => {
    try {
      const { categoryName } = req.body;
      console.log(categoryName);
      
      const category = new Category({categoryName});   
      if (!categoryName) {
        return res.status(400).json({ error: 'categoryName is required' });
      }   
      category.save();
      console.log(category);
      return res.status(201).json({ msg: "Category Added Successfully", category });
    } catch (error) {
      console.log(error);
  
      return res
        .status(500)
        .json({ msg: "Something went wrong", error: error.message });
    }
  };

const getAllCategory = async (req, res) => {
    try {
        const getCategory = await Category.find();
        return res.status(201).json({ msg: "Category Get Successfully", getCategory });
    } catch (error) {
      return res
        .status(500)
        .json({ msg: "Something went wrong", error: error.message });
    }
};

const getCategoriesWithProductCount = async (req, res) => {
  try {
      const categories = await Category.aggregate([
          {
              $lookup: {
                  from: "products", // The Product collection name in MongoDB
                  localField: "_id", // Category ID
                  foreignField: "productCategory", // Product's category field
                  as: "products"
              }
          },
          {
              $project: {
                  _id: 1,
                  categoryName: 1,
                  productCount: { $size: "$products" } // Count products in each category
              }
          }
      ]);

      res.status(200).json(categories); // Send categories with counts to the frontend
  } catch (error) {
      res.status(500).json({ msg: "Something went wrong", error: error.message });
  }
};


module.exports = { addCategory, getAllCategory, getCategoriesWithProductCount };