import React from 'react';

import TaskFilter from '../TaskFilter/TaskFilter';

import './Footer.css';

const Footer = ({ onDeletedAllTask, currentFilter, onFilterChange, tasksLeft }) => {
  return (
    <footer className="footer">
      <span className="todo-count">{tasksLeft} items left</span>{' '}
      <TaskFilter currentFilter={currentFilter} onFilterChange={onFilterChange} />
      <button className="clear-completed" onClick={onDeletedAllTask}>
        Clear completed
      </button>
    </footer>
  );
};

export default Footer;
