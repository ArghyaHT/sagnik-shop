import {
    GET_ALL_PRODUCTS_FAIL,
    GET_ALL_PRODUCTS_REQUEST,
    GET_ALL_PRODUCTS_SUCCESS, 
    GET_PRODUCT_DETAIL_REQUEST,
    GET_PRODUCT_DETAIL_SUCCESS,
} from "../constants/productConstants"
import axios from 'axios'

export const getProductsAction = () => async (dispatch) => {
    dispatch({ type: GET_ALL_PRODUCTS_REQUEST })

    try {
        const { data } = await axios.get("http://localhost:3000/api/product")

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
        const {data} = await axios.get(`http://localhost:3000/api/product/${id}`)

        dispatch({
            type:GET_PRODUCT_DETAIL_SUCCESS,
            payload:data
        })
    } catch (error) {
        dispatch({
            type:GET_ALL_PRODUCTS_FAIL,
            payload:error.response && error.response.data.message ? error.response.data.message : error.response
        })
    }
}