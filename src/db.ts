import type { State, Status, Todo, UpdateTodo } from './types';

export const todos: Todo[] = [];
export const state: State = {
  currentTodoId: null,
  currentStatus: null
};

export function addTodo(title: string) {
  const todo: Todo = { id: Math.random(), title, status: 'PENDING' };
  todos.push(todo);
}

export function deleteTodo(todoId: number) {
  const deletedTodoIdx = todos.findIndex(todo => todo.id === todoId);
  todos.splice(deletedTodoIdx, 1)[0];
}

export function updateTodo(todoId: number, newTodo: UpdateTodo) {
  const idx = todos.findIndex(todo => todo.id === todoId);
  const updatedTodo = todos[idx];

  updatedTodo.title = newTodo.title || updatedTodo.title;
  updatedTodo.status = newTodo.status || updatedTodo.status;

  state.currentTodoId = null;
}

export function clearTodo() {
  todos.splice(0, todos.length);
}

export function filterTodos(status: Status) {
  const filteredTodos = todos.filter(todo => todo.status === status);
  return filteredTodos;
}
