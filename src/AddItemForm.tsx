import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button, TextField} from "@mui/material";

type AddItemFormPropsType = {
    addItem: (title: string) => void
    label: string
    disabled?: boolean
}

export const AddItemForm = React.memo((props: AddItemFormPropsType) => {
    console.log("AddItemForm")
    const [inputTaskValue, setInputTaskValue] = useState('')
    const [error, setError] = useState<string | null>(null)

    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newValue = (e.currentTarget.value.charAt(0).toUpperCase() + e.currentTarget.value.slice(1));
        setInputTaskValue(newValue)

    }

    const onKeyPressInputHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) {
            setError(null)
        }

        if (e.key === 'Enter' && inputTaskValue.trim() !== '' && inputTaskValue.trim()) {

            props.addItem(inputTaskValue.trim());
            setInputTaskValue('')
        }
    }

    const onClickButtonHandler = () => {
        if (inputTaskValue.trim() !== '') {
            props.addItem(inputTaskValue.trim());
        } else {
            setError('Title is required')
        }
        setInputTaskValue('')
    }

    return (
        <div >
            {error ?
                <TextField disabled={props.disabled} error id="outlined-error" label="Text is required" size={"small"} value={inputTaskValue}
                           onChange={onChangeInputHandler} onKeyPress={onKeyPressInputHandler} className={'error'}/>
                :
                <TextField disabled={props.disabled} id="outlined-basic" label={props.label} variant="outlined" size={"small"}
                           value={inputTaskValue} onChange={onChangeInputHandler} onKeyPress={onKeyPressInputHandler}
                           className={''}/>}

            <Button disabled={props.disabled} style={{
                maxWidth: '40px',
                maxHeight: '40px',
                minWidth: '40px',
                minHeight: '40px',
                backgroundColor: 'black'
            }} variant="contained" onClick={onClickButtonHandler}>+</Button>
        </div>
    )
})
