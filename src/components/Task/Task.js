import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { formatDistanceToNow } from 'date-fns';
import './Task.css';

const Task = ({ description, completed, created, onDelete, onCompletion, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentDescription, setCurrentDescription] = useState(description);

  const createdTime = formatDistanceToNow(new Date(created), {
    addSuffix: true,
  });

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleDescriptionChange = (e) => {
    setCurrentDescription(e.target.value);
  };

  const handleBlur = () => {
    setIsEditing(false);
    onUpdate(currentDescription);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      setIsEditing(false);
      onUpdate(currentDescription);
    }
  };

  return (
    <li className={`${completed ? 'completed' : ''} ${isEditing ? 'editing' : ''}`}>
      <div className="view">
        <input className="toggle" type="checkbox" checked={completed} onChange={onCompletion} />
        <label>
          <span className="description">{description}</span>
          <span className="created">created {createdTime}</span>
        </label>
        <button className="icon icon-edit" onClick={handleEditClick}></button>
        <button className="icon icon-destroy" onClick={onDelete}></button>
      </div>
      {isEditing && (
        <input
          type="text"
          className="edit"
          value={currentDescription}
          onChange={handleDescriptionChange}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          autoFocus
        />
      )}
    </li>
  );
};

Task.defaultProps = {
  description: '',
  completed: false,
  created: new Date(),
  onDelete: () => {},
  onCompletion: () => {},
  onUpdate: () => {},
};

Task.propTypes = {
  description: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  created: PropTypes.instanceOf(Date).isRequired,
  onDelete: PropTypes.func.isRequired,
  onCompletion: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default Task;
