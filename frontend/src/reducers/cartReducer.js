import { CART_ADD_ITEM,CART_PAYMENT_METHOD,CART_REMOVE_ITEM, CART_SHIPPING_ADDRESS } from "../constants/cartConstants"

export const cartReducer = (state = { cartItems: [],shippingAddress:{},paymentMethod:{}}, action) => {
    switch (action.type) {
        case CART_ADD_ITEM:

            const item = action.payload

            const existItem = state.cartItems.find((product) => product._id === item._id)

            if(existItem){
                return {
                    ...state,
                    cartItems:state.cartItems.map((product) => product._id === existItem._id ?
                    item : product)
                }
            }else{
                return {
                    ...state,
                    cartItems:[...state.cartItems, action.payload]
                }
            }
        case CART_REMOVE_ITEM:
            return { ...state,
                cartItems:state.cartItems.filter((product) => product._id !== action.payload)
            }
        case CART_SHIPPING_ADDRESS:
            return {
                ...state,
                shippingAddress:action.payload
            }
        case CART_PAYMENT_METHOD:
            return {
                ...state,
                paymentMethod:action.payload
            }
        default:
            return state
    }
}