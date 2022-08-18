import {setErrorAC, setStatusAC} from "../state/app-reducer"
import {Dispatch} from "redux";

export const handleNetworkError = (dispatch: Dispatch, message: string) => {
    dispatch(setErrorAC({error: message}))
    dispatch(setStatusAC({status: 'failed'}))
}

export const handleAppError = (dispatch: Dispatch, message: string) => {
    dispatch(setErrorAC({error: message}))
    dispatch(setStatusAC({status: 'failed'}))
}
