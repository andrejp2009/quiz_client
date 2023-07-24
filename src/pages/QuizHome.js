import '../styles/QuizHome.css';
import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import Select from 'react-select';
import { useNavigate } from 'react-router-dom';
import { setQuestionGroup } from '../redux/result_reducer';
import { resetAllAction } from '../redux/question_reducer';
import { resetResultAction } from '../redux/result_reducer';

function QuizHome() {
  const [selectedOption, setSelectedOption] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const options = [
    { value: 'Programming', label: 'Programming' },
    { value: 'Science', label: 'Science' },
    { value: 'World', label: 'World' },
  ];

  const customStyles = {
    control: (provided) => ({
      ...provided,
      borderRadius: '16px',
      fontSize: '16px',
      width: '100%',
    }),
    option: (provided) => ({
      ...provided,
      fontSize: '16px',
    }),
  };

  const startQuiz = useCallback(() => {
    dispatch(setQuestionGroup(selectedOption.value));
    navigate(`/quiz/${selectedOption.value}`);
  }, [selectedOption, dispatch, navigate]);

  // Function to prevent default behavior and navigate in the startQuiz function
  const handleStartQuizClick = (event) => {
    event.preventDefault();
    startQuiz();
  };

  // Function to determine if the Button should be disabled
  const isButtonDisabled = useCallback(() => {
    return !selectedOption?.value;
  }, [selectedOption]);

  function onRestart() {
    dispatch(resetAllAction());
    dispatch(resetResultAction());
  }

  return (
    <div className="quiz-container">
      <h1 className="text-center">Welcome to the Quiz!</h1>
      <p>Click the button below to start the quiz:</p>
      <Select
        value={selectedOption}
        onChange={setSelectedOption}
        options={options}
        styles={customStyles}
      />
      <button
        className={`button-container ${isButtonDisabled() ? 'disabled-link' : ''}`}
        onClick={handleStartQuizClick}
        disabled={isButtonDisabled()}>
        Start Quiz
      </button>
      <button className="button-container" onClick={onRestart}>
        Change User Name
      </button>
      {/* <button className="button-container">See Results</button> */}
    </div>
  );
}

export default QuizHome;
