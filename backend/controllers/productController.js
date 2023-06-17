import asyncHandler from "express-async-handler"
import Product from "../Models/productModel.js"

// @desc: GET ALL PRODUCTS
// @route: GET 
// @access: public

const getAllProducts = asyncHandler(async(req,res) => {
    const products = await Product.find({})
    if(products){
        res.json(products)
    }else{
        throw new Error("No Products Available")
    }
    
})

// @desc: GET SINGLE PRODUCT
// @route: GET 
// @access: public

const getSingleProduct = asyncHandler(async(req,res) => {
    const productID = req.params.id
    const product = await Product.findById(productID)

    if(product){
        res.json(product)
    }else{
        res.status(404)
        throw new Error("Product is not Available")
    }
})

export {getAllProducts,getSingleProduct}