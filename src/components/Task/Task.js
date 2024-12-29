import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { formatDistanceToNow } from 'date-fns';
import './Task.css';

const Task = ({
  title = '',
  min = 0,
  sec = 0,
  completed = false,
  created,
  onDelete = () => {},
  onCompletion = () => {},
  onUpdate = () => {},
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentTitle, setCurrentTitle] = useState(title);
  const [isRunning, setIsRunning] = useState(false);
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

  const handleTitleChange = (e) => {
    setCurrentTitle(e.target.value);
  };

  const handleBlur = () => {
    setIsEditing(false);
    onUpdate(currentTitle);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      setIsEditing(false);
      onUpdate(currentTitle);
    }
  };

  const handlePlayClick = () => {
    if (time.minutes > 0 || time.seconds > 0) {
      setIsRunning(true);
    }
  };

  const handlePauseClick = () => {
    setIsRunning(false);
  };

  return (
    <li className={`${completed ? 'completed' : ''} ${isEditing ? 'editing' : ''}`}>
      <div className="view">
        <input className="toggle" type="checkbox" checked={completed} onChange={onCompletion} />
        <label>
          <span className="title">{title}</span>
          <span className="description">
            <button className="icon icon-play" onClick={handlePlayClick}></button>
            <button className="icon icon-pause" onClick={handlePauseClick}></button>
            {String(time.minutes).padStart(2, '0')}:{String(time.seconds).padStart(2, '0')}
          </span>
          <span className="description">created {createdTime}</span>
        </label>
        <button className="icon icon-edit" onClick={handleEditClick}></button>
        <button className="icon icon-destroy" onClick={onDelete}></button>
      </div>
      {isEditing && (
        <input
          type="text"
          className="edit"
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
  onDelete: PropTypes.func.isRequired,
  onCompletion: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default Task;
