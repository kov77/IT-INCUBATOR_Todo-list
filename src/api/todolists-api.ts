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

const todolistId = "da7ce7b1-4acc-468e-89be-a8742fb5702a"
const taskId = "a810557f-e847-477e-b3ee-76a191ba77ba"


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
        return axios.put<updateTodolistType>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`, title, settings)
    },
    getTasks() {
        return axios.get(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}/tasks`, settings)
    },
    createTasks() {
        return axios.post(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}/tasks`,{"title": "New task"}, settings)
    },
    deleteTask() {
            return axios.delete(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}/tasks/${taskId}`, settings)
    },
    updateTask() {
        return axios.put(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}/tasks/${taskId}`, {"title": "Updated task"}, settings)
       }



}
