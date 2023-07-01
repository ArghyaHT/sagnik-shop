import Order from '../Models/OrderModel.js'
import asyncHandler from 'express-async-handler'

// @desc: POST CREATE ORDER
// @route: POST
// @access: PRIVATE

const createOrder = asyncHandler(async (req, res) => {
   const {
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    } = req.body
  
    if (orderItems && orderItems.length === 0) {
      res.status(400)
      throw new Error('No order items')
    } else {
      const order = new Order({
        orderItems,
        user: req.user._id,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
      })
  
      const createdOrder = await order.save()
  
      if(createdOrder){
         res.status(201).json(createdOrder)
      }else{
         throw new Error("Order Failed")
      }
    }
 });
 
// @desc: GET ORDER BY ID
// @route: GET
// @access: PRIVATE


const getOrderById = asyncHandler(async(req,res) => {
    const order = await Order.findById(req.params.id).populate('user', 'name email')

    if(order){
        res.json(order)
    }else{
      throw new Error("No order found")
    }
})

// @desc: UPDATE ORDER TO PAID
// @route: POST
// @access: PRIVATE

const updateOrderToPaid = asyncHandler(async(req,res) => {
  const order = await Order.findById(req.params.id)

  if(order){
    order.isPaid = true;
    order.paidAt = Date.now()
    order.paymentResult.id = req.body.paymentResult.id;
    order.paymentResult.status = req.body.paymentResult.status;
    order.paymentResult.update_time = req.body.paymentResult.update_time;
    order.paymentResult.email_address = req.body.paymentResult.email_address;

    const updatedOrder = await order.save()

    res.json(updatedOrder)
  }else{
    res.status(404)
    throw new Error("Order not Found")
  }
})

// @desc: GET ALL ORDERS
// @route: GET
// @access: PRIVATE

const getAllOrders = asyncHandler(async(req,res) => {
   const orders = await Order.find({user: req.user._id})
   if(orders){
    res.status(201).json(orders)
   }else{
    throw new Error("No Orders has been made")
   }
})


// @desc: GET ALL ORDERS BY ADMIN
// @route: GET
// @access: PRIVATE

const adminGetOrders = asyncHandler(async(req,res) => {
  const orders = await Order.find({}).populate('user', 'id name')

  if(orders){
    res.status(201).json(orders)
  }else{
    throw new Error("No Orders found")
  }
})

// @desc: UPDATE ORDER TO DELIVER BY ADMIN
// @route: PUT
// @access: PRIVATE

const adminUpdateOrders = asyncHandler(async(req,res) => {
  const order = await Order.findById(req.params.id)

  if(order){
    order.isDelivered = true,
    order.deliveredAt = Date.now()
    
    const updatedOrder = await order.save()

    res.status(201).json(updatedOrder)
  }else{
    throw new Error("Failed to Deliverd")
  }
})

export {createOrder,getOrderById,updateOrderToPaid,getAllOrders,adminGetOrders,adminUpdateOrders}