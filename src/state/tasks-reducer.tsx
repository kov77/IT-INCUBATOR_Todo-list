import {
    addTodolistType,
    removeTodolistType,
    selectAllItemsType,
    setTodolistsType
} from "./todolists-reducer";
import { TaskStatuses, taskType, todolistApi, updateTaskModelType} from "../api/todolists-api";
import {Dispatch} from "redux";
import {AppRootStateType} from "./store";



export type tasksStateType = {
    [key: string]: taskType[],
}


const initialState: any = {
}

export const tasksReducer = (state: tasksStateType = initialState, action: tasksReducerType) => {
    switch (action.type) {
        case "SET-TODOLISTS": {
            const stateCopy = {...state}
            action.payload.todolists.forEach(todolist => {
                stateCopy[todolist.id] = []
            })
            return stateCopy
        }
        case "REMOVE-TASK": {
            return {
                ...state, [action.payload.todolistId]: state[action.payload.todolistId]
                .filter((task: taskType) => task.id !== action.payload.taskId )
            }
        }
        case "ADD-TASK": {

            return {
                ...state, [action.payload.task.todoListId]: [action.payload.task, ...state[action.payload.task.todoListId]]
            }
        }
        case "CHANGE-TASK-STATUS": {
            return {
                ...state, [action.payload.todolistId] : state[action.payload.todolistId]
                    .map((task: taskType) => {
                        return task.id === action.payload.taskId ? {...task, status: action.payload.status} : task

                    } )
            }
        }
        case "CHANGE-TASK-TITLE": {
            console.log(state)
            console.log(action.payload.todolistId)
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
        case "SET-TASKS": {

            return {...state, [action.payload.todolistId] : action.payload.tasks}
        }
        default: return state
    }
}
type tasksReducerType =  setTodolistsType | removeTaskType | addTaskType | changeTaskStatusType | changeTaskTitleType | addTodolistType | removeTodolistType | selectAllItemsType | SetTasksType
type removeTaskType = ReturnType<typeof removeTaskAC>
type addTaskType = ReturnType<typeof addTaskAC>
type changeTaskStatusType = ReturnType<typeof changeTaskStatusAC>
type changeTaskTitleType = ReturnType<typeof changeTaskTitleAC>
type SetTasksType = ReturnType<typeof SetTasksAC>

export const removeTaskAC = (todolistId: string, taskId: string) => {
    return {
        type: 'REMOVE-TASK',
        payload: {
            taskId,
            todolistId,
        }
    } as const
}
export const addTaskAC = (todolistId: string, title: string, task: taskType) => {
    return {
        type: 'ADD-TASK',
        payload: {
            todolistId,
            title,
            task
        }
    } as const
}
export const changeTaskStatusAC = (todolistId: string, taskId: string, status: TaskStatuses) => {
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

const SetTasksAC = (tasks: tasksStateType, todolistId: string) => {
    return {
        type: "SET-TASKS",
        payload: {
            tasks,
            todolistId
        }
    } as const
}

//Thunk

export const fetchTaskTC = (todolistId: string) => (dispatch: Dispatch) => {
    console.log("id in tasks:   " + todolistId)
    todolistApi.getTasks(todolistId).then(response => {
        dispatch(SetTasksAC(response.data.items, todolistId))
    })
}

export const removeTaskTC = (todolistId: string, taskId: string) => (dispatch: Dispatch) => {
    todolistApi.deleteTask(todolistId, taskId).then(response => {
        dispatch(removeTaskAC(todolistId, taskId))
    })
}
export const addTaskTC = (todolistId: string, title: string) => (dispatch: Dispatch) => {
    todolistApi.createTasks(todolistId, title).then(response => {
        // @ts-ignore
        let task = response.data.data.item
        dispatch(addTaskAC(todolistId, title, task))
    })
}


export const changeTaskStatusTC = (todolistId: string, taskId: string, status: TaskStatuses) => (dispatch: Dispatch, getState: () => AppRootStateType) => {

    const state = getState()
    const tasks = state.tasks
    const currentTask = tasks[todolistId].find((task: taskType) => task.id === taskId)

    const model: updateTaskModelType = {
        description: currentTask.description,
        status: status,
        title: currentTask.title,
        priority: currentTask.priority,
        startDate: currentTask.startDate,
        deadline: currentTask.deadline
    }

    todolistApi.updateTask(todolistId, taskId, model).then(response => {
        dispatch(changeTaskStatusAC(todolistId, taskId, status))
    })
}

export const changeTaskTitleTC = (taskId: string, title: string, todolistId: string) => (dispatch: Dispatch, getState: () => AppRootStateType) => {
    const state = getState()
    const tasks = state.tasks
    const currentTask = tasks[todolistId].find((task: taskType) => task.id === taskId)

    const model: updateTaskModelType = {
        description: currentTask.description,
        status: currentTask.status,
        title: title,
        priority: currentTask.priority,
        startDate: currentTask.startDate,
        deadline: currentTask.deadline
    }

    todolistApi.updateTask(todolistId, taskId, model).then(response => {
        dispatch(changeTaskTitleAC(taskId, title, todolistId))
    })
}



