import { OrderAction, OrderActionTypes } from "../../types/order"
import {Dispatch} from "redux"
import axios  from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_ENV_VARIABLE
export const fetchOrder = () => {
    return async (dispatch: Dispatch<OrderAction>) => {
        try{
            dispatch({type: OrderActionTypes.FETCH_ORDER})
            const response = await axios.get(BASE_URL+"api/order")
            dispatch({type: OrderActionTypes.FETCH_ORDER_SUCCESS,payload: response.data})
            // console.log("response.data in orderReducer",response.data)
        }catch(e){
            dispatch({type: OrderActionTypes.FETCH_ORDER_ERROR,payload: "Error"})
        }
    }
}
export const fetchOrderById = (id) => {
    return async (dispatch: Dispatch<OrderAction>) => {
        try{
            dispatch({type: OrderActionTypes.FETCH_ORDER})
            const response = await axios.get(`${BASE_URL}api/order/${id}`)
            dispatch({type: OrderActionTypes.FETCH_ORDER_SUCCESS,payload: response.data})
            
        }catch(e){
            dispatch({type: OrderActionTypes.FETCH_ORDER_ERROR,payload: "Error"})
        }
    }
}
export const addOrder = (position,name,option,link,price,count,total,userId) => {
    return async (dispatch) => {
        try{
            const response = await axios.post(BASE_URL+"api/order",{position,name,option,link,price,count,total,userId})
            dispatch(fetchOrder())
            // console.log("fetch add")
        }catch(e){
            console.log(e)
        }
    }
}

export const deleteOrder = (id) => async (dispatch) => {
        try{
            const response = await axios.post(BASE_URL+"api/order/delete",{id})
            dispatch(fetchOrder())
        }catch (e){
            console.log(e)
        }
}

export const editOrder = (id,position,name,option,link,price,count,total) => async(dispatch) => {
    try{
        const response = await axios.put(BASE_URL+"api/order/edit",{id,position,name,option,link,price,count,total})
        // dispatch({type: OrderActionTypes.FETCH_ORDER_SUCCESS,payload: response.data})
        dispatch(fetchOrder())
        // console.log("fetch order")
    }catch(e){
        console.log(e)
    }
}
