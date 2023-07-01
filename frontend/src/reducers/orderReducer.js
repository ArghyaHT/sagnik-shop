import { ADMIN_DELIVER_ALL_ORDERS_FAIL, ADMIN_DELIVER_ALL_ORDERS_REQUEST, ADMIN_DELIVER_ALL_ORDERS_SUCCESS, ADMIN_GET_ALL_ORDERS_FAIL, ADMIN_GET_ALL_ORDERS_REQUEST, ADMIN_GET_ALL_ORDERS_SUCCESS, ALL_ORDERS_DETAILS_FAIL, ALL_ORDERS_DETAILS_REQUEST, ALL_ORDERS_DETAILS_SUCCESS, CREATE_ORDER_FAIL, CREATE_ORDER_REQUEST, CREATE_ORDER_RESET, CREATE_ORDER_SUCCESS, GET_ORDER_FAIL, GET_ORDER_REQUEST, GET_ORDER_SUCCESS, ORDER_PAY_FAIL, ORDER_PAY_REQUEST, ORDER_PAY_RESET, ORDER_PAY_SUCCESS } from "../constants/orderConstants";

export const createOrderReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_ORDER_REQUEST:
      return { loading: true }
    case CREATE_ORDER_SUCCESS:
      return { loading: false, order: action.payload, success: true }
    case CREATE_ORDER_FAIL:
      return { loading: false, error: action.payload }
    case CREATE_ORDER_RESET:
      return {}
    default:
      return state
  }
}

export const getOrderReducer = (state = { order: {} }, action) => {
  switch (action.type) {
    case GET_ORDER_REQUEST:
      return { loading: true }
    case GET_ORDER_SUCCESS:
      return { loading: false, order: action.payload, success: true }
    case GET_ORDER_FAIL:
      return { loading: false, error: action.payload }
    // case CREATE_ORDER_RESET:
    //     return {}
    default:
      return state
  }
}


export const orderPayReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_PAY_REQUEST:
      return {
        loading: true,
      }
    case ORDER_PAY_SUCCESS:
      return {
        loading: false,
        order: action.payload,
        success: true,
      }
    case ORDER_PAY_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    case ORDER_PAY_RESET:
      return {}
    default:
      return state
  }
}

export const getAllOrdersReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case ALL_ORDERS_DETAILS_REQUEST:
      return { loading: true }
    case ALL_ORDERS_DETAILS_SUCCESS:
      return { loading: false, orders: action.payload}
    case ALL_ORDERS_DETAILS_FAIL:
      return { laoding: false, error: action.payload }
    default:
      return state
  }
}

export const adminGetOrdersReducer = (state = { orders: [] ,error:false,loading:false}, action) => {
  switch (action.type) {
    case ADMIN_GET_ALL_ORDERS_REQUEST:
      return { loading: true }
    case ADMIN_GET_ALL_ORDERS_SUCCESS:
      return { loading: false, orders: action.payload}
    case ADMIN_GET_ALL_ORDERS_FAIL:
      return { laoding: false, error: action.payload }
    default:
      return state
  }
}

export const adminDeliverOrderReducer = (state = { order: {}, error: false,loading: false,success:false}, action) => {
  switch (action.type) {
    case ADMIN_DELIVER_ALL_ORDERS_REQUEST:
      return { loading: true }
    case ADMIN_DELIVER_ALL_ORDERS_SUCCESS:
      return { loading: false, order: action.payload, success:true}
    case ADMIN_DELIVER_ALL_ORDERS_FAIL:
      return { laoding: false, error: action.payload }
    default:
      return state
  }
}
