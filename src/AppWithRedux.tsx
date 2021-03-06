import React, {useCallback, useEffect} from 'react';
import './App.css';
import {TodoList} from "./TodoList";
import Header from "./Header";
import {AddItemForm} from "./AddItemForm";
import {Container, Grid, Paper} from "@mui/material";
import {Navigate, Route, Routes } from 'react-router-dom';

import LinearProgress from '@mui/material/LinearProgress';
import {
    todoListDomainType,
    FilterValueType,
    fetchTodosTC,
    addTodolistTC,
    changeTodolistTitleTC, removeTodolistTC
} from "./state/todolists-reducer"
import {addTaskTC, changeTaskStatusTC, changeTaskTitleTC, removeTaskTC, tasksStateType} from "./state/tasks-reducer"

import {
    filterTasksAC,
    selectAllItemsAC
} from "./state/todolists-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType, useAppSelector} from "./state/store";
import {TaskStatuses} from "./api/todolists-api";
import {ErrorSnackbar} from "./ErrorSnackbar";
import {Login} from "./utils/Login";

function AppWithRedux() {

    let todolists = useSelector<AppRootStateType, todoListDomainType[]>(state => state.todolists)
    let tasks = useSelector<AppRootStateType, tasksStateType>(state => state.tasks)

    const dispatch = useDispatch()

    const status = useAppSelector((state) => state.app.status )

    useEffect(() => {
        // @ts-ignore
        dispatch(fetchTodosTC())
    }, [dispatch])

    const removeTodoList = useCallback((todoListId: string) => {
        dispatch(removeTodolistTC(todoListId) as any)
    }, [dispatch])

    const addTodolist = useCallback((title: string) => {
        console.log('add todo')
        dispatch(addTodolistTC(title) as any)
    }, [dispatch])

    const filterTasks = useCallback((filter: FilterValueType, todoListId: string) => {
        dispatch(filterTasksAC(filter, todoListId))

    }, [dispatch])

    const changeTodolistTitle = useCallback((newValue: string, todolistId: string) => {
        dispatch(changeTodolistTitleTC(todolistId, newValue) as any)
    }, [dispatch])


    const addTask = useCallback((title: string, todoListId: string) => {
        dispatch(addTaskTC(todoListId, title) as any)
    }, [dispatch])

    const removeTask = useCallback((id: string, todoListId: string) => {
        dispatch(removeTaskTC(todoListId, id) as any);
    }, [dispatch])

    const changeTaskStatus = useCallback((taskId: string, status: TaskStatuses, todoListId: string) => {
        dispatch(changeTaskStatusTC(todoListId, taskId, status ) as any)
    }, [dispatch])


    const onChangeListItemHandler = useCallback((newValue: string, id: string, todolistId: string) => {

        dispatch(changeTaskTitleTC(id, newValue, todolistId) as any);

    }, [dispatch])

    const selectAllItems = useCallback((todolistID: string, isChecked: boolean, tasks) => {
        dispatch(selectAllItemsAC(isChecked, todolistID, tasks))
    }, [dispatch, selectAllItemsAC, tasks])


    return (
        <div className="App">
            <Header/>
            {status === "loading" && <LinearProgress style={{"width": "100%"}} color="secondary"/>}

            <Container fixed>
                <Routes>
                    <Route path={"/"} element={
                        <>
                            <Grid container style={{padding: "20px"}}>
                                <AddItemForm disabled={false} label={'New todolist'} addItem={addTodolist}/>
                            </Grid>
                            <Grid container spacing={3}>
                                {
                                    todolists.map((el: any) => {
                                        let tasksForTodoList = tasks[el.id];

                                        return <Grid key={el.id} item>
                                            <Paper key={el.id} style={{padding: "10px"}}>
                                                <TodoList
                                                    entityStatus={el.entityStatus}
                                                    status={status}
                                                    tasksArray={tasks}
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
                        </>
                    }/>
                    <Route path={"/login"} element={<Login/>}/>
                    <Route path={"/404"} element={<h1>404: PAGE NOT FOUND</h1>}/>
                    <Route path={"*"} element={<Navigate to="/404"/>} />
                </Routes>
            </Container>
            <ErrorSnackbar />
        </div>

    );
}

export default AppWithRedux;
