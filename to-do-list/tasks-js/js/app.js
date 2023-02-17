import {
  onAppLoad,
  addTodo,
  displayTodos,
  saveTodosToLocalStorage,
  readTodosFromLocalStrorage,
} from './utils.js';

// element selectors
const todoTitle = document.querySelector('.todo-title');
const todoInput = document.querySelector('.todo-input');
const todoDate = document.querySelector('.todo-date');
const todoTime = document.querySelector('.todo-time');
const todoForm = document.querySelector('.todo-form');
const todoContainer = document.querySelector('.todo-container');

// todos array from localstorage
let todos = readTodosFromLocalStrorage() || [];

// initialize app
onAppLoad(todos, todoContainer);

// handle form submit
const handleSubmit = (event) => {
  event.preventDefault();

  const todo = {
    id: new Date().getTime(),
    title: todoTitle.value,
    text: todoInput.value,
    date: todoDate.value,
    time: todoTime.value,
    isComplete: false,
  };

  if (todo) {
    addTodo(todo, todos);
    displayTodos(todos, todoContainer);
    saveTodosToLocalStorage(todos);
    todoForm.reset();
  }
};

// handle todo remove
const handleTodoRemove = (event) => {
  todos = todos.filter((todo) => todo.id !== Number(event.target.dataset.id));
  saveTodosToLocalStorage(todos);
  displayTodos(todos, todoContainer);

  if (todos.length === 0) {
    todoContainer.innerHTML = `<p class='todo-info'>No todos to display</p>`;
  }
};

// event listeners
todoForm.addEventListener('submit', handleSubmit);
todoContainer.addEventListener('click', handleTodoRemove);
