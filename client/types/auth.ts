export interface AuthDataState {
    authData: any[];
    loading: boolean;
    error: null | string;
    isAuth: boolean;
}

export enum AuthActionTypes {
    FETCH_AUTHDATA = "FETCH_AUTHDATA",
    FETCH_AUTHDATA_SUCCESS = 'FETCH_AUTHDATA_SUCCESS',
    FETCH_AUTHDATA_ERROR = 'FETCH_AUTHDATA_ERROR',
}

interface FetchAuthDataAction {
    type: AuthActionTypes.FETCH_AUTHDATA
}

interface FetchAuthDataSuccess {
    type: AuthActionTypes.FETCH_AUTHDATA_SUCCESS
    payload: any[]
}
interface FetchAuthDataError{
    type: AuthActionTypes.FETCH_AUTHDATA_ERROR
    payload: string
}

export type AuthAction = FetchAuthDataAction | FetchAuthDataSuccess | FetchAuthDataError