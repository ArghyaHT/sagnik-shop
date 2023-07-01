import {
    ADMIN_CREATE_PRODUCT_FAIL,
    ADMIN_CREATE_PRODUCT_REQUEST,
    ADMIN_CREATE_PRODUCT_RESET,
    ADMIN_CREATE_PRODUCT_SUCCESS,
    ADMIN_DELETE_PRODUCT_FAIL,
    ADMIN_DELETE_PRODUCT_REQUEST,
    ADMIN_DELETE_PRODUCT_SUCCESS,
    ADMIN_EDIT_PRODUCT_FAIL,
    ADMIN_EDIT_PRODUCT_REQUEST,
    ADMIN_EDIT_PRODUCT_RESET,
    ADMIN_EDIT_PRODUCT_SUCCESS,
    CREATE_PRODUCT_REVIEW_FAIL,
    CREATE_PRODUCT_REVIEW_REQUEST,
    CREATE_PRODUCT_REVIEW_RESET,
    CREATE_PRODUCT_REVIEW_SUCCESS,
    GET_ADMIN_ALL_PRODUCTS_FAIL,
    GET_ADMIN_ALL_PRODUCTS_REQUEST,
    GET_ADMIN_ALL_PRODUCTS_SUCCESS,
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
            return { loading: false, products: action.payload.products 
                , pages: action.payload.pages , pageNumber: action.payload.pageNumber}
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

export const adminGetProductsReducer = (state = { products:[]},action) => {
    switch(action.type){
        case GET_ADMIN_ALL_PRODUCTS_REQUEST:
            return { loading:true }
        case GET_ADMIN_ALL_PRODUCTS_SUCCESS:
            return { loading:false, products:action.payload}
        case GET_ADMIN_ALL_PRODUCTS_FAIL:
            return { loading:false, error:action.payload}
        default:
            return state
    }
}


export const adminDeleteProductReducer = (state = {success:false},action) => {
    switch(action.type){
        case ADMIN_DELETE_PRODUCT_REQUEST:
            return { loading:true }
        case ADMIN_DELETE_PRODUCT_SUCCESS:
            return { loading:false, success:true, product:action.payload}
        case ADMIN_DELETE_PRODUCT_FAIL:
            return { loading:false, error:action.payload}
        default:
            return state
    }
}

export const adminCreateProductReducer = (state = {success:false},action) => {
    switch(action.type){
        case ADMIN_CREATE_PRODUCT_REQUEST:
            return { loading:true }
        case ADMIN_CREATE_PRODUCT_SUCCESS:
            return { loading:false, success:true, product:action.payload}
        case ADMIN_CREATE_PRODUCT_FAIL:
            return { loading:false, error:action.payload}
        case ADMIN_CREATE_PRODUCT_RESET:
            return {}
        default:
            return state
    }
}

export const adminEditProductReducer = (state = {success:false},action) => {
    switch(action.type){
        case ADMIN_EDIT_PRODUCT_REQUEST:
            return { loading:true }
        case ADMIN_EDIT_PRODUCT_SUCCESS:
            return { loading:false, success:true, product:action.payload}
        case ADMIN_EDIT_PRODUCT_FAIL:
            return { loading:false, error:action.payload}
        case ADMIN_EDIT_PRODUCT_RESET:
            return {}
        default:
            return state
    }
}

export const createProductReviewReducer = (state = {},action) => {
    switch(action.type){
        case CREATE_PRODUCT_REVIEW_REQUEST:
            return { loading:true }
        case CREATE_PRODUCT_REVIEW_SUCCESS:
            return { loading:false, review:action.payload}
        case CREATE_PRODUCT_REVIEW_FAIL:
            return { loading:false, error:action.payload}
        case CREATE_PRODUCT_REVIEW_RESET:
            return {}
        default:
            return state
    }
}