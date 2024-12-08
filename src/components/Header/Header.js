import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Header.css';

const Header = ({ onAddTask = () => {} }) => {
  const [inputValue, setInputValue] = useState('');

  const inputChange = (e) => {
    setInputValue(e.target.value);
  };

  const clickEnter = (e) => {
    e.preventDefault();
    if (inputValue.trim() !== '') {
      onAddTask(inputValue);
      setInputValue('');
    }
  };

  return (
    <header className="header">
      <h1>todos</h1>
      <form onSubmit={clickEnter}>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          autoFocus
          value={inputValue}
          onChange={inputChange}
        />
      </form>
    </header>
  );
};

Header.propTypes = {
  onAddTask: PropTypes.func.isRequired,
};

export default Header;
