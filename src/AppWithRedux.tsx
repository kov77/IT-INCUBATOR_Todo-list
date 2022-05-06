import React, {useReducer, useState} from 'react';
import './App.css';
import {TodoList} from "./TodoList";
import {v1} from "uuid";
import Header from "./Header";
import {AddItemForm} from "./AddItemForm";
import {Container, Grid, Paper} from "@mui/material";
import {
    addTodolistAC,
    changeTodolistTitleAC,
    filterTasksAC,
    removeTodolistAC, selectAllItemsAC,
    todolistsReducer
} from "./state/todolists-reducer";
import {addTasktAC, changeTaskStatusAC, changeTaskTitleAC, removeTasktAC, tasksReducer} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";


export type FilterValueType = "all" | "completed" | "active"

export type todoListType = {
    id: string
    title: string
    filter: FilterValueType
    selectHandler: boolean
}

export type taskType = {
    id: string
    title: string
    isDone: boolean
}

export type tasksStateType = {
    [key: string]: taskType[]
}

function AppWithRedux () {

    let todoListId1 = v1()
    let todoListId2 = v1()

    let todolists = useSelector<AppRootStateType, todoListType[]>(state => state.todolists)
    let tasks = useSelector<AppRootStateType, tasksStateType>(state => state.tasks)

    const dispatch = useDispatch()

    const removeTodoList = (todoListId: string) => {
        dispatch(removeTodolistAC(todoListId))
    }

    function addTodolist(title: string) {
        const action = addTodolistAC(title)
        dispatch(action)
    }

    let filterTasks = (filter: FilterValueType, todoListId: string) => {
        dispatch(filterTasksAC(filter, todoListId))

    }

    function changeTodolistTitle(newValue: string, todolistId: string) {
        dispatch(changeTodolistTitleAC(newValue, todolistId))
    }


    function addTask(title: string, todoListId: string) {


        dispatch(addTasktAC(todoListId, title))
    }

    const removeTask = (id: string, todoListId: string) => {

        dispatch(removeTasktAC(id, todoListId));
    }

    const changeTaskStatus = (taskId: string, isDone: boolean, todoListId: string) => {
        dispatch(changeTaskStatusAC(taskId, isDone, todoListId))
    }



    function onCnangeListItemHandler(newValue: string, id: string, todolistId: string) {

        dispatch(changeTaskTitleAC(id ,newValue, todolistId));

    }

    function selectAllItems(todolistID: string, isChecked: boolean) {
        dispatch(selectAllItemsAC(isChecked, todolistID, tasks))



    }


    return (

        <div className="App">
            <Header/>
            <Container fixed>
                <Grid container style={{padding: "20px"}}>
                    <AddItemForm label={'New todolist'} addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {
                        todolists.map((el: any) => {
                            let tasksForTodoList = tasks[el.id];

                            if (el.filter === "active") {
                                tasksForTodoList = tasksForTodoList.filter((el: any) => {
                                    return el.isDone === false;
                                })
                            }

                            if (el.filter === "completed") {
                                tasksForTodoList = tasksForTodoList.filter((el: any) => {
                                    return el.isDone === true;
                                })
                            }
                            return <Grid item>
                               <Paper style={{padding: "10px"}}>
                                   <TodoList
                                       key={el.id}
                                       id={el.id}
                                       filter={el.filter}
                                       title={el.title}
                                       tasks={tasksForTodoList}
                                       changeTaskStatus={changeTaskStatus}
                                       removeTask={removeTask}
                                       filterTasks={filterTasks}
                                       addTask={addTask}
                                       removeTodoList={removeTodoList}
                                       onCnangeListItemHandler={onCnangeListItemHandler}
                                       changeTodolistTitle={changeTodolistTitle}
                                       selectAllItems={selectAllItems}
                                       allSelectItem={el.selectHandler}

                                   />
                               </Paper>
                            </Grid>
                        })
                    }
                </Grid>
            </Container>
        </div>

    );
}

export default AppWithRedux;
