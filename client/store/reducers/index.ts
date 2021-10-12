import { combineReducers } from "redux";
import {orderReducer} from './orderReducer';
import { userReducer } from './userReducer';
import {orderListReducer} from "./orderListReducer"
import { usersReducer } from "./usersReducer";
import { AuthDataReducer } from './authReducer';
import { currencyReducer } from './currencyReducer';
import {processReducer} from './processReducer'

export const rootReducer = combineReducers({
    order: orderReducer,
    user: userReducer,
    orderList: orderListReducer,
    users: usersReducer,
    authData: AuthDataReducer,
    currency: currencyReducer,
    processReducer: processReducer
})

export type RootState = ReturnType<typeof rootReducer>