

import {addTasktAC, changeTaskStatusAC, changeTaskTitleAC, removeTasktAC, tasksReducer} from "./tasks-reducer";
import {addTodolistAC, removeTodolistAC} from "./todolists-reducer";

let startState: any;

beforeEach(() => {

    startState = {

        ["todolistId1"]: [
            {id: '1', title: "HTML&CSS", status: true},
            {id: '2', title: "JS", status: true},
            {id: '3', title: "React", status: false},
        ],
        ["todolistId2"]: [
            {id: '1', title: "Apples", status: false},
            {id: '2', title: "Oranges", status: false},
            {id: '3', title: "Bananas", status: true},
        ],

    }
})

test('correct task should be removed', () => {


    const endState = tasksReducer(startState, removeTasktAC( '3', "todolistId1"))

    expect(endState["todolistId1"].length).toBe(2);
    expect(endState["todolistId1"][endState["todolistId1"].length - 1].id).toBe('2');
});

test.skip('correct task should be added', () => {

    const endState = tasksReducer(startState, addTasktAC('4', "NewTask"))

    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(4);
    expect(endState["todolistId2"][0].id).toBeDefined();
    expect(endState["todolistId2"][0].title).toBe('NewTask');
    expect(endState["todolistId2"][0].status).toBe(false);
});

test('status of specified task should be changed', () => {

    const action = changeTaskStatusAC("2", false, "todolistId2");

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"][1].status).toBe(true);
    expect(endState["todolistId2"][1].status).toBe(false);

});
test('title of specified task should be changed', () => {

    const action = changeTaskTitleAC("2", 'New Title', "todolistId1");

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"][1].title).toBe('New Title');
    expect(endState["todolistId2"][1].title).toBe('Oranges');

});
test('new array should be added when new todolist is added', () => {

    const action = addTodolistAC("new todolist");

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState);
    const newKey = keys.find(k => k !== "todolistId1" && k !== "todolistId2");
    if (!newKey) {
        throw Error("new key should be added")
    }

    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([]);
});

test('property with todolistId should be deleted', () => {

    const action = removeTodolistAC("todolistId2");

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState["todolistId2"]).toBeUndefined();
});


