import React from 'react';
import PropTypes from 'prop-types';

import Task from '../Task/Task';

import './TaskList.css';

const TaskList = ({ tasks = [], onDeleteTask = () => {}, onTaskCompletion = () => {}, onUpdateTask = () => {} }) => {
  return (
    <ul className="todo-list">
      {tasks.map((task) => (
        <Task
          key={task.id}
          {...task}
          onDelete={() => onDeleteTask(task.id)}
          onCompletion={() => onTaskCompletion(task.id)}
          onUpdate={(newDescription) => onUpdateTask(task.id, newDescription)}
        />
      ))}
    </ul>
  );
};

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      description: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
      created: PropTypes.instanceOf(Date).isRequired,
    })
  ).isRequired,
  onDeleteTask: PropTypes.func.isRequired,
  onTaskCompletion: PropTypes.func.isRequired,
  onUpdateTask: PropTypes.func.isRequired,
};

export default TaskList;
