import React, {useCallback} from 'react';
import './App.css';
import {TodoList} from "./TodoList";
import Header from "./Header";
import {AddItemForm} from "./AddItemForm";
import {Container, Grid, Paper} from "@mui/material";
import {todoListDomainType, FilterValueType} from "./state/todolists-reducer"
import {changeTaskStatusAC, tasksStateType} from "./state/tasks-reducer"

import {
    addTodolistAC,
    changeTodolistTitleAC,
    filterTasksAC,
    removeTodolistAC, selectAllItemsAC
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {TaskStatuses} from "./api/todolists-api";

function AppWithRedux() {

    let todolists = useSelector<AppRootStateType, todoListDomainType[]>(state => state.todolists)
    let tasks = useSelector<AppRootStateType, tasksStateType>(state => state.tasks)

    const dispatch = useDispatch()

    const removeTodoList = useCallback((todoListId: string) => {
        dispatch(removeTodolistAC(todoListId))
    }, [dispatch])

    const addTodolist = useCallback((title: string) => {
        dispatch(addTodolistAC(title))
    }, [dispatch])

    const filterTasks = useCallback((filter: FilterValueType, todoListId: string) => {
        dispatch(filterTasksAC(filter, todoListId))

    }, [dispatch])

    const changeTodolistTitle = useCallback((newValue: string, todolistId: string) => {
        dispatch(changeTodolistTitleAC(newValue, todolistId))
    }, [dispatch])


    const addTask = useCallback((title: string, todoListId: string) => {
        dispatch(addTaskAC(todoListId, title))
    }, [dispatch])

    const removeTask = useCallback((id: string, todoListId: string) => {

        dispatch(removeTaskAC(id, todoListId));
    }, [dispatch])

    const changeTaskStatus = useCallback((taskId: string, status: TaskStatuses, todoListId: string) => {
        dispatch(changeTaskStatusAC(taskId, status, todoListId))
    }, [dispatch])


    const onChangeListItemHandler = useCallback((newValue: string, id: string, todolistId: string) => {

        dispatch(changeTaskTitleAC(id, newValue, todolistId));

    }, [dispatch])

    const selectAllItems = useCallback((todolistID: string, isChecked: boolean, tasks) => {
        dispatch(selectAllItemsAC(isChecked, todolistID, tasks))
    }, [dispatch, selectAllItemsAC, tasks])


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

                            return <Grid key={el.id} item>
                                <Paper key={el.id} style={{padding: "10px"}}>
                                    <TodoList
                                        tasksArray = {tasks}
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
                                        onChangeListItemHandler={onChangeListItemHandler}
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
