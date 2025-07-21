// src/db.ts
var todos = [];
var state = {
  currentTodoId: null,
  currentStatus: null
};
function addTodo(title) {
  const todo = { id: Math.random(), title, status: "PENDING" };
  todos.push(todo);
}
function deleteTodo(todoId) {
  const deletedTodoIdx = todos.findIndex((todo) => todo.id === todoId);
  todos.splice(deletedTodoIdx, 1)[0];
}
function updateTodo(todoId, newTodo) {
  const idx = todos.findIndex((todo) => todo.id === todoId);
  const updatedTodo = todos[idx];
  updatedTodo.title = newTodo.title || updatedTodo.title;
  updatedTodo.status = newTodo.status || updatedTodo.status;
  state.currentTodoId = null;
}
function filterTodos(status) {
  const filteredTodos = todos.filter((todo) => todo.status === status);
  return filteredTodos;
}

// src/elements.ts
var todoForm = document.querySelector("#todo-form");
var todosWrapper = document.querySelector("#todos-wrapper");
var tabs = document.querySelectorAll(".tab");

// src/index.ts
function handleSubmit(e) {
  e.preventDefault();
  const input = todoForm.elements[0];
  const title = input.value.trim();
  if (!title)
    return;
  if (state.currentTodoId)
    updateTodo(state.currentTodoId, { title });
  else
    addTodo(title);
  todoForm.reset();
  renderTodos();
}
function handleDeleteTodo(todoId) {
  deleteTodo(todoId);
  renderTodos();
}
function handleEditTodo(todo) {
  state.currentTodoId = todo.id;
  const todoInput = todoForm.elements[0];
  todoInput.value = todo.title;
  renderTodos();
}
function handleTab(e) {
  tabs.forEach((tab) => tab.classList.remove("tabActive"));
  const tabBtn = e.target;
  tabBtn.classList.add("tabActive");
  const status = tabBtn.innerText.toUpperCase();
  state.currentStatus = status === "ALL" ? null : status;
  renderTodos();
}
function handleToggleComplete(todoId, status) {
  updateTodo(todoId, { status });
  renderTodos();
}
function renderTodos() {
  todosWrapper.innerHTML = "";
  const filteredTodos = state.currentStatus === null ? todos : filterTodos(state.currentStatus);
  for (const todo of filteredTodos) {
    const todoElementElm = document.createElement("div");
    todoElementElm.className = "flex w-full items-center justify-between border-b border-gray-200 py-2 dark:border-gray-700";
    const checkboxAndTitleWrapperElm = document.createElement("div");
    checkboxAndTitleWrapperElm.className = "flex items-center gap-2";
    const checkboxElm = document.createElement("input");
    checkboxElm.setAttribute("type", "checkbox");
    checkboxElm.checked = todo.status === "COMPLETED";
    checkboxElm.addEventListener("change", () => handleToggleComplete(todo.id, todo.status === "PENDING" ? "COMPLETED" : "PENDING"));
    const titleElm = document.createElement("p");
    titleElm.id = "title";
    titleElm.innerText = todo.title;
    checkboxAndTitleWrapperElm.append(checkboxElm, titleElm);
    const btnGroupsElm = document.createElement("div");
    btnGroupsElm.className = "flex w-max items-center gap-2";
    const editBtnElm = document.createElement("button");
    editBtnElm.className = "btn";
    editBtnElm.innerText = "Edit";
    editBtnElm.addEventListener("click", () => handleEditTodo(todo));
    const deleteBtnElm = document.createElement("button");
    deleteBtnElm.className = "btn bg-[red]";
    deleteBtnElm.innerText = "Delete";
    deleteBtnElm.disabled = todo.id === state.currentTodoId;
    deleteBtnElm.addEventListener("click", () => handleDeleteTodo(todo.id));
    btnGroupsElm.append(editBtnElm, deleteBtnElm);
    todoElementElm.append(checkboxAndTitleWrapperElm, btnGroupsElm);
    todosWrapper.append(todoElementElm);
  }
}
function addListeners() {
  todoForm.addEventListener("submit", handleSubmit);
  tabs.forEach((tab) => tab.addEventListener("click", handleTab));
}
function init() {
  addListeners();
}
window.addEventListener("load", init);
