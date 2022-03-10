import React from "react";
import {FilterValueType} from "./App";

type PropsType = {
    tasks: tasksArr[],
    title: string,
    removeTask: (id: number) => void,
    filterTasks: (value: FilterValueType) => void
}

export type tasksArr = {
    id: number,
    title: string,
    isDone: boolean
}

export function TodoList(props: PropsType) {

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
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
                <button onClick={() => props.filterTasks('all')}>All</button>
                <button onClick={() => props.filterTasks('active')}>Active</button>
                <button onClick={() => props.filterTasks('complited')}>Completed</button>
            </div>
        </div>
    )
}
