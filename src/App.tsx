import React, {useState} from 'react';
import './App.css';
import {tasksArr, TodoList} from "./TodoList";
import {v1} from "uuid";

export type FilterValueType = "all" | "complited" | "active"

function App() {

    let[tasks, setTasks] = useState<tasksArr[]>([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "React", isDone: false},
        {id: v1(), title: "Redux", isDone: false},
        {id: v1(), title: "Angular", isDone: false}
    ]);

    let[filter, setFilter] = useState<FilterValueType>('all')

    let tasksForTodoList = tasks;

    if(filter === "active") {
        tasksForTodoList =  tasks.filter((el) => {
            return el.isDone === false;
        })
    }

    if(filter === "complited") {
        tasksForTodoList =  tasks.filter((el) => {
            return el.isDone === true;
        })
    }

    let filterTasks = (filter: FilterValueType) => {
        setFilter(filter)
    }

    function addTask(title: string) {
        let newTask = {id: v1(), title: title, isDone: false}
        let newTasks = [newTask, ...tasks]
        setTasks(newTasks)
    }

    const removeTask = (id: string ) => {
        let filteredTasks = tasks.filter(el => el.id !== id)
        setTasks(filteredTasks);
    }


    return (
        <div className="App">
            <TodoList title={"WHAT TO LEARN"} tasks={tasksForTodoList} removeTask={removeTask} filterTasks={filterTasks} addTask={addTask}/>
        </div>
    );
}

export default App;
