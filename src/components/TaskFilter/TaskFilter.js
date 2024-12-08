import React from 'react';
import PropTypes from 'prop-types';
import './TaskFilter.css';

const TaskFilter = ({ currentFilter = 'All', onFilterChange = () => {} }) => {
  return (
    <ul className="filters">
      <li>
        <button className={currentFilter === 'All' ? 'selected' : ''} onClick={() => onFilterChange('All')}>
          All
        </button>
      </li>
      <li>
        <button className={currentFilter === 'Active' ? 'selected' : ''} onClick={() => onFilterChange('Active')}>
          Active
        </button>
      </li>
      <li>
        <button className={currentFilter === 'Completed' ? 'selected' : ''} onClick={() => onFilterChange('Completed')}>
          Completed
        </button>
      </li>
    </ul>
  );
};

TaskFilter.propTypes = {
  currentFilter: PropTypes.string.isRequired,
  onFilterChange: PropTypes.func.isRequired,
};

export default TaskFilter;
