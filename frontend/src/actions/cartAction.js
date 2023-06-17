import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../constants/cartConstants"
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