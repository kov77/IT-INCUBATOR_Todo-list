import { Dispatch } from 'redux'
import {authAPI} from "../api/todolists-api";
import { setStatusAC } from './app-reducer';
import {AxiosError} from "axios";
import {handleNetworkError} from "../utils/error-utils";
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {action} from "@storybook/addon-actions";

const initialState = {
    isLoggedIn: false,
    isAuthorized: false
}
type InitialStateType = typeof initialState

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
    dispatch(setStatusAC('loading'))
    authAPI.login(data)
        .then(response => {
            dispatch(setIsLoggedInAC({value: response.data.resultCode === 0}))
            // @ts-ignore
            dispatch(setStatusAC('succeeded'))
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

