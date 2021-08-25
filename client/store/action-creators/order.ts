import { OrderAction, OrderActionTypes } from "../../types/order"
import {Dispatch} from "redux"
import axios  from 'axios';


export const fetchOrder = () => {
    return async (dispatch: Dispatch<OrderAction>) => {
        try{
            dispatch({type: OrderActionTypes.FETCH_ORDER})
            const response = await axios.get("http://localhost:3001/api/order")
            dispatch({type: OrderActionTypes.FETCH_ORDER_SUCCESS,payload: response.data})
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
export const addOrder = (position,name,price,link,total,orderListId) => {
    return async (dispatch) => {
        try{
            const response = await axios.post("http://localhost:3001/api/order",{position,name,price,link,total,orderListId})
            dispatch(fetchOrder())
        }catch(e){
            console.log(e)
        }
    }
}
