import {setErrorAC, setStatusAC} from "../state/app-reducer"

export const handleNetworkError = (dispatch: any, message: string) => {
    dispatch(setErrorAC(message))
    dispatch(setStatusAC('failed'))
}

export const handleAppError = (dispatch: any, message: string) => {
    dispatch(setErrorAC(message))
    dispatch(setStatusAC('failed'))
}
