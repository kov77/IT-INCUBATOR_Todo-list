import {v1} from 'uuid';
import {
    addTodolistAC,
    changeTodolistTitleAC,
    filterTasksAC,
    removeTodolistAC,
    todolistsReducer
} from "./todolists-reducer";
import {FilterValueType, todoListType} from "../App";

test.skip('correct todolist should be removed', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    const startState: Array<todoListType> = [
        {id: todolistId1, title: "What to learn", filter: "all", selectHandler: false},
        {id: todolistId2, title: "What to buy", filter: "all", selectHandler: false}
    ]

    const endState = todolistsReducer(startState, removeTodolistAC(todolistId1))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});

test.skip('correct todolist should be added', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let newTodolistTitle = "New Todolist";

    const startState: Array<todoListType> = [
        {id: todolistId1, title: "What to learn", filter: "all", selectHandler: false},
        {id: todolistId2, title: "What to buy", filter: "all", selectHandler: false}
    ]

    const endState = todolistsReducer(startState, addTodolistAC(newTodolistTitle))

    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe(newTodolistTitle);
});

test.skip('correct todolist should change its name', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let newTodolistTitle = "New Todolist";

    const startState: Array<todoListType> = [
        {id: todolistId1, title: "What to learn", filter: "all", selectHandler: false},
        {id: todolistId2, title: "What to buy", filter: "all", selectHandler: false}
    ]


    const endState = todolistsReducer(startState, changeTodolistTitleAC(newTodolistTitle, todolistId2));

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
});

test('correct filter of todolist should be changed', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let newFilter: FilterValueType = "completed";

    const startState: Array<todoListType> = [
        {id: todolistId1, title: "What to learn", filter: "all", selectHandler: false},
        {id: todolistId2, title: "What to buy", filter: "all", selectHandler: false}
    ]

    const endState = todolistsReducer(startState, filterTasksAC(newFilter, todolistId2));

    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilter);
});


