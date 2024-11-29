import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todoList: Todo[];
  showTodoDetails: (value: number) => void;
};

export const TodoList: React.FC<Props> = ({ todoList, showTodoDetails }) => {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  useEffect(() => {
    if (selectedId !== null) {
      showTodoDetails(selectedId);
    }
  }, [selectedId, showTodoDetails]);

  const handleTodoSelection = (id: number) => {
    setSelectedId(prevSelectedId => (prevSelectedId === id ? null : id));
  };

  return (
    <table className="table is-narrow is-fullwidth">
      <thead>
        <tr>
          <th>#</th>
          <th>
            <span className="icon">
              <i className="fas fa-check" />
            </span>
          </th>
          <th>Title</th>
          <th> </th>
        </tr>
      </thead>
      <tbody>
        {todoList.map(todo => (
          <tr
            key={todo.id}
            data-cy="todo"
            className={classNames({
              'has-background-info-light': selectedId === todo.id,
            })}
          >
            <td className="is-vcentered">{todo.id}</td>
            <td className="is-vcentered">
              {todo.completed && (
                <span className="icon" data-cy="iconCompleted">
                  <i className="fas fa-check" />
                </span>
              )}
            </td>
            <td className="is-vcentered is-expanded">
              <p
                className={classNames(
                  todo.completed ? 'has-text-success' : 'has-text-danger',
                )}
              >
                {todo.title}
              </p>
            </td>
            <td className="has-text-right is-vcentered">
              <button
                data-cy="selectButton"
                className="button"
                type="button"
                onClick={() => handleTodoSelection(todo.id)}
              >
                <span className="icon">
                  <i
                    className={classNames('far', {
                      'fa-eye-slash': selectedId === todo.id,
                      'fa-eye': selectedId !== todo.id,
                    })}
                  />
                </span>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
