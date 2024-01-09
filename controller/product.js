const model = require('../models/product')
const Product = model.Product
const ejs = require('ejs')
const path = require('path')

exports.getAllproductsSSR = async(req,res)=>{
    const products = await Product.find()
    ejs.renderFile(path.resolve(__dirname, "../pages/index.ejs"), {products:products}, function(err, str){
        res.send(str)
    });

}

exports.getAllproductsADD = async(req,res)=>{
    const products = await Product.find()
    ejs.renderFile(path.resolve(__dirname, "../pages/add.ejs"), {products:products}, function(err, str){
        res.send(str)
    });

}


exports.createProduct=(req,res)=>{
    const product = new Product(req.body);
    product.save()
    res.status(201).json(product)
}

exports.getAllproducts = async (req, res) => {
    try {
        let query = Product.find();

        // Check for sorting parameters in req.query
        const sortParams = {};
        if (req.query) {
            for (const key in req.query) {
                // Validate and sanitize the sort parameters for title and price fields
                if ((key === 'title' || key === 'price') && (req.query[key] === '1' || req.query[key] === '-1')) {
                    sortParams[key] = parseInt(req.query[key]);
                }
                // Add more validations for other sortable fields if necessary
            }

            // Apply sorting if valid parameters are present
            if (Object.keys(sortParams).length > 0) {
                query = query.sort(sortParams);
            }

            // Check for limit parameter in req.query
            if (req.query.limit && !isNaN(req.query.limit)) {
                const limit = parseInt(req.query.limit);
                query = query.limit(limit);
            }
        }

        // Execute the query and send the response
        const products = await query.exec();
        res.status(200).json(products);
    } catch (error) {
        // Handle errors
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


exports.getProduct = async (req,res)=>{
    const id = req.params.id
    const product = await Product.findById(id)
    res.status(200).json(product)
}

exports.replaceProduct =async (req,res) =>{
    const id = req.params.id
    const product = await Product.findOneAndReplace({_id:id},req.body)
    res.status(201).json(product)
}

exports.updateProduct = async (req,res) =>{
    const id = req.params.id;
    const product = await Product.findOneAndUpdate({_id:id},req.body)
    res.status(201).json(product)
}

exports.deleteProduct = async (req,res)=>{
    const id = req.params.id
    const product = await Product.findOneAndDelete({_id:id},req.body)
    res.status(202).json(product) 
}