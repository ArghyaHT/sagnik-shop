import { createStore, applyMiddleware, combineReducers } from "redux"
import thunk from "redux-thunk"
import {
    getProductsReducer,
    getProductDetailReducer
} from "../reducers/productReducer"
import { cartReducer } from "../reducers/cartReducer";
import { userLoginReducer, userRegisterReducer } from "../reducers/userReducer";
import { composeWithDevTools } from 'redux-devtools-extension';

const reducers = combineReducers({
    getProducts: getProductsReducer,
    getProductDetail: getProductDetailReducer,
    cart:cartReducer,
    userLogin:userLoginReducer,
    userRegister:userRegisterReducer
})

const cartItemsFromLocalStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []
const userInfoFromLocalStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null

const initialState = {
    cart:{
        cartItems:cartItemsFromLocalStorage
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
