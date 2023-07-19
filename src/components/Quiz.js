import React, { useEffect, useState } from 'react';
import Questions from './Questions';
import 'bootstrap/dist/css/bootstrap.min.css';

/** redux store import */
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { MoveNextQuestion, MovePrevQuestion } from '../hooks/FetchQuestion';
import { PushAnswer } from '../hooks/setResult';

function Quiz() {
  const [check, setChecked] = useState(null);
  const result = useSelector((state) => state.result.result);
  const [activeQuestion, setActiveQuestion] = useState(0);

  const { queue, trace } = useSelector((state) => state.questions);
  const dispatch = useDispatch();

  useEffect(() => {
    //console.log('result.length ' + result.length);
  });
  const onClickNext = () => {
    if (trace < queue.length) {
      //console.log('next question clicked');
      dispatch(MoveNextQuestion());

      dispatch(PushAnswer(check));
      setChecked(null);
    }
  };
  const onClickPrev = () => {
    if (trace > 0) {
      //console.log('prev question clicked');
      dispatch(MovePrevQuestion());
    }
  };

  function onChecked(check) {
    //console.log(check);
    setChecked(check);
  }

  /** */
  if (result.length && result.length >= queue.length) {
    return <Navigate to="/result"></Navigate>;
  }

  return (
    <div className="quiz-container">
      {/* <h1 className="title">Quiz Application</h1> */}
      {/* display questions*/}
      <Questions onChecked={onChecked} onUnchecked={check} />
      <div className="next-prev-button">
        {trace > 0 ? <button onClick={onClickPrev}>Prev</button> : <div></div>}

        <button onClick={onClickNext} disabled={check === null}>
          {trace === queue.length - 1 ? 'Finish' : 'Next'}
        </button>
      </div>
    </div>
  );
}

export default Quiz;
