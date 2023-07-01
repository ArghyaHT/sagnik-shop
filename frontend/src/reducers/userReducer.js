import {
    ADMIN_USER_DELETE_FAIL,
    ADMIN_USER_DELETE_REQUEST,
    ADMIN_USER_DELETE_SUCCESS,
    ADMIN_USER_ID_FAIL,
    ADMIN_USER_ID_REQUEST,
    ADMIN_USER_ID_SUCCESS,
    ADMIN_USER_LIST_FAIL,
    ADMIN_USER_LIST_REQUEST,
    ADMIN_USER_LIST_RESET,
    ADMIN_USER_LIST_SUCCESS,
    ADMIN_USER_UPDATE_FAIL,
    ADMIN_USER_UPDATE_REQUEST,
    ADMIN_USER_UPDATE_SUCCESS,
    USER_DETAILS_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_RESET, USER_DETAILS_SUCCESS, USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT, USER_REG_FAIL, USER_REG_REQUEST, USER_REG_SUCCESS, USER_UPDATE_FAIL, USER_UPDATE_REQUEST, USER_UPDATE_RESET, USER_UPDATE_SUCCESS
} from "../constants/userConstants"

export const userLoginReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_LOGIN_REQUEST:
            return { loading: true }
        case USER_LOGIN_SUCCESS:
            return {
                loading: false,
                userInfo: action.payload
            }
        case USER_LOGIN_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case USER_LOGOUT:
            return {}
        default:
            return state
    }
}

export const userRegisterReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_REG_REQUEST:
            return { loading: true }
        case USER_REG_SUCCESS:
            return {
                loading: false,
                userInfo: action.payload
            }
        case USER_REG_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case USER_LOGOUT:
            return {}
        default:
            return state
    }
}

export const userDetailsReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_DETAILS_REQUEST:
            return { loading: true }
        case USER_DETAILS_SUCCESS:
            return {
                loading: false,
                user: action.payload
            }
        case USER_DETAILS_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case USER_DETAILS_RESET:
            return {}
        default:
            return state
    }
}

export const userUpdateReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_UPDATE_REQUEST:
            return { loading: true }
        case USER_UPDATE_SUCCESS:
            return {
                loading: false,
                success:true,
                userUpdate: action.payload
            }
        case USER_UPDATE_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case USER_UPDATE_RESET:
            return {}
        default:
            return state
    }
}

export const adminUserListReducer = ( state = { users:[]}, action) => {
    switch(action.type){
        case ADMIN_USER_LIST_REQUEST:
            return { loading:true }
        case ADMIN_USER_LIST_SUCCESS:
            return { 
                loading:false,
                users:action.payload
            }
        case ADMIN_USER_LIST_FAIL:
            return { loading:false, error:action.payload}
        case ADMIN_USER_LIST_RESET:
            return {}
        default:
            return state
    }
}

export const adminUserDeleteReducer = ( state = { user:{},loading:false,success:false}, action) => {
    switch(action.type){
        case ADMIN_USER_DELETE_REQUEST:
            return { loading:true }
        case ADMIN_USER_DELETE_SUCCESS:
            return { 
                loading:false,
                success:true,
                user:action.payload
            }
        case ADMIN_USER_DELETE_FAIL:
            return { loading:false, error:action.payload}
        default:
            return state
    }
}

export const adminGetUserIDReducer = ( state = { user:{},loading:false,success:false}, action) => {
    switch(action.type){
        case ADMIN_USER_ID_REQUEST:
            return { loading:true }
        case ADMIN_USER_ID_SUCCESS:
            return { 
                loading:false,
                success:true,
                user:action.payload
            }
        case ADMIN_USER_ID_FAIL:
            return { loading:false, error:action.payload}
        default:
            return state
    }
}

export const adminUserUpdateReducer = ( state = { user:{},loading:false,success:false}, action) => {
    switch(action.type){
        case ADMIN_USER_UPDATE_REQUEST:
            return { loading:true }
        case ADMIN_USER_UPDATE_SUCCESS:
            return { 
                loading:false,
                success:true,
                user:action.payload
            }
        case ADMIN_USER_UPDATE_FAIL:
            return { loading:false, error:action.payload}
        default:
            return state
    }
}

