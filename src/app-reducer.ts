import {Dispatch} from "redux";

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
//    status: 'loading' as RequestStatusType
   status: "" as RequestStatusType
}

type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
   switch (action.type) {
       case 'APP/SET-STATUS':
           return {...state, status: action.status}
       default:
           return state
   }
}

type ActionsType = any


export const setStatusAC = (status: RequestStatusType) => {
        return {
            type: "APP/SET-STATUS",
            status
        } as const
}
