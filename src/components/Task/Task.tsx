import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { formatDistanceToNow } from 'date-fns';

import styles from './Task.module.css';

interface TaskProps {
  id: number;
  title: string;
  min: number;
  sec: number;
  completed: boolean;
  created: Date;
  isRunning: boolean; // добавлен пропс для состояния таймера
  onDelete: () => void;
  onCompletion: () => void;
  onUpdate: (newTitle: string) => void;
  onToggleRunning: () => void; // добавлен пропс для переключения таймера
}

const Task: React.FC<TaskProps> = ({
  id,
  title = '',
  min = 0,
  sec = 0,
  completed = false,
  created,
  isRunning,
  onDelete,
  onCompletion,
  onUpdate,
  onToggleRunning, // используем для переключения состояния таймера
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentTitle, setCurrentTitle] = useState(title);
  const [time, setTime] = useState({ minutes: min, seconds: sec });

  const createdTime = formatDistanceToNow(new Date(created), {
    addSuffix: true,
  });

  useEffect(() => {
    if (!isRunning) return;

    const timer = setInterval(() => {
      setTime((prevTime) => {
        const { minutes, seconds } = prevTime;
        if (seconds > 0) {
          return { minutes, seconds: seconds - 1 };
        }
        if (minutes > 0) {
          return { minutes: minutes - 1, seconds: 59 };
        }
        clearInterval(timer);
        return { minutes: 0, seconds: 0 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentTitle(e.target.value);
  };

  const handleBlur = () => {
    setIsEditing(false);
    onUpdate(currentTitle);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setIsEditing(false);
      onUpdate(currentTitle);
    }
  };

  const handlePlayClick = (): void => {
    if (time.minutes > 0 || time.seconds > 0) {
      onToggleRunning(); // вызываем для переключения таймера
    }
  };

  const handlePauseClick = (): void => {
    onToggleRunning(); // вызываем для переключения таймера
  };

  return (
    <li className={`${styles.li_item} ${completed ? styles.completed : ''} ${isEditing ? styles.editing : ''}`}>
      <div className={styles.view}>
        <input className={styles.toggle} type="checkbox" checked={completed} onChange={onCompletion} />
        <label>
          <span className={styles.title}>{title}</span>
          <span className={styles.description}>
            <button
              className={`${styles.icon} ${styles.icon_play}`}
              onClick={handlePlayClick}
              disabled={isRunning} // кнопка play отключена, если таймер работает
            ></button>
            <button
              className={`${styles.icon} ${styles.icon_pause}`}
              onClick={handlePauseClick}
              disabled={!isRunning} // кнопка pause отключена, если таймер не работает
            ></button>
            {String(time.minutes).padStart(2, '0')}:{String(time.seconds).padStart(2, '0')}
          </span>
          <span className={styles.description}>created {createdTime}</span>
        </label>
        <button className={`${styles.icon} ${styles.icon_edit}`} onClick={handleEditClick}></button>
        <button className={`${styles.icon} ${styles.icon_destroy}`} onClick={onDelete}></button>
      </div>
      {isEditing && (
        <input
          type="text"
          className={styles.edit}
          value={currentTitle}
          onChange={handleTitleChange}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          autoFocus
        />
      )}
    </li>
  );
};

Task.propTypes = {
  title: PropTypes.string.isRequired,
  min: PropTypes.number.isRequired,
  sec: PropTypes.number.isRequired,
  completed: PropTypes.bool.isRequired,
  created: PropTypes.instanceOf(Date).isRequired,
  isRunning: PropTypes.bool.isRequired, // добавлено для типа
  onDelete: PropTypes.func.isRequired,
  onCompletion: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onToggleRunning: PropTypes.func.isRequired, // добавлено для типа
};

export default Task;
