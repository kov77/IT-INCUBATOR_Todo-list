import { Dispatch } from "redux"
import {authAPI} from "../api/todolists-api";
import {setIsLoggedInAC} from "./auth-reducer";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
    status: "" as RequestStatusType,
    error: null as null | string,
    entityStatus : 'idle'
}

const slice = createSlice({
    name: "app",
    initialState: initialState,
    reducers: {
        setStatusAC(state, action: PayloadAction<{status: RequestStatusType}>) {
            state.status = action.payload.status
        },
        setErrorAC(state, action: PayloadAction<{error: string | null}>) {
            state.error = action.payload.error
        }
    }
})

export const appReducer = slice.reducer
export const {setStatusAC} = slice.actions
export const {setErrorAC} = slice.actions

//Thunks

export const initializeAppTC = () => (dispatch: Dispatch) => {
    authAPI.me().then(res => {
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC({value: true}));
        } else {
        }
    })
}


