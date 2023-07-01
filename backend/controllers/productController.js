import asyncHandler from "express-async-handler"
import Product from "../Models/productModel.js"

// @desc: GET ALL PRODUCTS
// @route: GET 
// @access: public

const getAllProducts = asyncHandler(async(req,res) => {

    const productsPerPage = 4 ; //random value means how many products i want to show per page 
    const pageNumber = Number(req.query.pageNumber) || 1 //if pageNumber not present then by default page One 

    const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {};
    //count is a method 
    const count = await Product.countDocuments({...keyword})
    const products = await Product.find({...keyword}).limit(productsPerPage).skip(productsPerPage * (pageNumber - 1))
    // if we are in page one then we will get 2 products.
    //Then if we go to page 2 then which products will i show
    //for that we use skip method 
    // pages mane amr current page bad dia arkoto gulo page ache seta bolche
    if(products){
        res.json({products, pageNumber, pages: Math.ceil(count/productsPerPage)})
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

// @desc: GET ALL PRODUCTS ADMIN
// @route: GET 
// @access: Private

const adminGetAllProducts = asyncHandler(async(req,res) => {
    const products = await Product.find()

    if(products){
        res.status(201).json(products)
    }else{
        throw new Error("No products found")
    }
})


// @desc: CREATE PRODUCT ADMIN
// @route: POST 
// @access: Private

const adminCreateProduct = asyncHandler(async(req,res) => {
    const product = new Product({
        name: 'Sample name',
        price: 0,
        user: req.user._id,
        image: '/images/sample2.jpg',
        brand: 'Sample brand',
        category: 'Sample category',
        countInStock: 0,
        numReviews: 0,
        description: 'Sample description',
    })

    const createdProduct = await product.save()
    res.status(201).json(createdProduct)
})

// @desc: CREATE PRODUCT ADMIN
// @route: POST 
// @access: Private

const adminUpdateProduct = asyncHandler(async(req,res) => {

    const product = await Product.findById(req.params.id)

    if(product){
        product.name = req.body.name || product.name
        product.price = req.body.price || product.price
        product.image = req.body.image || product.image
        product.brand = req.body.brand || product.brand
        product.category = req.body.category || product.category
        product.countInStock = req.body.countInStock || product.countInStock
        product.description = req.body.description || product.description
    }

    const updateProduct = await product.save()

    if(updateProduct){
        res.status(201).json(updateProduct)
    }else{
        throw new Error("Product is not Updated")
    }
})

// @desc: DELETE PRODUCT ADMIN
// @route: DELETE
// @access: Private

const adminDeleteProductById = asyncHandler(async(req,res) => {
    const product = await Product.findById(req.params.id)

    if(product){
        await product.deleteOne({_id:product._id})
        res.status(201).json({ message: "Product successfully Deleted..."})
    }else{
        throw new Error("Failed to delete")
    }
})

// @desc: CREATE PRODUCT REVIEW
// @route: POST
// @access: Private

const createReviewProduct = asyncHandler(async(req,res) => {
    const { rating, comment } = req.body

    const product = await Product.findById(req.params.id)

    if(product){
        const alreadyReviewed = product.reviews.find((r) => r.user.toString() == req.user._id.toString())

        if(alreadyReviewed){
            throw new Error("Product is Already Reviewed")
        }

        const reviews = {
            name: req.user.name,
            rating: Number(rating),
            comment,
            user: req.user._id
        }
    
        product.reviews.push(reviews)
    
        product.numReviews = product.reviews.length
    
        product.rating = product.reviews.reduce((acc,review) => review.rating + acc, 0) / product.reviews.length
    
        await product.save()
        
        res.status(201).json({
            message:"Review Added"
        })
    }else{
        throw new Error("Product not Found")
    }


})


export {getAllProducts,getSingleProduct,adminGetAllProducts,adminCreateProduct,adminUpdateProduct,adminDeleteProductById,createReviewProduct}