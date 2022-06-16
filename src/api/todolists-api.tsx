import axios from 'axios'

const instance = axios.create({
    withCredentials: true,
    headers: {
        "API-KEY": "64b816f4-c9e0-431f-be44-c151fe573295"
    },
    baseURL: "https://social-network.samuraijs.com/api/1.1/"

})

export type todolistType = {
    id: string
    title: string
    addedDate: string
    order: number
}

export type basicTodoType<T> = {
    data: T
    messages: Array<string>
    resultCode: number
}

export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3

}

export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}

export type taskType = {
    description: string
    title: string
    completed: boolean
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}


export type basicTaskType<T> = {
    data: T
    messages: Array<string>
    resultCode: number
}




export const todolistApi = {
    getTodolist() {
        return instance.get<todolistType[]>('todo-lists')
    },
    createTodolist( title: string ) {
        return instance.post<basicTodoType<{item: todolistType}>>('todo-lists', {title})
    },
    deleteTodolist(todolistId: string) {
        return instance.delete<basicTodoType<{}>>(`todo-lists/${todolistId}`)
    },
    updateTodolist(todolistId: string, title: string)  {
        return instance.put<basicTodoType<{}>>(`todo-lists/${todolistId}`, {title})
    },
    getTasks(todolistId: string) {
        return instance.get<taskType[]>(`todo-lists/${todolistId}/tasks`)
    },
    createTasks(todolistId: string, title: string ) {
        return instance.post<basicTaskType<taskType>>(`todo-lists/${todolistId}/tasks`, {title})
    },
    deleteTask(todolistId: string, taskId: string) {
            return instance.delete<basicTaskType<{}>>(`todo-lists/${todolistId}/tasks/${taskId}`)
    },
    updateTask(todolistId: string, taskId: string, title: string) {
        return instance.put<basicTaskType<taskType>>(`todo-lists/${todolistId}/tasks/${taskId}`, {title})
    }
}
