import { UserAction, UserActionTypes, UserState } from './../../types/user';
import LogIn from './../../components/logIn';


const initialState: UserState = {
    user: {},
    loading: true,
    error: null,
    isAuth: false
}

export const userReducer = (state = initialState, action:UserAction): UserState => {
    switch(action.type){
        case UserActionTypes.FETCH_USER:
            return {...state,loading: true}
        case UserActionTypes.FETCH_USER_SUCCESS:
            return {...state,loading: false,user:action.payload}
        case UserActionTypes.FETCH_USER_ERROR:
            return {...state,loading: false,error: action.payload,user: {}}
        case UserActionTypes.REGISTER:
            return {...state,loading:false,isAuth: true}
        case UserActionTypes.LOGIN:
            return {...state,loading:false,isAuth: true}
        case UserActionTypes.LOGOUT:
            return {...state,loading:false,isAuth: false}
        case UserActionTypes.AUTH:
            return {...state,loading:false,isAuth: true}
        default:
        return state
    }
}
