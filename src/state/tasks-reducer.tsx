import {addTodolistType, removeTodolistType, selectAllItemsType} from "./todolists-reducer";
import {v1} from "uuid";
import {TaskPriorities, TaskStatuses, taskType} from "../api/todolists-api";



export type tasksStateType = {
    [key: string]: taskType[]
}


const initialState = {}

export const tasksReducer = (state: tasksStateType = initialState, action: tasksReducerType) => {
    switch (action.type) {
        case "REMOVE-TASK": {
            return {
                ...state, [action.payload.todolistId]: state[action.payload.todolistId]
                .filter((task: taskType) => task.id !== action.payload.taskId )
            }
        }
        case "ADD-TASK": {
            let newTask = {
                id: v1(),
                title: action.payload.title,
                status: TaskStatuses.New,
                description: '',
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                todoListId: action.payload.todolistId,
                order: 0,
                addedDate: ''
            }
            return {
                ...state, [action.payload.todolistId]: [newTask, ...state[action.payload.todolistId]]
            }
        }
        case "CHANGE-TASK-STATUS": {
            console.log(action.payload.status)
            return {
                ...state, [action.payload.todolistId] : state[action.payload.todolistId]
                    .map((task: taskType) => {
                        return task.id === action.payload.taskId ? {...task, status: action.payload.status} : task

                    } )
            }
        }
        case "CHANGE-TASK-TITLE": {
            return {
                ...state,  [action.payload.todolistId] : state[action.payload.todolistId]
                    .map((task: taskType) => {
                        return task.id === action.payload.taskId ? {...task, title: action.payload.title} : task

                    } )
            }
        }
        case "ADD-TODOLIST": {
            return {
                ...state, [action.payload.todolistId] : []
            }
        }
        case "REMOVE-TODOLIST": {
            let copyState = {...state}
            delete copyState[action.payload.todolistId]
            return copyState
        }
        case "SELECT-ALL-ITEMS": {
            return {...action.payload.tasksObj}
        }
        default: return state
    }
}
type tasksReducerType = removeTaskType | addTaskType | changeTaskStatusType | changeTaskTitleType | addTodolistType | removeTodolistType | selectAllItemsType
type removeTaskType = ReturnType<typeof removeTaskAC>
type addTaskType = ReturnType<typeof addTaskAC>
type changeTaskStatusType = ReturnType<typeof changeTaskStatusAC>
type changeTaskTitleType = ReturnType<typeof changeTaskTitleAC>

export const removeTaskAC = (taskId: string, todolistId: string) => {
    return {
        type: 'REMOVE-TASK',
        payload: {
            taskId,
            todolistId,
        }
    } as const
}
export const addTaskAC = (todolistId: string, title: string) => {
    return {
        type: 'ADD-TASK',
        payload: {
            todolistId,
            title
        }
    } as const
}
export const changeTaskStatusAC = (taskId: string, status: TaskStatuses, todolistId: string) => {
    return {
        type: 'CHANGE-TASK-STATUS',
        payload: {
            taskId,
            status,
            todolistId
        }
    } as const
}
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string) => {
    return {
        type: 'CHANGE-TASK-TITLE',
        payload: {
            taskId,
            title,
            todolistId
        }
    } as const
}

export const selectAllItemsAC = (isChecked : boolean, todolistID: string, tasksObj: any) => {
    return {
        type: 'SELECT-ALL-ITEMS',
        payload: {
            isChecked,
            todolistID,
            tasksObj
        }
    } as const
}

