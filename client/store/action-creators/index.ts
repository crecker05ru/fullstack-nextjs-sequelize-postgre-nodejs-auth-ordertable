import * as UserActionCreators from "./user"
import * as OrderActionCreators from "./order"
import * as OrderListCreators from "./orderList"
import * as UsersActionCreators from "./users"
import * as AuthDataActionCreators from "./authData"
import * as CurrencyActionCreators from "./currency"

export default {
    ...UserActionCreators,
    ...OrderActionCreators,
    ...OrderListCreators,
    ...UsersActionCreators,
    ...AuthDataActionCreators,
    ...CurrencyActionCreators

}