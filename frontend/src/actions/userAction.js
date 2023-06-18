import axios from "axios"
import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGOUT,
    USER_REG_FAIL,
    USER_REG_REQUEST,
    USER_REG_SUCCESS
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
    dispatch({
        type:USER_LOGOUT
    }) 
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