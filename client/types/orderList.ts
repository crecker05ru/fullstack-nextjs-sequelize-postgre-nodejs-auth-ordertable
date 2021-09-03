export interface OrderListState {
    orderList: any[];
    loading: boolean;
    error: null | string;
}
export enum OrderListActionTypes {
    FETCH_ORDERLIST = 'FETCH_ORDERLIST',
    FETCH_ORDERLIST_SUCCESS = 'FETCH_ORDERLIST_SUCCESS',
    FETCH_ORDERLIST_ERROR = 'FETCH_ORDERLIST_ERROR',
}
interface FetchOrderListAction {
    type: OrderListActionTypes.FETCH_ORDERLIST;
}
interface FetchOrderListSuccessAction {
    type: OrderListActionTypes.FETCH_ORDERLIST_SUCCESS;
    payload: any[]
}
interface FetchOrderListErrorAction {
    type: OrderListActionTypes.FETCH_ORDERLIST_ERROR;
    payload: string;
}
export type OrderListAction = FetchOrderListAction | FetchOrderListErrorAction | FetchOrderListSuccessAction