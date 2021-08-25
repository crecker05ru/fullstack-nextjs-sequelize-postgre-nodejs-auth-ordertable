import { OrderListAction, OrderListActionTypes } from "../../types/orderList"
import {Dispatch} from "redux"
import axios  from 'axios';


export const fetchOrderList = () => {
    return async (dispatch: Dispatch<OrderListAction>) => {
        try{
            dispatch({type: OrderListActionTypes.FETCH_ORDERLIST})
            const response = await axios.get("http://localhost:3001/api/orderList")
            dispatch({type: OrderListActionTypes.FETCH_ORDERLIST_SUCCESS,payload: response.data})
        }catch(e){
            dispatch({type: OrderListActionTypes.FETCH_ORDERLIST_ERROR,payload: "Error"})
        }
    }
}
export const fetchOrderListById = (id) => {
    return async (dispatch: Dispatch<OrderListAction>) => {
        try{
            dispatch({type: OrderListActionTypes.FETCH_ORDERLIST})
            const response = await axios.get(`http://localhost:3001/api/orderList/${id}`)
            dispatch({type: OrderListActionTypes.FETCH_ORDERLIST_SUCCESS,payload: response.data})
        }catch(e){
            dispatch({type: OrderListActionTypes.FETCH_ORDERLIST_ERROR,payload: "Error"})
        }
    }
}
