import express from "express";
import { adminCreateProduct, adminDeleteProductById, adminGetAllProducts, adminUpdateProduct, createReviewProduct, getAllProducts, getSingleProduct, getTopProducts } from "../controllers/productController.js";
import { admin, protect } from "../middleware/authMiddleware.js"
const router = express.Router()

router.route("/").get(getAllProducts)
router.route("/top").get(getTopProducts)
router.route("/:id").get(getSingleProduct)
router.route("/:id/review").post(protect,createReviewProduct)

// i dont know why my middleware is not working only in adminGetAllProducts
//Admin
router.route("/").get(protect,admin,adminGetAllProducts)
router.route("/").post(protect,admin,adminCreateProduct)
router.route("/:id").put(protect,admin,adminUpdateProduct)
router.route("/:id").delete(protect,admin,adminDeleteProductById)

export default router
