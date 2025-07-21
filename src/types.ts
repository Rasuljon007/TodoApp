export type Status = 'PENDING' | 'COMPLETED';
export type Todo = {
  id: number;
  title: string;
  status: Status;
};
export type UpdateTodo = Partial<Pick<Todo, 'status' | 'title'>>;
export type State = {
  currentTodoId: number | null;
};
