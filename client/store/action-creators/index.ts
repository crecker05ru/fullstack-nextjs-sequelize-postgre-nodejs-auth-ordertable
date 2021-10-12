import * as UserActionCreators from "./user"
import * as OrderActionCreators from "./order"
import * as OrderListCreators from "./orderList"
import * as UsersActionCreators from "./users"
import * as AuthDataActionCreators from "./authData"
import * as CurrencyActionCreators from "./currency"
import * as ProcessActionCreators from './process'

export default {
    ...UserActionCreators,
    ...OrderActionCreators,
    ...OrderListCreators,
    ...UsersActionCreators,
    ...AuthDataActionCreators,
    ...CurrencyActionCreators,
    ...ProcessActionCreators

}