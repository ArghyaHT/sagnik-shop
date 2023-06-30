import {
    ADMIN_CREATE_PRODUCT_FAIL,
    ADMIN_CREATE_PRODUCT_REQUEST,
    ADMIN_CREATE_PRODUCT_SUCCESS,
    ADMIN_DELETE_PRODUCT_FAIL,
    ADMIN_DELETE_PRODUCT_REQUEST,
    ADMIN_DELETE_PRODUCT_SUCCESS,
    ADMIN_EDIT_PRODUCT_FAIL,
    ADMIN_EDIT_PRODUCT_REQUEST,
    ADMIN_EDIT_PRODUCT_SUCCESS,
    CREATE_PRODUCT_REVIEW_FAIL,
    CREATE_PRODUCT_REVIEW_REQUEST,
    CREATE_PRODUCT_REVIEW_SUCCESS,
    GET_ADMIN_ALL_PRODUCTS_FAIL,
    GET_ADMIN_ALL_PRODUCTS_REQUEST,
    GET_ADMIN_ALL_PRODUCTS_SUCCESS,
    GET_ALL_PRODUCTS_FAIL,
    GET_ALL_PRODUCTS_REQUEST,
    GET_ALL_PRODUCTS_SUCCESS,
    GET_PRODUCT_DETAIL_REQUEST,
    GET_PRODUCT_DETAIL_SUCCESS,
} from "../constants/productConstants"
import axios from 'axios'

export const getProductsAction = (keyword = '',pageNumber = '') => async (dispatch) => {
    dispatch({ type: GET_ALL_PRODUCTS_REQUEST })

    try {
        const { data } = await axios.get(`http://localhost:3000/api/product?keyword=${keyword}&pageNumber=${pageNumber}`)

        dispatch({
            type: GET_ALL_PRODUCTS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: GET_ALL_PRODUCTS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.response
        })

        console.log(error)
    }
}

export const getProductDetailAction = (id) => async (dispatch) => {

    dispatch({ type: GET_PRODUCT_DETAIL_REQUEST })

    try {
        const { data } = await axios.get(`http://localhost:3000/api/product/${id}`)

        dispatch({
            type: GET_PRODUCT_DETAIL_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: GET_ALL_PRODUCTS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.response
        })
    }
}


export const adminGetProuctsAction = () => async(dispatch,getState) => {
    try {
        dispatch({type:GET_ADMIN_ALL_PRODUCTS_REQUEST})

        const userToken = getState().userLogin.userInfo.token

        const config = {
            headers:{
                Authorization: `Bearer ${userToken}`
            }
        }
        
        const {data} = await axios.get(`http://localhost:3000/api/product/admin/get`,config)

        dispatch({type:GET_ADMIN_ALL_PRODUCTS_SUCCESS,payload:data})
    } catch (error) {
        dispatch({
            type:GET_ADMIN_ALL_PRODUCTS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.response
        })
    }
}

export const adminDeleteProuctAction = (id) => async(dispatch,getState) => {
    try {
        dispatch({type:ADMIN_DELETE_PRODUCT_REQUEST})

        const userToken = getState().userLogin.userInfo.token

        const config = {
            headers:{
                Authorization: `Bearer ${userToken}`
            }
        }
        
        const {data} = await axios.delete(`http://localhost:3000/api/product/${id}`,config)

        dispatch({type:ADMIN_DELETE_PRODUCT_SUCCESS,payload:data})
    } catch (error) {
        dispatch({
            type:ADMIN_DELETE_PRODUCT_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.response
        })
    }
}


export const adminCreateProuctAction = () => async(dispatch,getState) => {
    try {
        dispatch({type:ADMIN_CREATE_PRODUCT_REQUEST})

        const userToken = getState().userLogin.userInfo.token

        const config = {
            headers:{
                "Content-Type": "application/json",
                Authorization: `Bearer ${userToken}`
            }
        }
        
        const {data} = await axios.post(`http://localhost:3000/api/product`,{},config)

        console.log(config)

        dispatch({type:ADMIN_CREATE_PRODUCT_SUCCESS,payload:data})
    } catch (error) {
        dispatch({
            type:ADMIN_CREATE_PRODUCT_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.response
        })
    }
}



export const adminEditProductAction = (id,product) => async(dispatch,getState) => {
    try {
        dispatch({type:ADMIN_EDIT_PRODUCT_REQUEST})

        const userToken = getState().userLogin.userInfo.token

        const config = {
            headers:{
                "Content-Type": "application/json",
                Authorization: `Bearer ${userToken}`
            }
        }
        
        const {data} = await axios.put(`http://localhost:3000/api/product/${id}`,product,config)

        console.log(config)

        dispatch({type:ADMIN_EDIT_PRODUCT_SUCCESS,payload:data})
    } catch (error) {
        dispatch({
            type:ADMIN_EDIT_PRODUCT_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.response
        })
    }
}


export const createProductReviewAction = (productId,review) => async(dispatch,getState) => {
    try {
        dispatch({type:CREATE_PRODUCT_REVIEW_REQUEST})

        const userToken = getState().userLogin.userInfo.token

        const config = {
            headers:{
                "Content-Type": "application/json",
                Authorization: `Bearer ${userToken}`
            }
        }
        
        const {data} = await axios.post(`http://localhost:3000/api/product/${productId}/review`,review,config)

        dispatch({type:CREATE_PRODUCT_REVIEW_SUCCESS,payload:data})
        
    } catch (error) {
        dispatch({
            type:CREATE_PRODUCT_REVIEW_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.response
        })
    }
}