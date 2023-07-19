import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import { useSelector } from 'react-redux';

/** Custom Hook */
import { useFetchQuestion } from '../hooks/FetchQuestion';

function Questions({ onChecked, onUnchecked }) {
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
  const [{ isLoading, apiData, serverError }, setGetData] = useFetchQuestion();

  const questions = useSelector((state) => state.questions.queue[state.questions.trace]);
  const trace = useSelector((state) => state.questions.trace);
  const questionCount = useSelector((state) => state.questions.queue.length);

  const addLeadingZero = (number) => (number > 9 ? number : `0${number}`);

  useEffect(() => {
    if (onUnchecked === null) {
      setSelectedAnswerIndex(null);
    }
    // console.log();
  });

  const onAnswerSelected = (index) => {
    setSelectedAnswerIndex(index);
    onChecked(index);
  };

  if (isLoading) return <h3>Loading</h3>;
  if (isLoading) return <h3>{serverError || 'Unknown Error'}</h3>;

  return (
    <div>
      <div>
        <span className="active-question-no">{addLeadingZero(trace + 1)}</span>
        <span className="total-question">/{addLeadingZero(questionCount)}</span>
      </div>
      <h2>{questions?.question}</h2>
      <ul key={questions?.id}>
        {questions?.options.map((answer, i) => (
          <li
            onClick={() => onAnswerSelected(i)}
            id={`q${i}-option`}
            key={i}
            className={selectedAnswerIndex === i ? 'selected-answer' : null}>
            {answer}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Questions;
