import React, { useState } from 'react';
import PropTypes from 'prop-types';

import styles from './Header.module.css';

interface HeaderProps {
  onAddTask: (title: string, min: number, sec: number) => void;
}

const Header: React.FC<HeaderProps> = ({ onAddTask }) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [inputValueMin, setInputValueMin] = useState<string>('');
  const [inputValueSec, setInputValueSec] = useState<string>('');

  const inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const inputChangeMin = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*$/.test(value) && +value >= 0) {
      setInputValueMin(value);
    }
  };

  const inputChangeSec = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*$/.test(value) && +value >= 0 && +value <= 59) {
      setInputValueSec(value);
    }
  };

  const clickEnter = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const minutes = parseInt(inputValueMin, 10) || 0;
    const seconds = parseInt(inputValueSec, 10) || 0;

    if (inputValue.trim() !== '' && (minutes > 0 || seconds > 0)) {
      onAddTask(inputValue, minutes, seconds);
      setInputValue('');
      setInputValueMin('');
      setInputValueSec('');
    }
  };

  return (
    <header className={styles.header}>
      <h1>todos</h1>
      <form className={styles.new_todo_form} onSubmit={clickEnter}>
        <input className={styles.new_todo} placeholder="Task" autoFocus value={inputValue} onChange={inputChange} />
        <input
          className={styles.new_todo_form__timer}
          placeholder="Min"
          value={inputValueMin}
          onChange={inputChangeMin}
          min="0"
        />
        <input
          className={styles.new_todo_form__timer}
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
