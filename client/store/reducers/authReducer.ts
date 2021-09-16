import {AuthActionTypes,AuthDataState,AuthAction} from "../../types/auth"

const initialState: AuthDataState = {
    authData: [],
    loading: false,
    error: null,
    isAuth: false
}

export const AuthDataReducer = (state = initialState,action: AuthAction) => {
    switch(action.type){
        case AuthActionTypes.FETCH_AUTHDATA:
            return {...state,loading: true,error: null,authData: []}
        case AuthActionTypes.FETCH_AUTHDATA_SUCCESS:
            return {...state,loading: false,error: null, authData: action.payload,isAuth: true }
        case AuthActionTypes.FETCH_AUTHDATA_ERROR:
            return {...state,loading: false,error: action.payload, authData:[],isAuth: false}
        default:
            return state
    }
}