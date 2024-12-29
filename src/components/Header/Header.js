import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Header.css';

const Header = ({ onAddTask = () => {} }) => {
  const [inputValue, setInputValue] = useState('');
  const [inputValueMin, setInputValueMin] = useState('');
  const [inputValueSec, setInputValueSec] = useState('');

  const inputChange = (e) => {
    setInputValue(e.target.value);
  };

  const inputChangeMin = (e) => {
    setInputValueMin(e.target.value);
  };

  const inputChangeSec = (e) => {
    setInputValueSec(e.target.value);
  };

  const clickEnter = (e) => {
    e.preventDefault();
    if (inputValue.trim() && !isNaN(inputValueMin) && !isNaN(inputValueSec)) {
      onAddTask(inputValue.trim(), inputValueMin || 0, inputValueSec || 0);
      setInputValue('');
      setInputValueMin('');
      setInputValueSec('');
    }
  };

  return (
    <header className="header">
      <h1>todos</h1>
      <form className="new-todo-form" onSubmit={clickEnter}>
        <input className="new-todo" placeholder="Task" autoFocus value={inputValue} onChange={inputChange} />
        <input className="new-todo-form__timer" placeholder="Min" value={inputValueMin} onChange={inputChangeMin} />
        <input className="new-todo-form__timer" placeholder="Sec" value={inputValueSec} onChange={inputChangeSec} />
        <button type="submit" style={{ display: 'none' }}></button>
      </form>
    </header>
  );
};

Header.propTypes = {
  onAddTask: PropTypes.func.isRequired,
};

export default Header;
