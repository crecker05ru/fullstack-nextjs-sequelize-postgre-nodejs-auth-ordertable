import axios from 'axios';
import { Dispatch } from "redux";
import {AuthAction,AuthActionTypes} from "../../types/auth"
import {$authHost, $host} from "../../http/index";
import jwt_decode from "jwt-decode";

// export const fetchAuthData = () => {
//     return async (dispatch: Dispatch<AuthAction>) => {
//         try{
//             dispatch({type: AuthActionTypes.FETCH_AUTHDATA})
//             const response = await axios.get("http://localhost:3001/api/auth")
//             dispatch({type: AuthActionTypes.FETCH_AUTHDATA_SUCCESS,payload: response.data})
//         }catch(e){
//             dispatch({type: AuthActionTypes.FETCH_AUTHDATA_ERROR,payload: "Error"})
//         }
//     }
// }

// export const authUser = () => {
//     return async (dispatch) => {
//         try{
//             // const response = await (await axios.get("http://localhost:3001/api/user/auth",{withCredentials :true}))
//             // console.log('response',response)
//             // let isAuth = !!response.data.token
//             // if(response.data.status === 401){
//             //     return "Не авторизован"
//             // }
//             // dispatch({type: UserActionTypes.AUTH, payload: isAuth})
//             // console.log('isAuth',isAuth)
//             const {data} = await $authHost.get('api/user/auth' )
//             localStorage.setItem('token', data.token)
//             let isAuth = !!data.token
//             if(data.status === 401){
//                      return "Не авторизован"
//                  }
//             dispatch({type: AuthActionTypes.FETCH_AUTHDATA, payload: isAuth})
//             return jwt_decode(data.token)
//         }catch (e){
//             console.log(e)
//         }
//     }
// }

export const fetchAuthData = () => {
    return async (dispatch: Dispatch<AuthAction>) => {
        try{
            dispatch({type: AuthActionTypes.FETCH_AUTHDATA})
            const {data} = await $authHost.get('api/user/auth' )
            if(data.status === 401){
                 return "Не авторизован"
             }
            localStorage.setItem('token', data.token)

            dispatch({type: AuthActionTypes.FETCH_AUTHDATA_SUCCESS,payload: jwt_decode(data.token)})
        }catch(e){
            dispatch({type: AuthActionTypes.FETCH_AUTHDATA_ERROR,payload: "Error"})
        }
    }
}