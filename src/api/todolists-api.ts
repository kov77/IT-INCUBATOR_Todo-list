import axios from 'axios'

const settings = {
    withCredentials: true,
    headers: {
        "API-KEY": "64b816f4-c9e0-431f-be44-c151fe573295"
    }
}

export type todolistType = {
    id: string
    title: string
    addedDate: string
    order: number
}

export type createTodolistType = {
    data: {item: todolistType}
    messages: Array<string>
    resultCode: number
}
export type deleteTodolistType = {
    data: {}
    messages: Array<string>
    resultCode: number
}
export type updateTodolistType = {
    data: {}
    messages: Array<string>
    resultCode: number
}

const todolistId = "7b622f37-86fd-4a44-9069-03115aa6ad2e"
// const taskId = "c6f79526-9f82-4a29-8716-5663d26d1435"


export const todolistApi = {
    getTodolist() {
        return axios.get<todolistType[]>('https://social-network.samuraijs.com/api/1.1/todo-lists', settings)
    },
    postTodolist(title) {
        return axios.post<createTodolistType>('https://social-network.samuraijs.com/api/1.1/todo-lists', title, settings)
    },
    deleteTodolist() {
        return axios.delete<deleteTodolistType>('https://social-network.samuraijs.com/api/1.1/todo-lists/' + todolistId, settings)
    },
    updateTodolist(title) {
        return axios.put<updateTodolistType>('https://social-network.samuraijs.com/api/1.1/todo-lists/' + todolistId, title, settings)
    },
    getTasks() {
        return axios.get('https://social-network.samuraijs.com/api/1.1/todo-lists/' + todolistId + "/tasks", settings)
    },

}
