import {
    GET_ALL_PRODUCTS_FAIL,
    GET_ALL_PRODUCTS_REQUEST,
    GET_ALL_PRODUCTS_SUCCESS,
    GET_PRODUCT_DETAIL_FAIL,
    GET_PRODUCT_DETAIL_REQUEST,
    GET_PRODUCT_DETAIL_SUCCESS
} from "../constants/productConstants"

export const getProductsReducer = (state = { products: [], loading: false, error: null }, action) => {
    switch (action.type) {
        case GET_ALL_PRODUCTS_REQUEST:
            return { loading: true }
        case GET_ALL_PRODUCTS_SUCCESS:
            return { loading: false, products: action.payload }
        case GET_ALL_PRODUCTS_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const getProductDetailReducer = (state = { product: {}, loading: false, error: null }, action) => {
    switch (action.type) {
        case GET_PRODUCT_DETAIL_REQUEST:
            return { loading:true }
        case GET_PRODUCT_DETAIL_SUCCESS:
            return { loading:false, product:{...action.payload}}
        case GET_PRODUCT_DETAIL_FAIL:
            return { loading:false, error:action.payload}
        default:
            return state
    }
}