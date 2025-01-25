import React from 'react';
import PropTypes from 'prop-types';
import Task from '../Task';
import styles from './TaskList.module.css';

interface TaskType {
  id: number;
  title: string;
  min: number;
  sec: number;
  completed: boolean;
  created: Date;
  isRunning: boolean; // Добавлено для состояния таймера
}

interface TaskListProps {
  tasks: TaskType[];
  onDeleteTask: (id: number) => void;
  onTaskCompletion: (id: number) => void;
  onUpdateTask: (id: number, newTitle: string) => void;
  onToggleTaskRunning: (id: number) => void; // Новый пропс
}

const TaskList: React.FC<TaskListProps> = ({
  tasks = [],
  onDeleteTask,
  onTaskCompletion,
  onUpdateTask,
  onToggleTaskRunning,
}) => {
  return (
    <ul className={styles.todo_list}>
      {tasks.map((task) => (
        <Task
          key={task.id}
          id={task.id}
          title={task.title}
          min={task.min}
          sec={task.sec}
          completed={task.completed}
          created={task.created}
          isRunning={task.isRunning} // Передаем состояние таймера
          onDelete={() => onDeleteTask(task.id)}
          onCompletion={() => onTaskCompletion(task.id)}
          onUpdate={(newTitle: string) => onUpdateTask(task.id, newTitle)}
          onToggleRunning={() => onToggleTaskRunning(task.id)} // Передаем функцию для переключения таймера
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
