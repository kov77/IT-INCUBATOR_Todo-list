import React, {useState, ChangeEvent, KeyboardEvent} from "react";
import {FilterValueType} from "./App";

type PropsType = {
    tasks: tasksArr[],
    title: string,
    removeTask: (id: string) => void,
    filterTasks: (value: FilterValueType) => void
    addTask: (title: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean) => void
    filter: FilterValueType
}

export type tasksArr = {
    id: string,
    title: string,
    isDone: boolean
}

export function TodoList(props: PropsType) {
    const [inputTaskValue, setInputTaskValue] = useState('')
    const [error, setError] = useState<string | null>(null)

    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newValue = (e.currentTarget.value.charAt(0).toUpperCase() + e.currentTarget.value.slice(1));
        setInputTaskValue(newValue)

    }

    const onKeyPressInputHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)

        if(e.key === 'Enter' && inputTaskValue.trim() !== '' && inputTaskValue.trim()){

            props.addTask(inputTaskValue.trim());
            setInputTaskValue('')
        }
    }

    const onClickButtonHandler = () => {
        if(inputTaskValue.trim() !== '') {
            props.addTask(inputTaskValue.trim());
        }
        else {
            setError('Title is required')
        }
        setInputTaskValue('')
    }

    const onClickFilterHandlerAll = () => props.filterTasks('all')
    const onClickFilterHandlerActive = () => props.filterTasks('active')
    const onClickFilterHandlerComplited = () => props.filterTasks( 'complited')

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={inputTaskValue} onChange={onChangeInputHandler} onKeyPress={onKeyPressInputHandler} className={error ? 'error' : ''}/>
                <button onClick={onClickButtonHandler}>+</button>
                {error && <div className='error-message'>{error}</div>}
            </div>
            <ul>
                {
                    props.tasks.map((el, index) => {
                       const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                           props.changeTaskStatus(el.id, e.currentTarget.checked)
                       }
                    return (
                        <li key={el.id} className={el.isDone ? 'is-done' : ''}>
                            <input onChange={onChangeHandler} type="checkbox" checked={el.isDone}/> <span>{el.title}</span>
                            <button onClick={() => props.removeTask(el.id)} style={{background: "transparent", border: "none", textAlign: "center", color: "darkred"}}>X</button>
                        </li>

                    )
                })
                }
            </ul>
            <div>
                <button className={props.filter === 'all' ? 'active-filter' : ''} onClick={onClickFilterHandlerAll}>All</button>
                <button className={props.filter === 'active' ? 'active-filter' : ''} onClick={onClickFilterHandlerActive}>Active</button>
                <button className={props.filter === 'complited' ? 'active-filter' : ''} onClick={onClickFilterHandlerComplited}>Completed</button>
            </div>
        </div>
    )
}
