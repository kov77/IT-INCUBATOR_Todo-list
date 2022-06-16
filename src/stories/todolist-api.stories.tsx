import React, {useEffect, useState} from 'react';
import {ReduxStoreProviderDecorator} from "./ReduxStoreProviderDecorator";
import { todolistApi } from '../api/todolists-api';

export default {
    title: 'Axios',
    decorators: [ReduxStoreProviderDecorator]
}

const todolistId = "76d032a7-c14a-4443-9f77-26a23f7a9446"
const taskId = "17975dea-7e10-4c98-852c-5892c31f37e7"


export const GetTodolist = () => {

    const[state, setState] = useState<any>(null)

    useEffect(() => {
        todolistApi.getTodolist()
            .then((response: any) => {
            setState(response.data)
            }
        )
    }, [])

    return <div>{JSON.stringify((state))}</div>
}

export const CreateTodolist = () => {
    const[state, setState] = useState<any>(null)

    useEffect(() => {
        todolistApi.createTodolist("New one")
            .then(response => {
                setState(response.data)

            }
        )
    }, [])
    return <div>{JSON.stringify((state))}</div>

}
export const DeleteTodolist = () => {
    const[state, setState] = useState<any>(null)

    useEffect(() => {
       todolistApi.deleteTodolist(todolistId)
            .then(response => {
                    setState(null)
                }
            )
    }, [])
    return <div>{JSON.stringify((state))}</div>
}

export const UpdateTodolist = () => {
    const[state, setState] = useState<any>(null)

    useEffect(() => {
        todolistApi.updateTodolist(todolistId, "Hi There")
            .then(response => {
                    setState(response.data)
                }
            )
    }, [])
    return <div>{JSON.stringify((state))}</div>
}
export const GetTasks = () => {

    const[state, setState] = useState<any>(null)

    useEffect(() => {
        todolistApi.getTasks(todolistId)
            .then((response: any) => {
                    setState(response.data)
                }
            )
    }, [])

    return <div>{JSON.stringify((state))}</div>
}
export const CreateTasks = () => {
    const[state, setState] = useState<any>(null)
    useEffect(() => {
        todolistApi.createTasks(todolistId, "The best of the best title")
            .then(response => {
                    setState(response.data)

                }
            )
    }, [])
    return <div>{JSON.stringify((state))}</div>

}
export const DeleteTask = () => {
    const[state, setState] = useState<any>(null)

    useEffect(() => {
        todolistApi.deleteTask(todolistId, taskId)
            .then(response => {
                    setState(response.data)

                }
            )
    }, [])
    return <div>{JSON.stringify((state))}</div>
}

export const UpdateTask = () => {
    const[state, setState] = useState<any>(null)

    useEffect(() => {
        todolistApi.updateTask(todolistId, taskId, "Today up task")
            .then(response => {
                    setState(response.data)
                }
            )
    }, [])
    return <div>{JSON.stringify((state))}</div>
}
