import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button, TextField} from "@mui/material";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export function AddItemForm(props: AddItemFormPropsType) {
    const [inputTaskValue, setInputTaskValue] = useState('')
    const [error, setError] = useState<string | null>(null)

    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newValue = (e.currentTarget.value.charAt(0).toUpperCase() + e.currentTarget.value.slice(1));
        setInputTaskValue(newValue)

    }

    const onKeyPressInputHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)

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
        <div>
            <TextField id="outlined-basic" label="New task" variant="outlined" size={"small"} value={inputTaskValue} onChange={onChangeInputHandler} onKeyPress={onKeyPressInputHandler}
                       className={error ? 'error' : ''}/>

            <Button style={{maxWidth: '40px', maxHeight: '40px', minWidth: '40px', minHeight: '40px', backgroundColor: 'black'}}  variant="contained" onClick={onClickButtonHandler}>+</Button>
            {error && <div className='error-message'>{error}</div>}
        </div>
    )
}
