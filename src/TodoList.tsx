import React, {ChangeEvent, useCallback} from "react";

import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import classes from './Todolist.module.css'
import {IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {FilterValueType} from "./AppWithRedux";
import {Task} from "./Task";

type PropsType = {
    tasksArray: any
    tasks: taskType[],
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
    selectAllItems: (todoListId: string, isChecked: boolean, tasks: any) => void
    allSelectItem: boolean

}

export type taskType = {
    id: string,
    title: string,
    isDone: boolean
}

export const TodoList = React.memo((props: PropsType) => {
    const onClickFilterHandlerAll = useCallback(() => props.filterTasks('all', props.id), [props.filterTasks, props.id])
    const onClickFilterHandlerActive = useCallback(() => props.filterTasks('active', props.id), [props.filterTasks, props.id])
    const onClickFilterHandlerComplited = useCallback(() => props.filterTasks( 'completed', props.id), [props.filterTasks, props.id])

    const removeTodolistHandler = () => {
        props.removeTodoList(props.id)
    }

    const addTask = useCallback((title: string) => {
        props.addTask(title, props.id)
    }, [props.addTask, props.id])

    const onChangeTitleItem = useCallback((title: string) => {
        props.changeTodolistTitle(title, props.id)
    }, [props.changeTodolistTitle, props.id])

    const onChangeAllItemsHandler = (e: ChangeEvent<HTMLInputElement>) => {
        props.selectAllItems(props.id, e.currentTarget.checked, props.tasksArray)
        console.log('onChangeAllItemsHandler')
    }

    let tasksForTodoList = props.tasks

    if (props.filter === "active") {
        tasksForTodoList = tasksForTodoList.filter((el: any) => {
            return el.isDone === false;
        })
    }

    if (props.filter === "completed") {
        tasksForTodoList = tasksForTodoList.filter((el: any) => {
            return el.isDone === true;
        })
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
            <li className={classes.allItems}>
                <input onChange={onChangeAllItemsHandler}
                       className={classes.allItemsInput}
                       type="checkbox" checked={props.allSelectItem}/>
            </li>
            <ul className={classes.todolistItemsWrapper}>
                {
                    tasksForTodoList.map((el) => <Task el={el} changeTaskStatus={props.changeTaskStatus} onCnangeListItemHandler={props.onCnangeListItemHandler} removeTask={props.removeTask} id={props.id} key={el.id}/>
                )
                }
            </ul>
            <div>
                <button className={props.filter === 'all' ? `active-filter` : classes.btnFilterClasses } onClick={onClickFilterHandlerAll}>All</button>
                <button className={props.filter === 'active' ? `active-filter` : classes.btnFilterClasses } onClick={onClickFilterHandlerActive}>Active</button>
                <button className={props.filter === 'completed' ? `active-filter` : classes.btnFilterClasses } onClick={onClickFilterHandlerComplited}>Completed</button>
            </div>
        </div>
    )
})

