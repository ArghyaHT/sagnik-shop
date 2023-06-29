import { CART_REMOVE_ITEM } from "../constants/cartConstants"
import { ADMIN_DELIVER_ALL_ORDERS_FAIL, ADMIN_DELIVER_ALL_ORDERS_REQUEST, ADMIN_DELIVER_ALL_ORDERS_SUCCESS, ADMIN_GET_ALL_ORDERS_FAIL, ADMIN_GET_ALL_ORDERS_REQUEST, ADMIN_GET_ALL_ORDERS_SUCCESS, ALL_ORDERS_DETAILS_FAIL, ALL_ORDERS_DETAILS_REQUEST, ALL_ORDERS_DETAILS_SUCCESS, CREATE_ORDER_FAIL, CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, GET_ORDER_FAIL, GET_ORDER_REQUEST, GET_ORDER_SUCCESS, ORDER_PAY_FAIL, ORDER_PAY_REQUEST, ORDER_PAY_SUCCESS } from "../constants/orderConstants"
import axios from 'axios'

export const createOrderAction = (order) => async (dispatch, getState) => {
    try {
        dispatch({ type: CREATE_ORDER_REQUEST })

        const userToken = getState().userLogin.userInfo.token

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userToken}`
            }
        }

        const { data } = await axios.post("http://localhost:3000/api/order", order, config)

        dispatch({
            type: CREATE_ORDER_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: CREATE_ORDER_FAIL,
            paylaod: error.response && error.response.data.message ? error.response.data.message : error.response
        })
    }
}


export const getOrderAction = (orderID) => async (dispatch, getState) => {
    try {
        dispatch({ type: GET_ORDER_REQUEST })

        const userToken = getState().userLogin.userInfo.token

        const config = {
            headers: {
                Authorization: `Bearer ${userToken}`
            }
        }

        const { data } = await axios.get(`http://localhost:3000/api/order/${orderID}`, config)

        dispatch({
            type: GET_ORDER_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: GET_ORDER_FAIL,
            paylaod: error.response && error.response.data.message ? error.response.data.message : error.response
        })
    }
}

export const payOrder = (orderId, paymentResult) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_PAY_REQUEST,
        })

        const userToken = getState().userLogin.userInfo.token

        const config = {
            headers: {
                Authorization: `Bearer ${userToken}`
            }
        }

        const { data } = await axios.put(`http://localhost:3000/api/order/${orderId}/pay`, paymentResult, config)

        dispatch({
            type: ORDER_PAY_SUCCESS,
            payload: data,
        })
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message

        dispatch({
            type: ORDER_PAY_FAIL,
            payload: message,
        })
    }
}

export const getAllOrdersAction = () => async (dispatch,getState) => {
    try {
        dispatch({type:ALL_ORDERS_DETAILS_REQUEST})

        const userToken = getState().userLogin.userInfo.token

        const config = {
            headers:{
                Authorization: `Bearer ${userToken}`
            }
        }

        const { data } = await axios.get(`http://localhost:3000/api/order`,config)

        dispatch({
            type:ALL_ORDERS_DETAILS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type:ALL_ORDERS_DETAILS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.response
        })
    }
}

export const adminGetOrdersAction = () => async (dispatch,getState) => {
    try {
        dispatch({type:ADMIN_GET_ALL_ORDERS_REQUEST})

        const userToken = getState().userLogin.userInfo.token

        const config = {
            headers:{
                Authorization: `Bearer ${userToken}`
            }
        }

        const { data } = await axios.get(`http://localhost:3000/api/order/admin/orders`,config)

        dispatch({
            type:ADMIN_GET_ALL_ORDERS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type:ADMIN_GET_ALL_ORDERS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.response
        })
    }
}

export const adminDeliverOrderAction = (id) => async (dispatch,getState) => {
    try {
        dispatch({type:ADMIN_DELIVER_ALL_ORDERS_REQUEST})

        const userToken = getState().userLogin.userInfo.token

        const config = {
            headers:{
                Authorization: `Bearer ${userToken}`
            }
        }

        const { data } = await axios.put(`http://localhost:3000/api/order/admin/orders/${id}`,{},config)

        dispatch({
            type:ADMIN_DELIVER_ALL_ORDERS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type:ADMIN_DELIVER_ALL_ORDERS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.response
        })
    }
}
