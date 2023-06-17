import { createStore, applyMiddleware, combineReducers } from "redux"
import thunk from "redux-thunk"
import {
    getProductsReducer,
    getProductDetailReducer
} from "../reducers/productReducer"
import { cartReducer } from "../reducers/cartReducer";
import { composeWithDevTools } from 'redux-devtools-extension';

const reducers = combineReducers({
    getProducts: getProductsReducer,
    getProductDetail: getProductDetailReducer,
    cart:cartReducer
})

const cartItemsFromLocalStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []

const initialState = {
    cart:{
        cartItems:cartItemsFromLocalStorage
    }
}

const middleware = [thunk]

const store = createStore(reducers, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store
