import { products} from "../products.js"
import asyncHandler from "express-async-handler"

const getAllProducts = asyncHandler(async(req,res) => {
    res.json(products)
})

const getProduct = asyncHandler(async(req,res) => {
    const product = products.find((product) => product._id === Number(req.params.id))
    res.json(product)
})

export {getAllProducts,getProduct}