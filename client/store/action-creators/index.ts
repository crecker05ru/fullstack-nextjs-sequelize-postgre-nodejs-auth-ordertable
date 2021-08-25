import * as UserActionCreators from "./user"
import * as OrderActionCreators from "./order"
import * as OrderListCreators from "./orderList"
import * as UsersActionCreators from "./users"

export default {
    ...UserActionCreators,
    ...OrderActionCreators,
    ...OrderListCreators,
    ...UsersActionCreators

}