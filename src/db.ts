import type { State, Status, Todo, UpdateTodo } from './types';

export const todos: Todo[] = [];
export const state: State = { currentTodoId: null };

export function addTodo(title: string) {
  const todo: Todo = { id: Math.random(), title, status: 'PENDING' };
  todos.push(todo);

  return todo;
}

export function deleteTodo(todoId: number) {
  const deletedTodoIdx = todos.findIndex(todo => todo.id === todoId);
  todos.splice(deletedTodoIdx, 1)[0];

  return deletedTodoIdx;
}

export function updateTodo(todoId: number, newTodo: UpdateTodo) {
  const idx = todos.findIndex(todo => todo.id === todoId);
  const todo = todos[idx];

  todo.title = newTodo.title || todo.title;
  todo.status = newTodo.status || todo.status;
}

export function clearTodo() {
  todos.splice(0, todos.length);
}

export function filterTodos(status?: Status) {
  if (!status) return todos;

  const filteredTodos = todos.filter(todo => todo.status === status);
  return filteredTodos;
}
