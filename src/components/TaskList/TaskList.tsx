import React from 'react';
import PropTypes from 'prop-types';
import Task from '../Task';
import styles from './TaskList.module.css';

interface TaskType {
  id: number;
  title: string;
  completed: boolean;
  created: Date;
}

interface TaskListProps {
  tasks: TaskType[];
  onDeleteTask: (id: number) => void;
  onTaskCompletion: (id: number) => void;
  onUpdateTask: (id: number, newTitle: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks = [], onDeleteTask, onTaskCompletion, onUpdateTask }) => {
  return (
    <ul className={styles.todo_list}>
      {tasks.map((task) => (
        <Task
          min={0}
          sec={0}
          key={task.id}
          {...task}
          onDelete={() => onDeleteTask(task.id)}
          onCompletion={() => onTaskCompletion(task.id)}
          onUpdate={(newTitle: string) => onUpdateTask(task.id, newTitle)}
        />
      ))}
    </ul>
  );
};

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
      created: PropTypes.instanceOf(Date).isRequired,
    })
  ).isRequired,
  onDeleteTask: PropTypes.func.isRequired,
  onTaskCompletion: PropTypes.func.isRequired,
  onUpdateTask: PropTypes.func.isRequired,
};

export default TaskList;
