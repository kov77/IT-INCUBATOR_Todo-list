import React, {ChangeEvent, KeyboardEvent, useState} from "react";

type AddItemFormPropsType = {
    addTask: (title: string, todoListId: string) => void,
    id: string

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

            props.addTask(inputTaskValue.trim(), props.id);
            setInputTaskValue('')
        }
    }

    const onClickButtonHandler = () => {
        if (inputTaskValue.trim() !== '') {
            props.addTask(inputTaskValue.trim(), props.id);
        } else {
            setError('Title is required')
        }
        setInputTaskValue('')
    }

    return <div>
        <input value={inputTaskValue} onChange={onChangeInputHandler} onKeyPress={onKeyPressInputHandler}
               className={error ? 'error' : ''}/>
        <button onClick={onClickButtonHandler}>+</button>
        {error && <div className='error-message'>{error}</div>}
    </div>
}
