import React, {useState} from 'react';
import {ReduxStoreProviderDecorator} from "./ReduxStoreProviderDecorator";
import { todolistApi } from '../api/todolists-api';

export default {
    title: 'Axios',
    decorators: [ReduxStoreProviderDecorator]
}


export const GetTodolist = () => {

    const[state, setState] = useState<any>(null)

    const getTodolist = () => {
        todolistApi.getTodolist()
            .then((response: any) => {
                    setState(response.data)
                }
            )
    }

    return <div>
        {JSON.stringify((state))}
        <div>
            <button onClick={getTodolist}>Get todolist</button>
        </div>
    </div>
}

export const CreateTodolist = () => {
    const[state, setState] = useState<any>(null)
    const[title, setTitle] = useState<string>('')

    const createTodolist = () => {
        todolistApi.createTodolist(title)
            .then(response => {
                    setState(response.data)

                }
            )
    }

    return <div>
        {JSON.stringify((state))}
        <div>
            <input placeholder={"title"} value={title} onChange={e=> setTitle(e.currentTarget.value)}/>
            <button onClick={createTodolist}>Add Todolist</button>
        </div>
    </div>

}
export const DeleteTodolist = () => {
    const[state, setState] = useState<any>(null)
    const[todolistId, setTodolistId] = useState<string>('')

    const deleteTodolist = () => {
        todolistApi.deleteTodolist(todolistId)
            .then(response => {
                    setState(null)
                }
            )
    }
    return <div>
        {JSON.stringify((state))}
        <div>
            <input placeholder={"todolistID"} value={todolistId} onChange={e=> setTodolistId(e.currentTarget.value)}/>
            <button onClick={deleteTodolist}>Delete Todolist</button>
        </div>
    </div>
}

export const UpdateTodolist = () => {
    const[state, setState] = useState<any>(null)
    const[todolistId, setTodolistId] = useState<string>('')
    const[title, setTitle] = useState<string>('')

    const updateTodolist = () => {
        todolistApi.updateTodolist(todolistId, title)
            .then(response => {
                    setState(response.data)
                }
            )
    }
    return <div>
        {JSON.stringify((state))}
        <div>
            <input placeholder={"todolistId"} value={todolistId} onChange={e => setTodolistId(e.currentTarget.value)}/>
            <input placeholder={"title"} value={title} onChange={e => setTitle(e.currentTarget.value)}/>
            <button onClick={updateTodolist}>Update Todolist</button>
        </div>
    </div>
}
export const GetTasks = () => {

    const[state, setState] = useState<any>(null)
    const[todolistId, setTodolistId] = useState<string>('')

    const getTasks = () => {
        todolistApi.getTasks(todolistId)
            .then((response: any) => {
                    setState(response.data)
                }
            )
    }

    return <div>
        {JSON.stringify((state))}
        <input placeholder={"todolistId"} value={todolistId} onChange={e => setTodolistId(e.currentTarget.value)}/>
        <button onClick={getTasks}>Get tasks</button>
    </div>
}
export const CreateTasks = () => {
    const[state, setState] = useState<any>(null)
    const[title, setTitle] = useState<string>('')
    const[todolistId, setTodolistId] = useState<string>('')


    const createTask = () => {
        todolistApi.createTasks(todolistId, title)
            .then(response => {
                    setState(response.data)
                }
            )
    }

    return <div>
        {JSON.stringify((state))}
        <div>
            <input placeholder={"todolistId"} value={todolistId} onChange={e => setTodolistId(e.currentTarget.value)}/>
            <input placeholder={"title"} value={title} onChange={e => setTitle(e.currentTarget.value)}/>
            <button onClick={createTask}>Create task</button>
        </div>
    </div>

}
export const DeleteTask = () => {
    const[state, setState] = useState<any>(null)
    const[taskId, setTaskId] = useState<string>('')
    const[todolistId, setTodolistId] = useState<string>('')

    const deleteTask = () => {
        todolistApi.deleteTask(todolistId, taskId)
            .then(response => {
                    setState(response.data)

                }
            )
    }

    return <div>
        {JSON.stringify((state))}
        <div>
            <input placeholder={"todolistId"} value={todolistId} onChange={e => setTodolistId(e.currentTarget.value)}/>
            <input placeholder={"taskId"} value={taskId} onChange={e => setTaskId(e.currentTarget.value)}/>
            <button onClick={deleteTask}>Delete task</button>
        </div>
    </div>
}

export const UpdateTask = () => {
    const[state, setState] = useState<any>(null)
    const[taskId, setTaskId] = useState<string>('')
    const[todolistId, setTodolistId] = useState<string>('')
    const[title, setTitle] = useState<string>('')
    const[description, setDescription] = useState<string>('')
    const[status, setStatus] = useState<number>(0)
    const[priority, setPriority] = useState<number>(0)
    const[startDate, setStartDate] = useState<string>('')
    const[deadline, setDeadline] = useState<string>('')

    const updateTask = () => {
        todolistApi.updateTask(todolistId, taskId, title)
            .then(response => {
                    setState(response.data)
                }
            )
    }

    return <div>
        {JSON.stringify((state))}
        <div>
            <input placeholder={"todolistId"} value={todolistId} onChange={e => setTodolistId(e.currentTarget.value)}/>
            <input placeholder={"taskId"} value={taskId} onChange={e => setTaskId(e.currentTarget.value)}/>
            <input placeholder={"title"} value={title} onChange={e => setTitle(e.currentTarget.value)}/>
            <input placeholder={"description"} value={description} onChange={e => setDescription(e.currentTarget.value)}/>
            <input type={"number"} placeholder={"status"} min={0} max={4} value={status} onChange={e => setStatus(+e.currentTarget.value)}/>
            <button onClick={updateTask}>Update task</button>
        </div>
    </div>
}
