import React, {ChangeEvent, memo} from "react"
import {EditableSpan} from "./EditableSpan";
import {IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";

export const Task = (props: any) => {
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        props.changeTaskStatus(props.el.id, e.currentTarget.checked, props.id)
    }

    const onCnangeListItem = (newValue: string) => {
        props.onCnangeListItemHandler(newValue, props.el.id, props.id)
    }
    return (
        <li key={props.el.id} className={props.el.isDone ? 'is-done' : ''}>
            <input
                onChange={onChangeHandler}
                type="checkbox" checked={props.el.isDone}/>
            <EditableSpan title={props.el.title} onChange={onCnangeListItem}/>
            <IconButton onClick={() => props.removeTask(props.el.id, props.id)} aria-label="delete">
                <Delete />
            </IconButton>
        </li>

    )
}
