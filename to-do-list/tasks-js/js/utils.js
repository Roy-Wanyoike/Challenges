export const onAppLoad = (todosArr, displayContainer) => {
  window.addEventListener('load', () => {
    displayTodos(todosArr, displayContainer);
    if (todosArr.length === 0) {
      displayContainer.innerHTML = `<p class='todo-info'>No todos to display</p>`;
    }
  });
};

export const addTodo = (todo, todos) => {
  todos.push(todo);
};

export const displayTodos = (todosArr, displayContainer) => {
  displayContainer.innerHTML = '';

  todosArr.forEach(({ id, title, text, date, time, isComplete }) => {
    const todoArticle = `
          <article class='todo ${isComplete && 'done'}' data-id=${id}> 
              <h1 class='todo-title'>${title}</h1>
              <p class='todo-text'>${text}</p>  
              <p class='todo-date'>${date}</p>    
              <p class='todo-time'>${time}</p>  
              <i class='fa-solid fa-trash trash'></i>
          </article>
      `;
    displayContainer.innerHTML += todoArticle;
  });
};

export const saveTodosToLocalStorage = (todosArr) => {
  localStorage.setItem('todos', JSON.stringify(todosArr));
};

export const readTodosFromLocalStrorage = () => {
  const savedTodos = localStorage.getItem('todos');

  if (savedTodos) {
    return JSON.parse(savedTodos);
  }
};
