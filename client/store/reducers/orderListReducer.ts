import {OrderListAction,OrderListActionTypes,OrderListState } from "../../types/orderList"


const initialState: OrderListState = {
    orderList:[],
    loading: false,
    error: null
}

export const orderListReducer = (state = initialState,action:OrderListAction ): OrderListState => {
    switch (action.type){
        case OrderListActionTypes.FETCH_ORDERLIST:
                return {...state,loading: true , error: null, orderList: []}
        case OrderListActionTypes.FETCH_ORDERLIST_SUCCESS:
            return {...state,loading: false,error: null, orderList: action.payload}
        case OrderListActionTypes.FETCH_ORDERLIST_ERROR:
            return {...state,loading: false, error: action.payload, orderList:[]}        
            default:
                return state
    }
}