import {FilterValueType, todoListType} from "../App";
import {v1} from "uuid";

export const todolistsReducer = (state: Array<todoListType>, action: todolistsReducerType) => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return state.filter(el => el.id !== action.payload.todolistId)
        case "ADD-TODOLIST":
            const todoList: todoListType = {
                id: v1(),
                title: action.payload.title,
                filter: "all",
                selectHandler: false
            }
            return [todoList, ...state]
        case "CHANGE-TODOLIST-TITLE": {
            return state.map(el => el.id === action.payload.todolistId ? {...el, title: action.payload.title} : el)
        }
        case "CHANGE-TODOLIST-FILTER": {
            return state.map(el => el.id === action.payload.todolistId ? {...el, filter: action.payload.filter} : el)
        }
        default: return state
    }
}
type todolistsReducerType = removeTodolistType | addTodolistType | changeTodolistTitleType | filterTasksType
type removeTodolistType = ReturnType<typeof removeTodolistAC>
type addTodolistType = ReturnType<typeof addTodolistAC>
type changeTodolistTitleType = ReturnType<typeof changeTodolistTitleAC>
type filterTasksType = ReturnType<typeof filterTasksAC>

export const removeTodolistAC = (todolistId: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        payload: {
            todolistId
        }
    } as const
}
export const addTodolistAC = (title: string) => {
    return {
        type: 'ADD-TODOLIST',
        payload: {
            title
        }
    } as const
}
export const changeTodolistTitleAC = (title: string, todolistId: string) => {
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

