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

export type itemsTaskType = {
    description: string
    title: string
    completed: boolean
    status: number
    priority: number
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

export type tasksType = {
    items: itemsTaskType[]
    totalCount: number
    error: string
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
    postTodolist( title: string ) {
        return instance.post<basicTodoType<{item: todolistType}>>('todo-lists', {title})
    },
    deleteTodolist(todolistId: string) {
        return instance.delete<basicTodoType<{}>>(`todo-lists/${todolistId}`)
    },
    updateTodolist(todolistId: string, title: string)  {
        return instance.put<basicTodoType<{}>>(`todo-lists/${todolistId}`, {title})
    },
    getTasks(todolistId: string) {
        return instance.get<tasksType>(`todo-lists/${todolistId}/tasks`)
    },
    createTasks(todolistId: string, title: string ) {
        return instance.post<basicTaskType<itemsTaskType>>(`todo-lists/${todolistId}/tasks`, {title})
    },
    deleteTask(todolistId: string, taskId: string) {
            return instance.delete<basicTaskType<{}>>(`todo-lists/${todolistId}/tasks/${taskId}`)
    },
    updateTask(todolistId: string, taskId: string, title: string) {
        return instance.put<basicTaskType<itemsTaskType>>(`todo-lists/${todolistId}/tasks/${taskId}`, {title})
       }
}
