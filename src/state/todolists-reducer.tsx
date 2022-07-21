import { Dispatch } from "redux";
import {todolistApi, todolistType} from "./../api/todolists-api"
import {setStatusAC} from "./app-reducer";

const initialState: Array<todoListDomainType> = [];

export type FilterValueType = "all" | "completed" | "active"

export type todoListDomainType = todolistType & {
    filter: FilterValueType
    selectHandler: boolean
}

export const todolistsReducer = (state: Array<todoListDomainType> = initialState, action: todolistsReducerType) => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return state.filter(el => el.id !== action.payload.todolistId)
        case "ADD-TODOLIST":

            const todoList: todoListDomainType = {
                id: action.payload.todolistId,
                title: action.payload.title,
                filter: "all",
                selectHandler: false,
                addedDate: '',
                order: 0
            }
            return [todoList, ...state]
        case "CHANGE-TODOLIST-TITLE": {
            return state.map(el => el.id === action.payload.todolistId ? {...el, title: action.payload.title} : el)
        }
        case "CHANGE-TODOLIST-FILTER": {
            return state.map(el => el.id === action.payload.todolistId ? {...el, filter: action.payload.filter} : el)
        }
        case "SELECT-ALL-ITEMS": {
            let todolist = state.find(todolist => todolist.id === action.payload.todolistId)
            if(todolist) {
                todolist.selectHandler = action.payload.isChecked
                if(todolist.selectHandler) {
                   action.payload.tasksObj[action.payload.todolistId].map((el:any) => {
                       return el.status = true
                    })
                } else if(todolist.selectHandler === false) {
                    action.payload.tasksObj[action.payload.todolistId].map((el:any) => {
                       return el.status = false
                    })
                }
            }
            return [...state]
        }
        case "SET-TODOLISTS": {

            return action.payload.todolists.map(todolist => {
                return {...todolist, filter: 'all'}
            })

        }
        default: return state
    }
}
type todolistsReducerType = removeTodolistType | addTodolistType | changeTodolistTitleType | filterTasksType | selectAllItemsType | setTodolistsType
export type removeTodolistType = ReturnType<typeof removeTodolistAC>
export type addTodolistType = ReturnType<typeof addTodolistAC>
type changeTodolistTitleType = ReturnType<typeof changeTodolistTitleAC>
type filterTasksType = ReturnType<typeof filterTasksAC>
export type selectAllItemsType = ReturnType<typeof selectAllItemsAC>
export type setTodolistsType = ReturnType<typeof setTodolistsAC>

export const removeTodolistAC = (todolistId: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        payload: {
            todolistId
        }
    } as const
}
export const addTodolistAC = (title: string, todolistId: string) => {
    return {
        type: 'ADD-TODOLIST',
        payload: {
            title,
            todolistId
        }
    } as const
}
export const changeTodolistTitleAC = (todolistId: string, title: string) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        payload: {
            title,
            todolistId
        }
    } as const
}
export const filterTasksAC = (filter: FilterValueType, todolistId: string) => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        payload: {
            filter,
            todolistId
        }
    } as const
}
export const selectAllItemsAC = (isChecked: boolean, todolistId: string, tasksObj: any) => {
    return {
        type: 'SELECT-ALL-ITEMS',
        payload: {
            isChecked,
            todolistId,
            tasksObj
        }
    } as const
}

export const setTodolistsAC = (todolists: todolistType[]) => {
    return {
        type: 'SET-TODOLISTS',
        payload: {
            todolists
        }
    } as const
}

// Thunk

export const fetchTodosTC = () => (dispatch: Dispatch) => {
    dispatch(setStatusAC('loading'))
        todolistApi.getTodolist().then(response => {
            dispatch(setTodolistsAC(response.data))
            dispatch(setStatusAC('succeeded'))

        })
}

export const addTodolistTC = (title: string) => (dispatch: Dispatch) => {
    dispatch(setStatusAC('loading'))
    todolistApi.createTodolist(title).then(response => {
        dispatch(addTodolistAC(title, response.data.data.item.id))
        console.log(response.data.data.item.id)
        dispatch(setStatusAC('succeeded'))
    })
}
export const changeTodolistTitleTC = (todolistId: string ,title: string) => (dispatch: Dispatch) => {
    dispatch(setStatusAC('loading'))

    todolistApi.updateTodolist(todolistId, title).then(response => {
        dispatch(changeTodolistTitleAC(todolistId, title))
        dispatch(setStatusAC('succeeded'))

    })
}
export const removeTodolistTC = (todolistId: string) => (dispatch: Dispatch) => {
    dispatch(setStatusAC('loading'))
    todolistApi.deleteTodolist(todolistId).then(response => {
        dispatch(removeTodolistAC(todolistId))
        dispatch(setStatusAC('succeeded'))

    })
}



