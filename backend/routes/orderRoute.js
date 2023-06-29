import express from 'express'
import { adminGetOrders,  adminUpdateOrders,  createOrder, getAllOrders, getOrderById, updateOrderToPaid } from '../controllers/orderController.js'
import {admin, protect} from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/').post(protect,createOrder)
router.route('/:id').get(protect,getOrderById)
router.route('/:id/pay').put( updateOrderToPaid)
router.route('/').get(protect,getAllOrders)

//Admin
//atatao admin middleware kaj korchena
router.route('/admin/orders').get(protect,admin,adminGetOrders)
router.route('/admin/orders/:id').put(protect,admin,adminUpdateOrders)

export default router
