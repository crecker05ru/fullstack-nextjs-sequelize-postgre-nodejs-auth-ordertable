import { combineReducers } from "redux";
import {orderReducer} from './orderReducer';
import { userReducer } from './userReducer';
import {orderListReducer} from "./orderListReducer"
import { usersReducer } from "./usersReducer";
import { AuthDataReducer } from './authReducer';

export const rootReducer = combineReducers({
    order: orderReducer,
    user: userReducer,
    orderList: orderListReducer,
    users: usersReducer,
    authData: AuthDataReducer
})

export type RootState = ReturnType<typeof rootReducer>