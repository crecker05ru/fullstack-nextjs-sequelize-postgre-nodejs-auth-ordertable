import axios from 'axios';
import { Dispatch } from "redux";
import {UsersActionTypes,UsersAction} from "../../types/users"
 
const BASE_URL = process.env.NEXT_PUBLIC_ENV_VARIABLE
export const fetchUsers = () => {
    return async (dispatch: Dispatch<UsersAction>) => {
        try{
            dispatch({type: UsersActionTypes.FETCH_USERS})
            const response = await axios.get(BASE_URL+"api/userprofile")
            dispatch({type: UsersActionTypes.FETCH_USERS_SUCCESS,payload: response.data})
        }catch(e){
            dispatch({type: UsersActionTypes.FETCH_USERS_ERROR,payload: "Error"})
        }
    }
}
