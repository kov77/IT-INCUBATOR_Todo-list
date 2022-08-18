import {Dispatch} from "redux";
import {todolistApi, todolistType} from "../api/todolists-api"
import {setErrorAC, setStatusAC} from "./app-reducer";
import {AxiosError} from "axios";
import {handleNetworkError} from "../utils/error-utils";
import {createSlice} from "@reduxjs/toolkit";

const initialState: Array<todoListDomainType> = [];

export type FilterValueType = "all" | "completed" | "active"

export type todoListDomainType = todolistType & {
    filter: FilterValueType
    selectHandler: boolean
    entityStatus: string
}

const slice = createSlice({
    name: "todolist",
    initialState,
    reducers: {
        removeTodolistAC(state, action) {
            const index = state.findIndex(todo => todo.id === action.payload.todolistId)
            if(index > -1) {
                state.splice(index, 1)
            }
        },
        addTodolistAC(state, action) {

            state.unshift({
                id: action.payload.todolistId,
                title: action.payload.title,
                filter: "all",
                selectHandler: false,
                addedDate: '',
                order: 0,
                entityStatus: 'idle'
            })
        },
        changeTodolistTitleAC(state, action) {
            const index = state.findIndex(todo => todo.id === action.payload.todolistId)
            if(index > -1) {
                state[index].title = action.payload.title
            }
        },
        filterTasksAC(state, action) {
            const index = state.findIndex(todo => todo.id === action.payload.id)
            if(index > -1) {
                state[index].filter = action.payload.filter
            }
        },
        setTodolistsAC(state, action) {
            return action.payload.todolists.map((todolist: any) => ({...todolist, filter: 'all', entityStatus: 'idle'}))
        },
        changeTodolistEntityStatusAC(state, action) {
            const index = state.findIndex(todo => todo.id === action.payload.id)
            if(index > -1) {
                state[index].entityStatus = action.payload.entityStatus
            }
        },
    }
})

export const todolistsReducer = slice.reducer

export const {removeTodolistAC, addTodolistAC, changeTodolistTitleAC, changeTodolistEntityStatusAC, setTodolistsAC, filterTasksAC} = slice.actions

// Thunk

export const fetchTodosTC = () => (dispatch: Dispatch) => {
    dispatch(setStatusAC({status: 'loading'}))
    todolistApi.getTodolist().then(response => {
        dispatch(setTodolistsAC({todolists: response.data}))
        dispatch(setStatusAC({status: 'succeeded'}))
    })
        .catch((error: AxiosError) => {
            handleNetworkError(dispatch, error.message)
            dispatch(setStatusAC({status: 'succeeded'}))
        })
}

export const addTodolistTC = (title: string) => (dispatch: Dispatch) => {
    dispatch(setStatusAC({status: 'loading'}))
    todolistApi.createTodolist(title).then(response => {

        dispatch(addTodolistAC({title, todolistId: response.data.data.item.id}))
        dispatch(setStatusAC({status: 'succeeded'}))
    })
        .catch((error: AxiosError) => {
            handleNetworkError(dispatch, error.message)
            console.log('pizda')
        })
}
export const changeTodolistTitleTC = (todolistId: string, title: string) => (dispatch: Dispatch) => {
    dispatch(setStatusAC({status: 'loading'}))

    todolistApi.updateTodolist(todolistId, title).then(response => {
        dispatch(changeTodolistTitleAC({todolistId, title}))
        dispatch(setStatusAC({status: 'succeeded'}))

    })
        .catch((error: AxiosError) => {
            handleNetworkError(dispatch, error.message)
        })
}
export const removeTodolistTC = (todolistId: string) => (dispatch: Dispatch) => {
    dispatch(setStatusAC({status: 'loading'}))
    dispatch(changeTodolistEntityStatusAC({status: "loading", todolistId}))
    todolistApi.deleteTodolist(todolistId)
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(removeTodolistAC({todolistId}))
                dispatch(setStatusAC({status: 'succeeded'}))
            } else {
                dispatch(setErrorAC({error: "some error"}))
            }
            dispatch(setStatusAC({status: 'failed'}))
            dispatch(changeTodolistEntityStatusAC({status: "failed", todolistId}))
        })
        .catch((error: AxiosError) => {
            handleNetworkError(dispatch, error.message)
        })

}



