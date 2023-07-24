import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import Select from 'react-select';
import { Link } from 'react-router-dom';
import { setUserId, setQuestionGroup } from '../redux/result_reducer';

function Main() {
  const [selectedOption, setSelectedOption] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef(null);
  const dispatch = useDispatch();

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
    if (inputValue.trim() !== '') {
      dispatch(setUserId(inputValue.trim()));
      dispatch(setQuestionGroup(selectedOption.value));
    }
  }, [inputValue, selectedOption, dispatch]);

  // Function to determine if the Link should be disabled
  const isLinkDisabled = useCallback(() => {
    return !selectedOption?.value || inputValue.trim() === '';
  }, [selectedOption, inputValue]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  useEffect(() => {
    const inputElement = inputRef.current;

    const handleKeyPress = (event) => {
      if (event.key === 'Enter' && !isLinkDisabled()) {
        event.preventDefault();
        startQuiz();
      }
    };

    inputElement.addEventListener('keypress', handleKeyPress);

    return () => {
      inputElement.removeEventListener('keypress', handleKeyPress);
    };
  }, [isLinkDisabled, startQuiz]);

  return (
    <div className="quiz-container">
      <h1 className="text-center">Quiz</h1>
      <Select
        value={selectedOption}
        onChange={setSelectedOption}
        options={options}
        styles={customStyles}
      />

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
        to={selectedOption ? `quiz/${selectedOption.value}` : '/'}
        onClick={startQuiz}
        disabled={isLinkDisabled()}>
        Start Quiz
      </Link>
    </div>
  );
}

export default Main;
