import { combineReducers } from "redux";
import {orderReducer} from './orderReducer';
import { userReducer } from './userReducer';
import {orderListReducer} from "./orderListReducer"
import { usersReducer } from "./usersReducer";

export const rootReducer = combineReducers({
    order: orderReducer,
    user: userReducer,
    orderList: orderListReducer,
    users: usersReducer
})

export type RootState = ReturnType<typeof rootReducer>