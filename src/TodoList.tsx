import React, {ChangeEvent} from "react";
import {FilterValueType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import classes from './Todolist.module.css'
import {IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";

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
    changeTodolistTitle: (title :string, id: string) => void
    selectAllItems: (todoListId: string, isChecked: boolean) => void
    allSelectItem: boolean

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

    const onChangeTitleItem = (title: string) => {
        props.changeTodolistTitle(title, props.id)
    }

    const onChangeAllItemsHandler = (e: ChangeEvent<HTMLInputElement>) => {
        props.selectAllItems(props.id, e.currentTarget.checked)
    }

    return (
        <div className={classes.todolistClass}>
            <h3 className={classes.todolistHeader}>{<EditableSpan title={props.title} onChange={onChangeTitleItem}/>
            }
                <IconButton className={classes.todolistXBtn} onClick={removeTodolistHandler} aria-label="delete">
                    <Delete />
                </IconButton>
            </h3>
            <AddItemForm label={'New task'} addItem={addTask}/>
            <ul className={classes.todolistItemsWrapper}>
                <li className={classes.allItems}>
                    <input onChange={onChangeAllItemsHandler}
                           className={classes.allItemsInput}
                           type="checkbox" checked={props.allSelectItem}/>
                </li>
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
                            <IconButton onClick={() => props.removeTask(el.id, props.id)} aria-label="delete">
                                <Delete />
                            </IconButton>
                        </li>

                    )
                })
                }
            </ul>
            <div>
                <button className={props.filter === 'all' ? `active-filter` : classes.btnFilterClasses } onClick={onClickFilterHandlerAll}>All</button>
                <button className={props.filter === 'active' ? `active-filter` : classes.btnFilterClasses } onClick={onClickFilterHandlerActive}>Active</button>
                <button className={props.filter === 'complited' ? `active-filter` : classes.btnFilterClasses } onClick={onClickFilterHandlerComplited}>Completed</button>
            </div>
        </div>
    )
}

