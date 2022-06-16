import React from "react";
import {action} from '@storybook/addon-actions'
import {Task} from "./Task";
import {TaskStatuses} from "./api/todolists-api";

export default {
    title: 'Task Component',
    component: Task
}

const changeTaskStatusCallback = action("statusChanged")
const onCnangeListItemHandlerCallback = action("handlerChanged")
const removeTaskCallback = action("taskRemoved")

export const TaskBaseExample = () => {
    return <>
        <Task el={{id: 1, status: TaskStatuses.New, title: "CSS"}}
              changeTaskStatus={changeTaskStatusCallback}
              onCnangeListItemHandler={onCnangeListItemHandlerCallback}
              removeTask={removeTaskCallback}
              id={"TodoListId1"}
        />
        <Task el={{id: 2, status: TaskStatuses.New, title: "JS"}}
              changeTaskStatus={changeTaskStatusCallback}
              onCnangeListItemHandler={onCnangeListItemHandlerCallback}
              removeTask={removeTaskCallback}
              id={"TodoListId1"}
        />
    </>
}
