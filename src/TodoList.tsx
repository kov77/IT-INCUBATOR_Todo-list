import React, {ChangeEvent} from "react";
import {FilterValueType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";

type PropsType = {
    tasks: tasksArr[],
    title: string,
    removeTask: (id: string, todoListId: string) => void,
    filterTasks: (value: FilterValueType, filterId: string) => void
    addTask: (title: string, todoListId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todoListId: string) => void
    filter: FilterValueType
    id: string
    removeTodoList: (todoListId: string) => void
    onCnangeListItemHandler: (newValue: string, id: string, todolistId: string) => void
}

export type tasksArr = {
    id: string,
    title: string,
    isDone: boolean
}

export function TodoList(props: PropsType) {
    const onClickFilterHandlerAll = () => props.filterTasks('all', props.id)
    const onClickFilterHandlerActive = () => props.filterTasks('active', props.id)
    const onClickFilterHandlerComplited = () => props.filterTasks( 'complited', props.id)

    const removeTodolistHandler = () => {
        props.removeTodoList(props.id)
    }

    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }

    return (
        <div>
            <h3>{props.title}
                <button onClick={removeTodolistHandler}> X</button>
            </h3>
            <AddItemForm addItem={addTask}/>
            <ul>
                {
                    props.tasks.map((el, index) => {
                       const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                           props.changeTaskStatus(el.id, e.currentTarget.checked, props.id)
                       }

                        const onCnangeListItem = (newValue: string) => {
                            props.onCnangeListItemHandler(newValue, el.id, props.id)
                        }
                    return (
                        <li key={el.id} className={el.isDone ? 'is-done' : ''}>
                            <input
                                onChange={onChangeHandler}
                                type="checkbox" checked={el.isDone}/>
                               <EditableSpan title={el.title} onChange={onCnangeListItem}/>
                            <button onClick={() => props.removeTask(el.id, props.id)}
                                    style={{background: "transparent", border: "none", textAlign: "center", color: "darkred"}}>X</button>
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

