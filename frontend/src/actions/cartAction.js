import { CART_ADD_ITEM, CART_PAYMENT_METHOD, CART_REMOVE_ITEM, CART_SHIPPING_ADDRESS } from "../constants/cartConstants"
import axios from "axios"

export const addToCart = (qty,id) => async(dispatch,getState) => {
        const {data} = await axios.get(`http://localhost:3000/api/product/${id}`)

        dispatch({
            type: CART_ADD_ITEM,
            payload: {
              _id: data._id,
              name: data.name,
              image: data.image,
              price: data.price,
              countInStock: data.countInStock,
              qty,
            },
          })
        
          localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const removeToCart = (id) => async(dispatch,getState) => {
    dispatch({
        type: CART_REMOVE_ITEM,
        payload: id,
      })
    
      localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const shippingToCart = (address) => async(dispatch,getState) => {
   dispatch({
    type:CART_SHIPPING_ADDRESS,
    payload:address
   })

   localStorage.setItem('shippingAddress', JSON.stringify(getState().cart.shippingAddress))
}

export const paymentMethodToCart = (payment) => async(dispatch) => {
  dispatch({
    type:CART_PAYMENT_METHOD,
    payload:payment
  })
}