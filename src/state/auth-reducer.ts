import { Dispatch } from 'redux'
import {authAPI} from "../api/todolists-api";
import { setStatusAC } from './app-reducer';
import {AxiosError} from "axios";
import {handleNetworkError} from "../utils/error-utils";

const initialState = {
   isLoggedIn: false
}
type InitialStateType = typeof initialState

export const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
   switch (action.type) {
       case 'login/SET-IS-LOGGED-IN':
           return {...state, isLoggedIn: action.value}
       default:
           return state
   }
}
// actions
export const setIsLoggedInAC = (value: boolean) =>
   ({type: 'login/SET-IS-LOGGED-IN', value} as const)

// thunks
export const loginTC = (data: any) => (dispatch: Dispatch<ActionsType>) => {
    // @ts-ignore
    dispatch(setStatusAC('loading'))
    authAPI.login(data)
        .then(response => {
            dispatch(setIsLoggedInAC(response.data.resultCode === 0))
            // @ts-ignore
            dispatch(setStatusAC('succeeded'))
        })
        .catch((error: AxiosError) => {
            handleNetworkError(dispatch, error.message)
        })
}

// types
type ActionsType = ReturnType<typeof setIsLoggedInAC>
