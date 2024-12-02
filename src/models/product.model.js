const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    productName:{
        type: String,
        required: true
    },
    productDescription: {
        type: String,
        required: true
    },
    productPrice: {
        type: String,
        require: true
    },
    productCategory: {
        type: String,
        require: true
    },
    productQuantity: {
        type: String,
        require: true
    },
    productImage: {
        type: [String],
        require: true
    }
},{timestamps : true})

const Product = new mongoose.model("Products",productSchema)

module.exports = Product
