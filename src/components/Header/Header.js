import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Header.css';

const Header = ({ onAddTask = () => {} }) => {
  const [inputValue, setInputValue] = useState('');
  const [inputValueMin, setInputValueMin] = useState('');
  const [inputValueSec, setInputValueSec] = useState('');

  // Обработчики ввода
  const inputChange = (e) => {
    setInputValue(e.target.value);
  };

  const inputChangeMin = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value) && value >= 0) {
      // Разрешаем только числа
      setInputValueMin(value);
    }
  };

  const inputChangeSec = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value) && value >= 0 && value <= 59) {
      // Проверяем диапазон от 0 до 59
      setInputValueSec(value);
    }
  };

  // Обработчик отправки формы
  const clickEnter = (e) => {
    e.preventDefault();
    const minutes = parseInt(inputValueMin, 10) || 0; // Преобразуем в число или 0
    const seconds = parseInt(inputValueSec, 10) || 0; // Преобразуем в число или 0

    if (inputValue.trim() !== '' && (minutes > 0 || seconds > 0)) {
      onAddTask(inputValue, minutes, seconds);
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
        <input
          className="new-todo-form__timer"
          placeholder="Min"
          value={inputValueMin}
          onChange={inputChangeMin}
          min="0"
        />
        <input
          className="new-todo-form__timer"
          placeholder="Sec"
          value={inputValueSec}
          onChange={inputChangeSec}
          min="0"
          max="59"
        />
        <button type="submit" style={{ display: 'none' }}></button>
      </form>
    </header>
  );
};

Header.propTypes = {
  onAddTask: PropTypes.func.isRequired,
};

export default Header;
