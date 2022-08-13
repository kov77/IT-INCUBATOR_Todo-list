import { Dispatch } from "redux"
import {authAPI} from "../api/todolists-api";
import {setIsLoggedInAC} from "./auth-reducer";

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
    status: "" as RequestStatusType,
    error: null as null | string,
    entityStatus : 'idle'
}

type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
   switch (action.type) {
       case 'APP/SET-STATUS':
           return {...state, status: action.status}
       case "APP/SET-ERROR" :
           return {...state, error: action.error}
       default:
           return state
   }
}


type setStatusType = ReturnType<typeof setStatusAC>
type setErrorType = ReturnType<typeof setErrorAC>

type ActionsType = setStatusType | setErrorType


export const setStatusAC = (status: RequestStatusType) => {
        return {
            type: "APP/SET-STATUS",
            status
        } as const
}

export const setErrorAC = (error: null | string) => {
    return {
        type: "APP/SET-ERROR",
        error
    } as const
}


export const initializeAppTC = () => (dispatch: Dispatch) => {
    authAPI.me().then(res => {
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC({value: true}));
        } else {
        }
    })
}


