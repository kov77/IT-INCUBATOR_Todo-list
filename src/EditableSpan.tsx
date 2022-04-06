import React, {ChangeEvent, KeyboardEvent, useState} from "react";

type EditableSpanPropsType = {
    title: string
    onChange: (newValue: string) => void
}

export function EditableSpan(props: EditableSpanPropsType) {

    let[EditMode, SetEditMode] = useState(false)
    let[title, setTitle] = useState('')

    const onDoubleClickHandler = () => {
        SetEditMode(true)
        setTitle(props.title)
    }
    const onBlurEventHandler = () => {
        SetEditMode(false)
        props.onChange(title)
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if(e.key === 'Enter') {
            SetEditMode(false)
            props.onChange(title)
        }
    }

    return EditMode ? <input onChange={onChangeHandler} onKeyPress={onKeyPressHandler} onBlur={onBlurEventHandler} value={title} autoFocus></input> : <span onDoubleClick={onDoubleClickHandler}>{props.title}</span>
}
