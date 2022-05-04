import {taskType} from "../App";
import {addTodolistType, removeTodolistType} from "./todolists-reducer";
import {v1} from "uuid";

export const tasksReducer = (state: any, action: tasksReducerType) => {
    switch (action.type) {
        case "REMOVE-TASK": {
            return {
                ...state, [action.payload.todolistId]: state[action.payload.todolistId].
                filter((task: taskType) => task.id !== action.payload.taskId )
            }
        }
        case "ADD-TASK": {
            let newTask = {id: action.payload.taskId, title: action.payload.title, isDone: false}
            return {
                ...state, [action.payload.todolistId]: [newTask, ...state[action.payload.todolistId]]
            }
        }
        case "CHANGE-TASK-STATUS": {
            return {
                ...state, [action.payload.todolistId] : state[action.payload.todolistId]
                    .map((task: taskType) => {
                        return task.id === action.payload.taskId ? {...task, isDone: action.payload.isDone} : task

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
        default: return state
    }
}
type tasksReducerType = removeTaskType | addTaskType | changeTaskStatusType | changeTaskTitleType | addTodolistType | removeTodolistType
type removeTaskType = ReturnType<typeof removeTasktAC>
type addTaskType = ReturnType<typeof addTasktAC>
type changeTaskStatusType = ReturnType<typeof changeTaskStatusAC>
type changeTaskTitleType = ReturnType<typeof changeTaskTitleAC>

export const removeTasktAC = (taskId: string, todolistId: string) => {
    return {
        type: 'REMOVE-TASK',
        payload: {
            taskId,
            todolistId,
        }
    } as const
}
export const addTasktAC = (taskId: string, todolistId: string, title: string) => {
    return {
        type: 'ADD-TASK',
        payload: {
            taskId,
            todolistId,
            title
        }
    } as const
}
export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string) => {
    return {
        type: 'CHANGE-TASK-STATUS',
        payload: {
            taskId,
            isDone,
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

