import React, {useEffect, useState} from 'react';
import {ReduxStoreProviderDecorator} from "./ReduxStoreProviderDecorator";
import { todolistApi } from '../api/todolists-api';

export default {
    title: 'Axios',
    decorators: [ReduxStoreProviderDecorator]
}


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
        todolistApi.postTodolist({"title": "New one"})
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
       todolistApi.deleteTodolist()
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
        todolistApi.updateTodolist({"title": "Hi There"})
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
        todolistApi.getTasks()
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
        todolistApi.createTasks()
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
        todolistApi.deleteTask()
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
        todolistApi.updateTask()
            .then(response => {
                    setState(response.data)
                }
            )
    }, [])
    return <div>{JSON.stringify((state))}</div>
}
