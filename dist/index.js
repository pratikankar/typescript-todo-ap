"use strict";
;
const btnAddTodo = document.querySelector(".btn-todo");
const btnDeleteAll = document.querySelector(".btn-delete-all");
const frmTodo = document.querySelector(".add-todo");
const txtTodo = document.querySelector(".todo-item");
const todoList = document.querySelector(".todo-list");
const addTodo = (e) => {
    e.preventDefault();
    const todo = {
        id: Date.now(),
        todo: txtTodo.value,
        completed: false
    };
    todos.push(todo);
    saveTodos();
    appendTodo(todo);
    txtTodo.value = "";
};
const todos = JSON.parse(localStorage.getItem('todos') || '[]');
window.addEventListener('DOMContentLoaded', () => {
    todos.forEach(todo => appendTodo(todo));
});
const appendTodo = (todo) => {
    const newTodo = document.createElement('li');
    const todoChkBox = document.createElement('input');
    todoChkBox.type = "checkbox";
    todoChkBox.checked = todo.completed;
    todoChkBox.addEventListener('change', () => {
        todo.completed = todoChkBox.checked;
        saveTodos();
    });
    newTodo.append(todo.todo, todoChkBox);
    todoList.prepend(newTodo);
};
const saveTodos = () => {
    localStorage.setItem('todos', JSON.stringify(todos));
};
frmTodo.addEventListener('submit', e => addTodo(e));
const deleteTodos = () => {
    todos.length = 0;
    saveTodos();
    todoList.innerHTML = "";
};
btnDeleteAll.onclick = () => deleteTodos();
