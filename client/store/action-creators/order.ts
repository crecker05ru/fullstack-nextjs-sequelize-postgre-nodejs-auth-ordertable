import { OrderAction, OrderActionTypes } from "../../types/order"
import {Dispatch} from "redux"
import axios  from 'axios';


export const fetchOrder = () => {
    return async (dispatch: Dispatch<OrderAction>) => {
        try{
            dispatch({type: OrderActionTypes.FETCH_ORDER})
            const response = await axios.get("http://localhost:3001/api/order")
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
            const response = await axios.get(`http://localhost:3001/api/order/${id}`)
            dispatch({type: OrderActionTypes.FETCH_ORDER_SUCCESS,payload: response.data})
            
        }catch(e){
            dispatch({type: OrderActionTypes.FETCH_ORDER_ERROR,payload: "Error"})
        }
    }
}
export const addOrder = (position,name,link,price,count,total,orderListId) => {
    return async (dispatch) => {
        try{
            const response = await axios.post("http://localhost:3001/api/order",{position,name,link,price,count,total,orderListId})
            dispatch(fetchOrder())
        }catch(e){
            console.log(e)
        }
    }
}

export const deleteOrder = (id) => async (dispatch) => {
        try{
            const response = await axios.post("http://localhost:3001/api/order/delete",{id})
            dispatch(fetchOrder())
        }catch (e){
            console.log(e)
        }
}

export const editOrder = (id,position,name,link,price,count,total) => async(dispatch) => {
    try{
        const response = await axios.put("http://localhost:3001/api/order/edit",{id,position,name,link,price,count,total})
        dispatch({type: OrderActionTypes.FETCH_ORDER_SUCCESS,payload: response.data})

        
    }catch(e){
        console.log(e)
    }
}
