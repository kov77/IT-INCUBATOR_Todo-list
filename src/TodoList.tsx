import React, {useState, ChangeEvent, KeyboardEvent} from "react";
import {FilterValueType} from "./App";

type PropsType = {
    tasks: tasksArr[],
    title: string,
    removeTask: (id: string) => void,
    filterTasks: (value: FilterValueType) => void
    addTask: (title: string) => void
}

export type tasksArr = {
    id: string,
    title: string,
    isDone: boolean
}

export function TodoList(props: PropsType) {
    const [inputTaskValue, setInputTaskValue] = useState('')

    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newValue = e.currentTarget.value.charAt(0).toUpperCase() + e.currentTarget.value.slice(1);
        setInputTaskValue(newValue)
    }

    const onKeyPressInputHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if(e.key === 'Enter'){
            props.addTask(inputTaskValue);
            setInputTaskValue('')
        }
    }

    const onClickButtonHandler = () => {
        props.addTask(inputTaskValue);
        setInputTaskValue('')
    }

    const onClickFilterHandlerAll = () => props.filterTasks('all')
    const onClickFilterHandlerActive = () => props.filterTasks('active')
    const onClickFilterHandlerComplited = () => props.filterTasks('complited')

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={inputTaskValue} onChange={onChangeInputHandler} onKeyPress={onKeyPressInputHandler}/>
                <button onClick={onClickButtonHandler}>+</button>
            </div>
            <ul>
                {
                    props.tasks.map((el, index) => {
                    return (
                        <li key={el.id}>
                            <input type="checkbox" checked={el.isDone}/> <span>{el.title}</span>
                            <button onClick={() => props.removeTask(el.id)} style={{background: "transparent", border: "none", textAlign: "center", color: "darkred"}}>X</button>
                        </li>

                    )
                })
                }
            </ul>
            <div>
                <button onClick={onClickFilterHandlerAll}>All</button>
                <button onClick={onClickFilterHandlerActive}>Active</button>
                <button onClick={onClickFilterHandlerComplited}>Completed</button>
            </div>
        </div>
    )
}
