import axios from 'axios';
import { Dispatch } from "redux";
import {UserActionTypes,UserAction} from "../../types/user"
import {$authHost, $host} from "../../http/index";
import jwt_decode from "jwt-decode";
import { responsePathAsArray } from 'graphql';

export const fetchUser = () => {
    return async (dispatch: Dispatch<UserAction>) => {
        try{
            dispatch({type: UserActionTypes.FETCH_USER})
            const response = await axios.get("http://localhost:3001/api/userprofile")
            dispatch({type: UserActionTypes.FETCH_USER_SUCCESS,payload: response.data})
        }catch(e){
            dispatch({type: UserActionTypes.FETCH_USER_ERROR,payload: "Error"})
        }
    }
}

export const registerUser = (email,name,password) => {
    return async (dispatch) => {
        try{
            // const response = await axios.post("http://localhost:3001/api/user/registration",{email,name,password})
            // console.log('response',response)
            // console.log('response.data.token',response.data.token)
            // let isAuth = !!response.data.token
            // console.log('isAuth',isAuth)
            // dispatch({type: UserActionTypes.REGISTER,payload: isAuth})
            // dispatch(fetchUser())
            const {data} = await $host.post('api/user/registration', {email,name ,password})
            localStorage.setItem('token', data.token)
            let isAuth = !!data.token
            console.log("registration user action",data)
            dispatch({type: UserActionTypes.REGISTER,payload: isAuth})
            dispatch(fetchUser())
            return jwt_decode(data.token)
        }catch(e){
            console.log(e)
        }
    }
}
export const loginUser = (email,password) => {
    return async (dispatch) => {
        try{
            // const response = await axios.post("http://localhost:3001/api/user/login",{email,password})
            // let isAuth = !!response.data.token
            // dispatch({type: UserActionTypes.LOGIN, payload: isAuth})
            const {data} = await $host.post('api/user/login', {email, password})
            localStorage.setItem('token', data.token)
            let isAuth = !!data.token
            console.log('isAuth',isAuth)
            console.log("login user action",data)
            dispatch({type: UserActionTypes.LOGIN, payload: isAuth})
            return jwt_decode(data.token)
            
        }catch (e){
            dispatch({type: UserActionTypes.FETCH_USER_ERROR,payload: "Неверный логин или пароль"})
            console.log(e)
        }
    }
}
export const logoutUser = () => {
    return async (dispatch) => {
        try{
            const response = await axios.post("http://localhost:3001/api/user/logout")
            let isAuth = !!response.data.token
            localStorage.removeItem('token')
            dispatch({type: UserActionTypes.LOGOUT, payload: isAuth})
        }catch (e){
            console.log(e)
        }
    }
}

export const forgetPasswordRequest = (email) => async (dispatch) =>  {
    try{
        const response = await axios.post("http://localhost:3001/api/user/forgot-password",{email})
        console.log(response,'response in forget-password')
        return response.data.message
    }catch(e){
        console.log(e)
    }
}

export const resetPasswordRequest = (id,password) => async (dispatch) => {
    try{
        const response = await axios.post("http://localhost:3001/api/user/reset-password",{id,password})
        console.log(response,'response in reset-password')
        return response.data.message
    }catch(e){
        console.log(e)
    }
}
export const authUser = () => {
    return async (dispatch) => {
        try{
            // const response = await (await axios.get("http://localhost:3001/api/user/auth",{withCredentials :true}))
            // console.log('response',response)
            // let isAuth = !!response.data.token
            // if(response.data.status === 401){
            //     return "Не авторизован"
            // }
            // dispatch({type: UserActionTypes.AUTH, payload: isAuth})
            // console.log('isAuth',isAuth)
            const {data} = await $authHost.get('api/user/auth' )
            localStorage.setItem('token', data.token)
            let isAuth = !!data.token
            if(data.status === 401){
                     return "Не авторизован"
                 }
            dispatch({type: UserActionTypes.AUTH, payload: isAuth})
            return jwt_decode(data.token)
        }catch (e){
            console.log(e)
        }
    }
}