import { createStore, applyMiddleware, combineReducers } from "redux"
import thunk from "redux-thunk"
import {
    getProductsReducer,
    getProductDetailReducer
} from "../reducers/productReducer"
import { cartReducer } from "../reducers/cartReducer";
import { userLoginReducer, userRegisterReducer,userDetailsReducer,userUpdateReducer } from "../reducers/userReducer";
import { createOrderReducer , getOrderReducer,orderPayReducer} from "../reducers/orderReducer";
import { composeWithDevTools } from 'redux-devtools-extension';

const reducers = combineReducers({
    getProducts: getProductsReducer,
    getProductDetail: getProductDetailReducer,
    cart:cartReducer,
    userLogin:userLoginReducer,
    userRegister:userRegisterReducer,
    userDetails:userDetailsReducer,
    userUpdate:userUpdateReducer,
    createOrder:createOrderReducer,
    getOrder:getOrderReducer,
    orderPay:orderPayReducer
})

const cartItemsFromLocalStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []
const userInfoFromLocalStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
const shippingAddressFromLocalStorage = localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')) : {}

const initialState = {
    cart:{
        cartItems:cartItemsFromLocalStorage,
        shippingAddress:shippingAddressFromLocalStorage
    },
    userLogin:{
        userInfo:userInfoFromLocalStorage
    },
    userRegister:{
        userInfo:userInfoFromLocalStorage
    }
}

const middleware = [thunk]

const store = createStore(reducers, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store
