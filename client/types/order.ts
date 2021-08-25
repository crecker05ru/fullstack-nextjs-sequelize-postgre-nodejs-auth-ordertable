

export interface OrderState {
    order: any[];
    loading: boolean;
    error: null | string;
}
export enum OrderActionTypes {
    FETCH_ORDER = 'FETCH_ORDER',
    FETCH_ORDER_SUCCESS = 'FETCH_ORDER_SUCCESS',
    FETCH_ORDER_ERROR = 'FETCH_ORDER_FETCH_ORDER_ERROR',
}
interface FetchOrderAction {
    type: OrderActionTypes.FETCH_ORDER;
}
interface FetchOrderSuccessAction {
    type: OrderActionTypes.FETCH_ORDER_SUCCESS;
    payload: any[]
}
interface FetchOrderErrorAction {
    type: OrderActionTypes.FETCH_ORDER_ERROR;
    payload: string;
}
export type OrderAction = FetchOrderAction | FetchOrderErrorAction | FetchOrderSuccessAction