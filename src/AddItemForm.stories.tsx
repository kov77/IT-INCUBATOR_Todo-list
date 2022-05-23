import {AddItemForm} from "./AddItemForm";
import React from "react";
import {action} from '@storybook/addon-actions'

export default {
    title: 'AddItemForm Component',
    component: AddItemForm
}

const callback = action("Bnt pressed inside the form")

export const AddItemFormBaseExample = () => {
    return <AddItemForm label={""} addItem={ callback}/>
}
