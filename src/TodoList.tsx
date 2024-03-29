import React, {useCallback, useEffect} from "react";

import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import classes from './Todolist.module.css'
import {IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {Task} from "./Task";
import {FilterValueType} from "./state/todolists-reducer";
import {TaskStatuses, taskType} from "./api/todolists-api";
import {useDispatch} from "react-redux";
import { fetchTaskTC } from "./state/tasks-reducer";
import {RequestStatusType} from "./state/app-reducer";

type PropsType = {
    tasksArray: any
    tasks: taskType[],
    title: string,
    removeTask: (id: string, todoListId: string) => void,
    filterTasks: (value: FilterValueType, filterId: string) => void
    addTask: (title: string, todoListId: string) => void
    changeTaskStatus: (taskId: string, status: TaskStatuses, todoListId: string) => void
    filter: FilterValueType
    id: string
    removeTodoList: (todoListId: string) => void
    onChangeListItemHandler: (newValue: string, id: string, todolistId: string) => void
    changeTodolistTitle: (title :string, id: string) => void
    status: RequestStatusType
    entityStatus: RequestStatusType | string

}


export const TodoList = React.memo((props: PropsType) => {
    const onClickFilterHandlerAll = useCallback(() => props.filterTasks('all', props.id), [props.filterTasks, props.id])
    const onClickFilterHandlerActive = useCallback(() => props.filterTasks('active', props.id), [props.filterTasks, props.id])
    const onClickFilterHandlerComplited = useCallback(() => props.filterTasks( 'completed', props.id), [props.filterTasks, props.id])

    const dispatch = useDispatch()
    useEffect(() => {
        // @ts-ignore
        dispatch(fetchTaskTC(props.id))

    }, [])

    const removeTodolistHandler = () => {
        props.removeTodoList(props.id)
    }

    const addTask = useCallback((title: string) => {
        props.addTask(title, props.id)
    }, [props.addTask, props.id])

    const onChangeTitleItem = useCallback((title: string) => {
        props.changeTodolistTitle(title, props.id)
    }, [props.changeTodolistTitle, props.id])

    let tasksForTodoList = props.tasks


    if (props.filter === "active") {
        tasksForTodoList = tasksForTodoList.filter((el: any) => {
            return el.status === TaskStatuses.New
        })
    }

    if (props.filter === "completed") {
        tasksForTodoList = tasksForTodoList.filter((el: any) => {
            return el.status === TaskStatuses.Completed;
        })
    }

    return (
        <div className={classes.todolistClass}>
            <h3 className={classes.todolistHeader}>{<EditableSpan title={props.title} onChange={onChangeTitleItem}/>
            }
                <IconButton disabled={props.entityStatus === 'loading'} className={classes.todolistXBtn} onClick={removeTodolistHandler} aria-label="delete">
                    <Delete />
                </IconButton>
            </h3>
            <AddItemForm disabled={props.entityStatus === 'loading'} label={'New task'} addItem={addTask}/>
            <ul className={classes.todolistItemsWrapper}>
                {
                    tasksForTodoList.map((el) => <Task el={el}
                                                       status={props.status}
                                                       changeTaskStatus={props.changeTaskStatus}
                                                       onCnangeListItemHandler={props.onChangeListItemHandler}
                                                       removeTask={props.removeTask}
                                                       id={props.id}
                                                       key={el.id}/>
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

