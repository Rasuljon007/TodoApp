import { state, addTodo, deleteTodo, todos, updateTodo, filterTodos } from './db';
import { tabs, todoForm, todosWrapper } from './elements';
import type { Status, Todo } from './types';

// HANDLER FUNCTION
function handleSubmit(e: SubmitEvent) {
  e.preventDefault();
  const input = todoForm.elements[0] as HTMLInputElement;
  const title = input.value.trim();

  if (!title) return;

  if (state.currentTodoId) updateTodo(state.currentTodoId, { title });
  else addTodo(title);

  todoForm.reset();
  renderTodos();
}

function handleDeleteTodo(todoId: number) {
  deleteTodo(todoId);
  renderTodos();
}

function handleEditTodo(todo: Todo) {
  state.currentTodoId = todo.id;
  const todoInput = todoForm.elements[0] as HTMLInputElement;
  todoInput.value = todo.title;

  renderTodos();
}

function handleTab(e: MouseEvent) {
  tabs.forEach(tab => tab.classList.remove('tabActive'));

  const tabBtn = e.target as HTMLButtonElement;
  tabBtn.classList.add('tabActive');

  const status = tabBtn.innerText.toUpperCase();
  state.currentStatus = status === 'ALL' ? null : (status as Status);
  renderTodos();
}

function handleToggleComplete(todoId: number, status: Status) {
  updateTodo(todoId, { status });
  renderTodos();
}

// UI FUNCTION
function renderTodos() {
  todosWrapper.innerHTML = '';
  const filteredTodos = state.currentStatus === null ? todos : filterTodos(state.currentStatus);
  for (const todo of filteredTodos) {
    const todoElementElm = document.createElement('div');
    todoElementElm.className = 'flex w-full items-center justify-between border-b border-gray-200 py-2 dark:border-gray-700';

    const checkboxAndTitleWrapperElm = document.createElement('div');
    checkboxAndTitleWrapperElm.className = 'flex items-center gap-2';

    const checkboxElm = document.createElement('input');
    checkboxElm.setAttribute('type', 'checkbox');
    checkboxElm.checked = todo.status === 'COMPLETED';
    checkboxElm.addEventListener('change', () => handleToggleComplete(todo.id, todo.status === 'PENDING' ? 'COMPLETED' : 'PENDING'));

    const titleElm = document.createElement('p');
    titleElm.id = 'title';
    titleElm.innerText = todo.title;

    checkboxAndTitleWrapperElm.append(checkboxElm, titleElm);

    const btnGroupsElm = document.createElement('div');
    btnGroupsElm.className = 'flex w-max items-center gap-2';

    const editBtnElm = document.createElement('button');
    editBtnElm.className = 'btn';
    editBtnElm.innerText = 'Edit';
    editBtnElm.addEventListener('click', () => handleEditTodo(todo));

    const deleteBtnElm = document.createElement('button');
    deleteBtnElm.className = 'btn bg-[red]';
    deleteBtnElm.innerText = 'Delete';
    deleteBtnElm.disabled = todo.id === state.currentTodoId;
    deleteBtnElm.addEventListener('click', () => handleDeleteTodo(todo.id));

    btnGroupsElm.append(editBtnElm, deleteBtnElm);

    todoElementElm.append(checkboxAndTitleWrapperElm, btnGroupsElm);

    todosWrapper.append(todoElementElm);
  }
}

// LOGIC FUNCTION
function addListeners() {
  todoForm.addEventListener('submit', handleSubmit);
  tabs.forEach(tab => tab.addEventListener('click', handleTab));
}

function init() {
  addListeners();
}

window.addEventListener('load', init);
