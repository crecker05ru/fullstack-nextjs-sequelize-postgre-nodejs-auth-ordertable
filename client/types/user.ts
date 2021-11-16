import {UserProfileDataTypeInterface,UserInterface} from './types'

export interface UserState {
    user: UserInterface;
    loading: boolean;
    error: null | string;
    isAuth: boolean;
}
export enum UserActionTypes {
    FETCH_USER = 'FETCH_USER',
    FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS',
    FETCH_USER_ERROR = 'FETCH_USER_FETCH_USER_ERROR',
    REGISTER = "REGISTER",
    LOGIN = "LOGIN",
    LOGOUT = "LOGOUT",
    AUTH = "AUTH"
}
interface FetchUserAction {
    type: UserActionTypes.FETCH_USER;
}
interface FetchUserSuccessAction {
    type: UserActionTypes.FETCH_USER_SUCCESS;
    payload: UserInterface
}
interface FetchUserErrorAction {
    type: UserActionTypes.FETCH_USER_ERROR;
    payload: string;
}
interface Register {
    type: UserActionTypes.REGISTER;
    payload: boolean
}
interface Login{
    type: UserActionTypes.LOGIN;
    payload: boolean
}
interface Logout{
    type: UserActionTypes.LOGOUT;
    payload: boolean
}
interface Auth{
    type: UserActionTypes.AUTH;
    payload: boolean
}
export type UserAction = FetchUserAction | FetchUserErrorAction | FetchUserSuccessAction | Register | Login | Logout | Auth