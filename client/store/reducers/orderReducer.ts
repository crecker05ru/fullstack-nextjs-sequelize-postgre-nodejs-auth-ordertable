import {OrderAction,OrderActionTypes,OrderState } from "../../types/order"


const initialState: OrderState = {
    order:[],
    loading: false,
    error: null
}

export const orderReducer = (state = initialState,action:OrderAction ): OrderState => {
    switch (action.type){
        case OrderActionTypes.FETCH_ORDER:
                return {...state,loading: true , error: null, order: []}
        case OrderActionTypes.FETCH_ORDER_SUCCESS:
            return {...state,loading: false,error: null, order: action.payload}
        case OrderActionTypes.FETCH_ORDER_ERROR:
            return {...state,loading: false, error: action.payload, order:[]}        
            default:
                return state
    }
}