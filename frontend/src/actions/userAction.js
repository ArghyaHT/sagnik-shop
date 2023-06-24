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
    USER_UPDATE_RESET
} from "../constants/userConstants"

export const userLoginAction = (email,password) => async(dispatch,getState) => {
    dispatch({type:USER_LOGIN_REQUEST})
    try {
        const {data} = await axios.post("http://localhost:3000/api/user/login",{email,password},{
            headers:{
                "Content-Type":"application/json"
            }
        })

        dispatch({
            type:USER_LOGIN_SUCCESS,
            payload:data
        })

        localStorage.setItem("userInfo",JSON.stringify(getState().userLogin.userInfo))
    } catch (error) {
        dispatch({
            type:USER_LOGIN_FAIL,
            payload:error.response && error.response.data.message ? error.response.data.message : error.response
        })
    }
}

export const userLogoutAction = () => (dispatch) => {
    localStorage.removeItem("userInfo")
    dispatch({ type:USER_LOGOUT }) 
    dispatch({ type:USER_DETAILS_RESET})
    dispatch({ type:USER_UPDATE_RESET})
}

export const userRegisterAction = (name,email,password) => async(dispatch,getState) => {
    dispatch({type:USER_REG_REQUEST})
    try {
        const {data} = await axios.post("http://localhost:3000/api/user/register",{name,email,password},{
            headers:{
                "Content-Type":"application/json"
            }
        })

        dispatch({
            type:USER_REG_SUCCESS,
            payload:data
        })

        dispatch({
            type:USER_LOGIN_SUCCESS,
            payload:data
        })

        localStorage.setItem("userInfo",JSON.stringify(getState().userLogin.userInfo))
    } catch (error) {
        dispatch({
            type:USER_REG_FAIL,
            payload:error.response && error.response.data.message ? error.response.data.message : error.response
        })
    }
}

export const userDetailsAction = () => async(dispatch,getState) => {
    try {
        dispatch({type:USER_DETAILS_REQUEST})

    const userToken = getState().userLogin.userInfo.token

    const config = {
        headers:{
            Authorization:`Bearer ${userToken}`
        }
    }

    const {data} = await axios.get("http://localhost:3000/api/user/profile",config)

    dispatch({
        type:USER_DETAILS_SUCCESS,
        payload:data
    })
    } catch (error) {
        dispatch({
            type:USER_DETAILS_FAIL,
            payload:error.response && error.response.data.message ? error.response.data.message : error.response
        })
    }
}

export const userUpdateAction = (user) => async(dispatch,getState) => {
    try {
        dispatch({type:USER_UPDATE_REQUEST})

    const userToken = getState().userLogin.userInfo.token

    const config = {
        headers:{
            "Content-Type":"application/json",
            Authorization:`Bearer ${userToken}`
        }
    }

    const {data} = await axios.put("http://localhost:3000/api/user/profile",user,config)

    dispatch({
        type:USER_UPDATE_SUCCESS,
        payload:data
    })
    } catch (error) {
        dispatch({
            type:USER_UPDATE_FAIL,
            payload:error.response && error.response.data.message ? error.response.data.message : error.response
        })
    }
}