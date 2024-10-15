import React, { useState, useMemo, useEffect } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos, USER_ID } from './api/todos';
import { Filter } from './types/Filter';
import { Header } from './components/Header/Header';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';
import cn from 'classnames';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [todosFromServer, setTodosFromServer] = useState<Todo[]>([]);
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [filter, setFilter] = useState<Filter>(Filter.ALL);

  const isError = useMemo(() => error, [error]);

  const isCompletedTodos = useMemo(() => {
    return todosFromServer.some(todo => todo.completed);
  }, [todosFromServer]);

  const activeTodosLeft = useMemo(() => {
    return todosFromServer.reduce((acc, todo) => {
      if (!todo.completed) {
        return acc + 1;
      }

      return acc;
    }, 0);
  }, [todosFromServer]);

  const displayedTodos = useMemo(() => {
    switch (filter) {
      case Filter.ALL:
        return todosFromServer;
      case Filter.Active:
        return todosFromServer.filter(todo => !todo.completed);
      case Filter.Completed:
        return todosFromServer.filter(todo => todo.completed);
      default:
        return todosFromServer;
    }
  }, [todosFromServer, filter]);

  useEffect(() => {
    setLoading(true);
    getTodos()
      .then(setTodosFromServer)
      .catch(() => {
        setError(true);
        setTimeout(() => {
          setError(false);
        }, 3000);
      })
      .finally(() => setLoading(false));
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp_Header">
          {!!displayedTodos.length && (
            <button
              type="button"
              className={cn('todoapp__toggle-all', {
                active:
                  todosFromServer.every(todo => todo.completed) &&
                  !!todosFromServer.length,
              })}
              data-cy="ToggleAllButton"
            />
          )}
          <Header />
        </header>
        {!loading && !!todosFromServer.length && (
          <TodoList displayedTodos={displayedTodos} />
        )}
        {!loading && !!todosFromServer.length && (
          <Footer
            filter={filter}
            setFilter={setFilter}
            activeTodosCount={activeTodosLeft}
            areThereCompletedTodos={isCompletedTodos}
          />
        )}
      </div>

      <div
        data-cy="ErrorNotification"
        className={cn(
          'notification',
          'is-danger',
          'is-light',
          'has-text-weight-normal',
          { hidden: !isError },
        )}
      >
        <button data-cy="HideErrorButton" type="button" className="delete" />
        {isError && 'Unable to load todos'}
      </div>
    </div>
  );
};
