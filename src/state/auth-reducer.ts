import { Dispatch } from 'redux'
import {authAPI} from "../api/todolists-api";
import { setStatusAC } from './app-reducer';
import {AxiosError} from "axios";
import {handleNetworkError} from "../utils/error-utils";
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
    isLoggedIn: false,
    isAuthorized: false
}

const slice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        setIsLoggedInAC(state, action: PayloadAction<{value: boolean}>) {
            state.isLoggedIn = action.payload.value
}
    }
})

export const authReducer = slice.reducer
export const {setIsLoggedInAC} = slice.actions

// thunks
export const loginTC = (data: any) => (dispatch: Dispatch) => {
    // @ts-ignore
    dispatch(setStatusAC({status: 'loading'}))
    authAPI.login(data)
        .then(response => {
            if(response.data.resultCode === 0) {
                dispatch(setIsLoggedInAC({value: true}))
                // @ts-ignore
                dispatch(setStatusAC({status: 'succeeded'}))
            }
        })
        .catch((error: AxiosError) => {
            handleNetworkError(dispatch, error.message)
        })
}

export const logoutTC = () => (dispatch: Dispatch) => {
    authAPI.logout()
        .then(response => {
            dispatch(setIsLoggedInAC({value: false}))
        })
}

