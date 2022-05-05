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

function AppWithReducer() {


    let todoListId1 = v1()
    let todoListId2 = v1()


    let [todoLists, dispatchToTodoLists] = useReducer(todolistsReducer,[
        {id: todoListId1, title: "What to learn", filter: "all", selectHandler: false},
        {id: todoListId2, title: "What to buy", filter: "all", selectHandler: false}
    ])

    let [tasksObj, dispatchToTasks] = useReducer(tasksReducer ,{

        [todoListId1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "React", isDone: false},
            {id: v1(), title: "Redux", isDone: false},
            {id: v1(), title: "Angular", isDone: false}
        ],
        [todoListId2]: [
            {id: v1(), title: "Apples", isDone: false},
            {id: v1(), title: "Oranges", isDone: false},
            {id: v1(), title: "Bananas", isDone: true},
        ],

    })

    const removeTodoList = (todoListId: string) => {
        dispatchToTodoLists(removeTodolistAC(todoListId))
        dispatchToTasks(removeTodolistAC(todoListId))
    }

    function addTodolist(title: string) {
        const action = addTodolistAC(title)
        dispatchToTodoLists(action)
        dispatchToTasks(action)
    }

    let filterTasks = (filter: FilterValueType, todoListId: string) => {
        dispatchToTodoLists(filterTasksAC(filter, todoListId))

    }

    function changeTodolistTitle(newValue: string, todolistId: string) {
        dispatchToTodoLists(changeTodolistTitleAC(newValue, todolistId))
    }


    function addTask(title: string, todoListId: string) {


        dispatchToTasks(addTasktAC(todoListId, title))
    }

    const removeTask = (id: string, todoListId: string) => {

        dispatchToTasks(removeTasktAC(id, todoListId));
    }

    const changeTaskStatus = (taskId: string, isDone: boolean, todoListId: string) => {
        dispatchToTasks(changeTaskStatusAC(taskId, isDone, todoListId))
    }



    function onCnangeListItemHandler(newValue: string, id: string, todolistId: string) {

        dispatchToTasks(changeTaskTitleAC(id ,newValue, todolistId));

    }

    function selectAllItems(todolistID: string, isChecked: boolean) {
        dispatchToTasks(selectAllItemsAC(isChecked, todolistID, tasksObj))
        dispatchToTodoLists(selectAllItemsAC(isChecked, todolistID, tasksObj))



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
                        todoLists.map((el: any) => {
                            let tasksForTodoList = tasksObj[el.id];

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

export default AppWithReducer;
