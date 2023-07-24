import '../styles/Main.css';
import React, { useState, useRef, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { setUserId } from '../redux/result_reducer';

function Main() {
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef(null);
  const dispatch = useDispatch();

  const startQuiz = useCallback(() => {
    if (inputValue.trim() !== '') {
      dispatch(setUserId(inputValue.trim()));
    }
  }, [inputValue, dispatch]);

  const isLinkDisabled = useCallback(() => {
    return inputValue.trim() === '';
  }, [inputValue]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <div className="quiz-container">
      <h1 className="text-center">Quiz</h1>

      <form id="form">
        <input
          ref={inputRef}
          className="userid"
          type="text"
          placeholder="Username*"
          value={inputValue}
          onChange={handleInputChange}
        />
      </form>

      <Link
        className={`link-button ${isLinkDisabled() ? 'disabled-link' : ''}`}
        to="/quiz/home"
        onClick={startQuiz}
        disabled={isLinkDisabled()}>
        Start Quiz
      </Link>
    </div>
  );
}

export default Main;
