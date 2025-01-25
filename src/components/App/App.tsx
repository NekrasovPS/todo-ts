import React, { useState, useEffect } from 'react';

import Header from '../Header/Header';
import TaskList from '../TaskList/TaskList';
import Footer from '../Footer/Footer';

import styles from './App.module.css';

interface Task {
  id: number;
  title: string;
  min: number;
  sec: number;
  completed: boolean;
  created: Date;
  isRunning: boolean;
}

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<'All' | 'Active' | 'Completed'>('All');

  useEffect(() => {
    const interval = setInterval(() => {
      setTasks((prevTasks) =>
        prevTasks.map((task) => {
          if (task.isRunning && (task.min > 0 || task.sec > 0)) {
            const newSec = task.sec - 1;
            const newMin = task.min + Math.floor(newSec / 60);
            return {
              ...task,
              min: newMin,
              sec: (newSec + 60) % 60,
            };
          }
          return task;
        })
      );
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const addTask = (title: string, min: number, sec: number) => {
    const newTask: Task = {
      id: Date.now(),
      title,
      min,
      sec,
      completed: false,
      created: new Date(),
      isRunning: false,
    };
    setTasks([...tasks, newTask]);
  };

  const deleteTask = (id: number): void => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  };

  const deletedAllTask = (): void => {
    setTasks([]);
  };

  const toggleTaskRunning = (id: number): void => {
    setTasks((prevTasks) => prevTasks.map((task) => (task.id === id ? { ...task, isRunning: !task.isRunning } : task)));
  };

  const taskCompletion = (id: number): void => {
    const updatedTasks = tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task));
    setTasks(updatedTasks);
  };

  const updateTaskTitle = (id: number, newTitle: string): void => {
    const updatedTasks = tasks.map((task) => (task.id === id ? { ...task, title: newTitle } : task));
    setTasks(updatedTasks);
  };

  const getFilteredTasks = (): Task[] => {
    switch (filter) {
      case 'Active':
        return tasks.filter((task) => !task.completed);
      case 'Completed':
        return tasks.filter((task) => task.completed);
      default:
        return tasks;
    }
  };

  return (
    <section className={styles.todo_app}>
      <Header onAddTask={addTask} />
      <section className={styles.main}>
        <TaskList
          onDeleteTask={deleteTask}
          onTaskCompletion={taskCompletion}
          onUpdateTask={updateTaskTitle}
          onToggleTaskRunning={toggleTaskRunning}
          tasks={getFilteredTasks()}
        />
        <Footer
          onDeletedAllTask={deletedAllTask}
          currentFilter={filter}
          onFilterChange={setFilter}
          tasksLeft={tasks.filter((task) => !task.completed).length}
        />
      </section>
    </section>
  );
};

export default App;
