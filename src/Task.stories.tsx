import React from "react";
import {action} from '@storybook/addon-actions'
import {Task} from "./Task";

export default {
    title: 'Task Component',
    component: Task
}

const changeTaskStatusCallback = action("statusChanged")
const onCnangeListItemHandlerCallback = action("handlerChanged")
const removeTaskCallback = action("taskRemoved")

export const TaskBaseExample = () => {
    return <>
        <Task el={{id: 1, isDone: true, title: "CSS"}}
              changeTaskStatus={changeTaskStatusCallback}
              onCnangeListItemHandler={onCnangeListItemHandlerCallback}
              removeTask={removeTaskCallback}
              id={"TodoListId1"}
        />
        <Task el={{id: 2, isDone: false, title: "JS"}}
              changeTaskStatus={changeTaskStatusCallback}
              onCnangeListItemHandler={onCnangeListItemHandlerCallback}
              removeTask={removeTaskCallback}
              id={"TodoListId1"}
        />
    </>
}
