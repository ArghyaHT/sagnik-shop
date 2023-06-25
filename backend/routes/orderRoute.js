import express from 'express'
import { createOrder, getAllOrders, getOrderById, updateOrderToPaid } from '../controllers/orderController.js'
import {protect} from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/').post(protect,createOrder)
router.route('/:id').get(protect,getOrderById)
router.route('/:id/pay').put( updateOrderToPaid)
router.route('/').get(protect,getAllOrders)

export default router
