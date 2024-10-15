import React from 'react';
import { Filter } from '../../types/Filter';

interface Props {
  filter: Filter;
  setFilter: (filter: Filter) => void;
  activeTodosCount: number;
  areThereCompletedTodos: boolean;
}

export const Footer: React.FC<Props> = ({
  filter,
  setFilter,
  activeTodosCount,
  areThereCompletedTodos,
}) => {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {activeTodosCount} items left
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={`filter__link ${filter === Filter.ALL ? 'selected' : ''}`}
          data-cy="FilterLinkAll"
          onClick={() => setFilter(Filter.ALL)}
        >
          All
        </a>

        <a
          href="#/active"
          className={`filter__link ${filter === Filter.Active ? 'selected' : ''}`}
          data-cy="FilterLinkActive"
          onClick={() => setFilter(Filter.Active)}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={`filter__link ${filter === Filter.Completed ? 'selected' : ''}`}
          data-cy="FilterLinkCompleted"
          onClick={() => setFilter(Filter.Completed)}
        >
          Completed
        </a>
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={!areThereCompletedTodos}
      >
        Clear completed
      </button>
    </footer>
  );
};
