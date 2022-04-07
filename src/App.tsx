import React, {useState} from 'react';
import './App.css';
import {tasksArr, TodoList} from "./TodoList";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";

export type FilterValueType = "all" | "complited" | "active"

type todoListType = {
    id: string
    title: string
    filter: FilterValueType
}

function App() {

    let filterTasks = (filter: FilterValueType, todoListId: string) => {
        let todoList = todoLists.find(el => el.id === todoListId)
        if(todoList) {
            todoList.filter = filter
            setTodoLists([...todoLists])
        }

    }

    let todoListId1 = v1()
    let todoListId2 = v1()


    let [todoLists, setTodoLists] = useState<todoListType[]>([
        {id: todoListId1, title: "What to learn", filter: "active"},
        {id: todoListId2, title: "What to buy", filter: "complited"}
    ])

    let[tasksObj, setTasks] = useState({

        [todoListId1] : [
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "React", isDone: false},
        {id: v1(), title: "Redux", isDone: false},
        {id: v1(), title: "Angular", isDone: false}
    ],
        [todoListId2] : [
            {id: v1(), title: "Vodka", isDone: true},
            {id: v1(), title: "Condoms", isDone: true},
        ],

    })

    const removeTodoList = (todoListId: string) => {
        let newTodoLists = todoLists.filter((e) => e.id !== todoListId)
        setTodoLists([...newTodoLists])
        delete  tasksObj[todoListId]
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
            filter : "all"
        }

        setTodoLists([todoList, ...todoLists])

        setTasks({...tasksObj, [todoList.id]: []})
    }

    function onCnangeListItemHandler(newValue: string, id: string, todolistId: string) {
        let tempTask = tasksObj[todolistId].find(el => el.id === id)
        if(tempTask) {
            tempTask.title = newValue
        }
        setTasks({...tasksObj});

    }
    function changeTodolistTitle(newValue: string, todolistId: string) {
        const tempTodolist =  todoLists.find(el => el.id === todolistId)
        if(tempTodolist) {
            tempTodolist.title = newValue
        }
        setTodoLists([...todoLists])
    }




    return (

        <div className="App">
            <AddItemForm addItem={addTodolist}/>
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
                    return <TodoList
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
                        onCnangeListItemHandler = {onCnangeListItemHandler}
                        changeTodolistTitle = {changeTodolistTitle}
                    />
                })
            }
        </div>
    );
}

export default App;
