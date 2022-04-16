import React, {useState} from 'react';
import './App.css';
import {TodoList} from "./TodoList";
import {v1} from "uuid";
import Header from "./Header";
import {AddItemForm} from "./AddItemForm";
import {Container, Grid, Paper} from "@mui/material";


export type FilterValueType = "all" | "complited" | "active"

type todoListType = {
    id: string
    title: string
    filter: FilterValueType
    selectHandler: boolean
}

function App() {

    let filterTasks = (filter: FilterValueType, todoListId: string) => {
        let todoList = todoLists.find(el => el.id === todoListId)
        if (todoList) {
            todoList.filter = filter
            setTodoLists([...todoLists])
        }

    }

    let todoListId1 = v1()
    let todoListId2 = v1()


    let [todoLists, setTodoLists] = useState<todoListType[]>([
        {id: todoListId1, title: "What to learn", filter: "all", selectHandler: false},
        {id: todoListId2, title: "What to buy", filter: "all", selectHandler: false}
    ])

    let [tasksObj, setTasks] = useState({

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
        let newTodoLists = todoLists.filter((e) => e.id !== todoListId)
        setTodoLists([...newTodoLists])
        delete tasksObj[todoListId]
        setTasks({...tasksObj})
    }


    function addTask(title: string, todoListId: string) {
        let newTask = {id: v1(), title: title, isDone: false}
        let tasksArr = tasksObj[todoListId]
        let newTasks = [newTask, ...tasksArr]
        tasksObj[todoListId] = newTasks

        setTasks({...tasksObj})
    }

    const removeTask = (id: string, todoListId: string) => {
        let tasks = tasksObj[todoListId]
        let filteredTasks = tasks.filter(el => el.id !== id)
        tasksObj[todoListId] = filteredTasks
        setTasks({...tasksObj});
    }

    const changeTaskStatus = (taskId: string, isDone: boolean, todoListId: string) => {
        let task = tasksObj[todoListId].find(el => el.id === taskId)
        if (task) {
            task.isDone = isDone
            setTasks({...tasksObj})
        }
    }

    function addTodolist(title: string) {
        const todoList: todoListType = {
            id: v1(),
            title: title,
            filter: "all",
            selectHandler: false
        }

        setTodoLists([todoList, ...todoLists])

        setTasks({...tasksObj, [todoList.id]: []})
    }

    function onCnangeListItemHandler(newValue: string, id: string, todolistId: string) {
        let tempTask = tasksObj[todolistId].find(el => el.id === id)
        if (tempTask) {
            tempTask.title = newValue
        }
        setTasks({...tasksObj});

    }

    function changeTodolistTitle(newValue: string, todolistId: string) {
        const tempTodolist = todoLists.find(el => el.id === todolistId)
        if (tempTodolist) {
            tempTodolist.title = newValue
        }
        setTodoLists([...todoLists])
    }

    function selectAllItems(todolistID: string, isChecked: boolean) {
        let newTodolist = todoLists.find(el => el.id === todolistID)
        if (newTodolist) {
            newTodolist.selectHandler = isChecked
            if (newTodolist.selectHandler) {
                tasksObj[todolistID].map(el => {
                    el.isDone = true
                })
            } else if (newTodolist.selectHandler === false) {
                tasksObj[todolistID].map(el => {
                    el.isDone = false
                })
            }
            setTasks({...tasksObj})
        }
        setTodoLists([...todoLists])


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
                        todoLists.map(el => {
                            let tasksForTodoList = tasksObj[el.id];

                            if (el.filter === "active") {
                                tasksForTodoList = tasksForTodoList.filter((el) => {
                                    return el.isDone === false;
                                })
                            }

                            if (el.filter === "complited") {
                                tasksForTodoList = tasksForTodoList.filter((el) => {
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

export default App;
