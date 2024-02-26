interface  Todo {
    id: number,
    todo: string,
    completed: boolean
};

const btnAddTodo = document.querySelector(".btn-todo") as HTMLButtonElement;
const btnDeleteAll = document.querySelector(".btn-delete-all") as HTMLButtonElement;
const frmTodo = document.querySelector(".add-todo") as HTMLFormElement;
const txtTodo = document.querySelector(".todo-item") as HTMLInputElement;
const todoList = document.querySelector(".todo-list") as HTMLLIElement;

const addTodo = (e: Event) => {
    e.preventDefault();

    const todo: Todo = {
        id: Date.now(),
        todo: txtTodo.value,
        completed: false
    };
    todos.push(todo);
    saveTodos();
    appendTodo(todo)

    txtTodo.value = "";
}

const todos: Todo[] = JSON.parse(localStorage.getItem('todos')|| '[]');
window.addEventListener('DOMContentLoaded', () => {
    todos.forEach(todo => appendTodo(todo));
});

const appendTodo = (todo: Todo) => {
    const newTodo = document.createElement('li');
    const todoChkBox = document.createElement('input');
    
    todoChkBox.type = "checkbox";
    todoChkBox.checked = todo.completed;

    todoChkBox.addEventListener('change', () =>{
        todo.completed = todoChkBox.checked;
        saveTodos();
    });
    
    newTodo.append(todo.todo, todoChkBox);
    todoList.prepend(newTodo)
}

const saveTodos = () => {
    localStorage.setItem('todos', JSON.stringify(todos))
}

frmTodo.addEventListener('submit', e => addTodo(e));

const deleteTodos = () => {
    todos.length = 0;
    saveTodos();
    todoList.innerHTML = ""
};

btnDeleteAll.onclick = () =>  deleteTodos();
