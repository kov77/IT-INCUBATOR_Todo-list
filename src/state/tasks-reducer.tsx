
import {TaskStatuses, taskType, todolistApi, updateTaskModelType} from "../api/todolists-api";
import {Dispatch} from "redux";
import {AppRootStateType} from "./store";
import {setStatusAC} from "./app-reducer";
import {AxiosError} from "axios";
import {handleAppError, handleNetworkError} from "../utils/error-utils";
import {addTodolistAC, removeTodolistAC, setTodolistsAC} from "./todolists-reducer";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";


export type tasksStateType = {
    [key: string]: taskType[],
}

const initialState: any = {}

export const slice = createSlice({
    name: "task",
    initialState,
    reducers: {
        removeTaskAC(state, action: PayloadAction<{todolistId: string, taskId: string}>) {
            const index = state[action.payload.todolistId].findIndex((task: any) => task.id === action.payload.taskId)
            state[action.payload.todolistId].splice(index, 1)
        },
        addTaskAC(state, action: PayloadAction<{todolistId: string, title: string, task: taskType}>) {
            state[action.payload.todolistId].unshift(action.payload.task)

        },
        changeTaskStatusAC(state, action: PayloadAction<{todolistId: string, taskId: string, status: TaskStatuses}>) {
            const index = state.findIndex((todolist: any) => todolist.id === action.payload.todolistId)
            state[action.payload.todolistId][index].find((task: any) => task.id === action.payload.taskId ? task.status = action.payload.status : task)
        },
        changeTaskTitleAC(state, action: PayloadAction<{taskId: string, title: string, todolistId: string}>) {
            const index = state.findIndex((todolist: any) => todolist.id === action.payload.todolistId)
            state[action.payload.todolistId][index].find((task: any) => task.id === action.payload.taskId ? task.title = action.payload.title : task)
        },
        SetTasksAC(state, action: PayloadAction<{tasks: tasksStateType, todolistId: string}>) {
            state[action.payload.todolistId] = action.payload.tasks
        },

    },
    extraReducers: (builder) => {
        builder.addCase(setTodolistsAC, (state, action) => {
            action.payload.todolists.forEach((todolist: any) => {
                state[todolist.id] = []
            })
        })
        builder.addCase(addTodolistAC, (state, action) => {
            state[action.payload.todolistId] = []
        })
        builder.addCase(removeTodolistAC, (state, action) => {
            delete state[action.payload.id]

        })
    }
})

export const tasksReducer = slice.reducer

export const{removeTaskAC, addTaskAC, changeTaskStatusAC, changeTaskTitleAC, SetTasksAC} = slice.actions

//Thunk

export const fetchTaskTC = (todolistId: string) => (dispatch: Dispatch) => {
    dispatch(setStatusAC({status: 'loading'}))
    todolistApi.getTasks(todolistId).then(response => {
        dispatch(SetTasksAC({tasks: response.data.items, todolistId}))
        dispatch(setStatusAC({status: 'succeeded'}))
    })
        .catch((error: AxiosError) => {
            handleNetworkError(dispatch, error.message)
        })
}

export const removeTaskTC = (todolistId: string, taskId: string) => (dispatch: Dispatch) => {
    dispatch(setStatusAC({status: 'loading'}))
    todolistApi.deleteTask(todolistId, taskId).then(response => {
        dispatch(removeTaskAC({todolistId, taskId}))
        dispatch(setStatusAC({status: 'succeeded'}))
    })
}
export const addTaskTC = (todolistId: string, title: string) => (dispatch: Dispatch) => {
    dispatch(setStatusAC({status: 'loading'}))
    todolistApi.createTasks(todolistId, title)
        .then(response => {
            if (response.data.resultCode === 0) {
                // @ts-ignore
                dispatch(addTaskAC({todolistId, title, task: response.data.data.item}))
                dispatch(setStatusAC({status: 'succeeded'}))
            } else {
                handleAppError(dispatch, response.data.messages[0])
            }


        })
        .catch((error: AxiosError) => {
            handleNetworkError(dispatch, error.message)
        })

}


export const changeTaskStatusTC = (todolistId: string, taskId: string, status: TaskStatuses) => (dispatch: Dispatch, getState: () => AppRootStateType) => {

    const state = getState()
    const tasks = state.tasks as any
    const currentTask = tasks[todolistId].find((task: taskType) => task.id === taskId)

    const model: updateTaskModelType = {
        description: currentTask.description,
        status: status,
        title: currentTask.title,
        priority: currentTask.priority,
        startDate: currentTask.startDate,
        deadline: currentTask.deadline
    }
    dispatch(setStatusAC({status: 'loading'}))
    todolistApi.updateTask(todolistId, taskId, model).then(response => {
        dispatch(changeTaskStatusAC({todolistId, taskId, status}))
        dispatch(setStatusAC({status: 'succeeded'}))
    })
        .catch((error: AxiosError) => {
            handleNetworkError(dispatch, error.message)
        })

}

export const changeTaskTitleTC = (taskId: string, title: string, todolistId: string) => (dispatch: Dispatch, getState: () => AppRootStateType) => {
    const state = getState()
    const tasks = state.tasks as any
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
        dispatch(changeTaskTitleAC({taskId, title, todolistId}))
    })
        .catch((error: AxiosError) => {
            handleNetworkError(dispatch, error.message)
        })
}


