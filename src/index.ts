import { state, addTodo, deleteTodo, todos } from './db';
import { todoForm, todosWrapper } from './elements';
import type { Todo } from './types';

// HANDLER FUNCTION
function handleSubmit(e: SubmitEvent) {
  e.preventDefault();
  const input = todoForm.elements[0] as HTMLInputElement;
  const title = input.value.trim();

  if (title) {
    const isEdit = state.currentTodoId;
    if (isEdit) {
      const todoIdx = todos.findIndex(todo => todo.id === state.currentTodoId);
      const todo = todos[todoIdx];
      todo.title = title;
      state.currentTodoId = null;

      updateTodo(todo, todoIdx);
    } else {
      const todo = addTodo(title);

      renderTodo(todo);
    }

    todoForm.reset();
  }
}

function handleDeleteTodo(todoId: number) {
  const deletedTodoIdx = deleteTodo(todoId);
  removeTodo(deletedTodoIdx);
}

function handleEditTodo(todo: Todo) {
  state.currentTodoId = todo.id;
  const todoInput = todoForm.elements[0] as HTMLInputElement;
  todoInput.value = todo.title;
}

// UI FUNCTION
function renderTodo(todo: Todo) {
  const todoElementElm = document.createElement('div');
  todoElementElm.className = 'flex w-full items-center justify-between border-b border-gray-200 py-2 dark:border-gray-700';

  const checkboxAndTitleWrapperElm = document.createElement('div');
  checkboxAndTitleWrapperElm.className = 'flex items-center gap-2';

  const checkboxElm = document.createElement('input');
  checkboxElm.setAttribute('type', 'checkbox');

  const titleElm = document.createElement('p');
  titleElm.id = 'title';
  titleElm.innerText = todo.title;

  checkboxAndTitleWrapperElm.append(checkboxElm, titleElm);

  const actionsWrapperElm = document.createElement('div');
  actionsWrapperElm.className = 'flex w-max items-center gap-2';

  const editBtnElm = document.createElement('button');
  editBtnElm.className = 'btn';
  editBtnElm.innerText = 'Edit';
  editBtnElm.addEventListener('click', () => handleEditTodo(todo));

  const deleteBtnElm = document.createElement('button');
  deleteBtnElm.className = 'btn bg-[red]';
  deleteBtnElm.innerText = 'Delete';
  deleteBtnElm.addEventListener('click', () => handleDeleteTodo(todo.id));

  actionsWrapperElm.append(editBtnElm, deleteBtnElm);

  todoElementElm.append(checkboxAndTitleWrapperElm, actionsWrapperElm);

  todosWrapper.append(todoElementElm);
}

function removeTodo(deletedTodoIdx: number) {
  const deletedTodoElm = todosWrapper.children[deletedTodoIdx];
  deletedTodoElm.remove();
}

function updateTodo(todo: Todo, todoIdx: number) {
  const todoElm = todosWrapper.children[todoIdx];
  const titleElm: HTMLParagraphElement = todoElm.querySelector('#title')!;
  titleElm.innerText = todo.title;
}

// LOGIC FUNCTION
function addListeners() {
  todoForm.addEventListener('submit', handleSubmit);
}

function init() {
  addListeners();
}

window.addEventListener('load', init);
