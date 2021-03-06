import React, {ChangeEvent} from "react"
import {EditableSpan} from "./EditableSpan";
import {IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {TaskStatuses} from "./api/todolists-api";

export const Task = (props: any) => {
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const status = e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New
        props.changeTaskStatus(props.el.id, status, props.id)
        console.log('onChangeHandler')
    }

    const onChangeListItem = (newValue: string) => {
        props.onCnangeListItemHandler(newValue, props.el.id, props.id)
    }

    return (
        <li key={props.el.id} className={props.el.status === TaskStatuses.Completed ? 'is-done' : ''}>
            <input
                onChange={onChangeHandler}
                type="checkbox" checked={props.el.status === TaskStatuses.Completed}/>
            <EditableSpan title={props.el.title} onChange={onChangeListItem}/>
            <IconButton disabled={props.status === "loading"} onClick={() => props.removeTask(props.el.id, props.id)} aria-label="delete">
                <Delete />
            </IconButton>
        </li>
    )
}

