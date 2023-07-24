import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import QuestionCounter from './QuestionCounter';
import { useDispatch, useSelector } from 'react-redux';

/** Custom Hook */
import { useFetchQuestion } from '../hooks/FetchQuestion';
// import { UpdateResult } from '../hooks/setResult';
import { updateResultAction } from '../redux/result_reducer';

function Questions({ onChecked, onUnchecked, questionGroup }) {
  const [checked, setChecked] = useState(null);
  const [{ isLoading, serverError }] = useFetchQuestion(questionGroup);

  const questions = useSelector((state) => state.questions.queue[state.questions.trace]);
  const trace = useSelector((state) => state.questions.trace);
  const questionCount = useSelector((state) => state.questions.queue.length);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updateResultAction({ trace, checked }));

    if (onUnchecked === null) {
      setChecked(null);
    } else {
      setChecked(onUnchecked);
    }
  });

  const onAnswerSelected = (index) => {
    onChecked(index);
    setChecked(index);
    dispatch(updateResultAction({ trace, checked }));
  };

  if (isLoading) return <h3>Loading</h3>;
  if (isLoading) return <h3>{serverError || 'Unknown Error'}</h3>;

  return (
    <>
      <QuestionCounter currentQuestion={trace + 1} totalQuestions={questionCount} />
      <h2>{questions?.question}</h2>
      <ul key={questions?.id}>
        {questions?.options.map((answer, i) => (
          <li
            onClick={() => onAnswerSelected(i)}
            id={`q${i}-option`}
            key={i}
            className={checked === i ? 'selected-answer' : null}>
            {answer}
          </li>
        ))}
      </ul>
    </>
  );
}

export default Questions;
