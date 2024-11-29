import { Todo } from '../types/Todo';

const IS_ACTIVE = 'active';
const COMPLETED = 'completed';

export const filteringTodo = (
  todoList: Todo[] | null,
  filteringParams: string,
  selectFiltering: string = '',
): Todo[] => {
  const validFilteringParams = filteringParams.trim().toLowerCase();
  let filteredTodos: Todo[] = [];

  if (todoList) {
    if (selectFiltering === IS_ACTIVE) {
      filteredTodos = todoList.filter(todo => !todo.completed);
    } else if (selectFiltering === COMPLETED) {
      filteredTodos = todoList.filter(todo => todo.completed);
    } else {
      filteredTodos = [...todoList];
    }

    filteredTodos = filteredTodos.filter(todo =>
      todo.title.toLowerCase().includes(validFilteringParams),
    );
  }

  return filteredTodos;
};
