const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    title: {type:String,required:true},
    description: {type:String},
    price: {type:Number,required:true},
    discountPercentage:  {type:Number, min:10,max:50},
    rating: {type:Number, min:1,max:5},
    stock: {type:Number},
    brand: {type:String},
    category: {type:String},
    thumbnail: {type:String,required:true},
    images:[String]
  })
  
exports.Product = mongoose.model("products",productSchema)