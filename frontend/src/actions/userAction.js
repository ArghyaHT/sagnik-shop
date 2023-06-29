import axios from "axios"
import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGOUT,
    USER_REG_FAIL,
    USER_REG_REQUEST,
    USER_REG_SUCCESS,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
    USER_DETAILS_RESET,
    USER_UPDATE_REQUEST,
    USER_UPDATE_SUCCESS,
    USER_UPDATE_FAIL,
    USER_UPDATE_RESET,
    ADMIN_USER_LIST_REQUEST,
    ADMIN_USER_LIST_SUCCESS,
    ADMIN_USER_LIST_FAIL,
    ADMIN_USER_DELETE_REQUEST,
    ADMIN_USER_DELETE_SUCCESS,
    ADMIN_USER_DELETE_FAIL,
    ADMIN_USER_LIST_RESET,
    ADMIN_USER_ID_REQUEST,
    ADMIN_USER_ID_SUCCESS,
    ADMIN_USER_ID_FAIL,
    ADMIN_USER_UPDATE_REQUEST,
    ADMIN_USER_UPDATE_SUCCESS,
    ADMIN_USER_UPDATE_FAIL
} from "../constants/userConstants"

export const userLoginAction = (email, password) => async (dispatch, getState) => {
    dispatch({ type: USER_LOGIN_REQUEST })
    try {
        const { data } = await axios.post("http://localhost:3000/api/user/login", { email, password }, {
            headers: {
                "Content-Type": "application/json"
            }
        })

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

        localStorage.setItem("userInfo", JSON.stringify(getState().userLogin.userInfo))
    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.response
        })
    }
}

export const userLogoutAction = () => (dispatch) => {
    localStorage.removeItem("userInfo")
    dispatch({ type: USER_LOGOUT })
    dispatch({ type: USER_DETAILS_RESET })
    dispatch({ type: USER_UPDATE_RESET })
    dispatch({ type: ADMIN_USER_LIST_RESET })
}

export const userRegisterAction = (name, email, password, image) => async (dispatch, getState) => {
    dispatch({ type: USER_REG_REQUEST })
    try {
        const { data } = await axios.post("http://localhost:3000/api/user/register", { name, email, password, image }, {
            headers: {
                "Content-Type": "application/json"
            }
        })

        dispatch({
            type: USER_REG_SUCCESS,
            payload: data
        })

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

        localStorage.setItem("userInfo", JSON.stringify(getState().userLogin.userInfo))
    } catch (error) {
        dispatch({
            type: USER_REG_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.response
        })
    }
}

export const userDetailsAction = () => async (dispatch, getState) => {
    try {
        dispatch({ type: USER_DETAILS_REQUEST })

        const userToken = getState().userLogin.userInfo.token

        const config = {
            headers: {
                Authorization: `Bearer ${userToken}`
            }
        }

        const { data } = await axios.get("http://localhost:3000/api/user/profile", config)

        dispatch({
            type: USER_DETAILS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: USER_DETAILS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.response
        })
    }
}

export const userUpdateAction = (user) => async (dispatch, getState) => {
    try {
        dispatch({ type: USER_UPDATE_REQUEST })

        const userToken = getState().userLogin.userInfo.token

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userToken}`
            }
        }

        const { data } = await axios.put("http://localhost:3000/api/user/profile", user, config)

        dispatch({
            type: USER_UPDATE_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: USER_UPDATE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.response
        })
    }
}

export const adminUseristAction = () => async (dispatch, getState) => {
    try {
        dispatch({ type: ADMIN_USER_LIST_REQUEST })

        const userToken = getState().userLogin.userInfo.token

        const config = {
            headers: {
                Authorization: `Bearer ${userToken}`
            }
        }

        const { data } = await axios.get("http://localhost:3000/api/user", config)

        dispatch({
            type: ADMIN_USER_LIST_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: ADMIN_USER_LIST_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.response
        })
    }
}

export const adminUserdeleteAction = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: ADMIN_USER_DELETE_REQUEST })

        const userToken = getState().userLogin.userInfo.token

        const config = {
            headers: {
                Authorization: `Bearer ${userToken}`
            }
        }

        const { data } = await axios.delete(`http://localhost:3000/api/user/${id}`, config)

        dispatch({
            type: ADMIN_USER_DELETE_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: ADMIN_USER_DELETE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.response
        })
    }
}


export const adminGetUserIDAction = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: ADMIN_USER_ID_REQUEST })

        const userToken = getState().userLogin.userInfo.token

        const config = {
            headers: {
                Authorization: `Bearer ${userToken}`
            }
        }

        const { data } = await axios.get(`http://localhost:3000/api/user/${id}`, config)

        dispatch({
            type: ADMIN_USER_ID_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: ADMIN_USER_ID_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.response
        })
    }
}

export const adminUserUpdateAction = (id, user) => async (dispatch, getState) => {
    try {
        dispatch({ type: ADMIN_USER_UPDATE_REQUEST })

        const userToken = getState().userLogin.userInfo.token

        const config = {
            headers: {
                Authorization: `Bearer ${userToken}`
            }
        }

        const { data } = await axios.put(`http://localhost:3000/api/user/${id}`, user, config)

        dispatch({
            type: ADMIN_USER_UPDATE_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: ADMIN_USER_UPDATE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.response
        })
    }
}


