import React, {useState} from 'react';
import './App.css';
import {tasksArr, TodoList} from "./TodoList";

export type FilterValueType = "all" | "complited" | "active"

function App() {

    let[tasks, setTasks] = useState<tasksArr[]>([
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "React", isDone: false},
        {id: 4, title: "Redux", isDone: false},
        {id: 5, title: "Angular", isDone: false}
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

    const removeTask = (id: number) => {
        let filteredTasks = tasks.filter(el => el.id !== id)
        setTasks(filteredTasks);
    }


    return (
        <div className="App">
            <TodoList title={"WHAT TO LEARN"} tasks={tasksForTodoList} removeTask={removeTask} filterTasks={filterTasks}/>
        </div>
    );
}

export default App;
