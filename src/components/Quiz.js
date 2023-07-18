import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Questions from './Questions';
import 'bootstrap/dist/css/bootstrap.min.css';

/** redux store import */
import { useSelector } from 'react-redux';

import { MoveNextQuestion, MovePrevQuestion } from '../hooks/FetchQuestion';

function Quiz() {
  const [activeQuestion, setActiveQuestion] = useState(0);

  const { queue, trace } = useSelector((state) => state.questions);
  const dispatch = useDispatch();

  useEffect(() => {
    //console.log(trace);
  });
  const onClickNext = () => {
    if (trace < queue.length - 1) {
      //console.log('next question clicked');
      dispatch(MoveNextQuestion());
    }
  };
  const onClickPrev = () => {
    if (trace > 0) {
      //console.log('prev question clicked');
      dispatch(MovePrevQuestion());
    }
  };

  return (
    <div className="quiz-container">
      {/* <h1 className="title">Quiz Application</h1> */}
      {/* display questions*/}
      <Questions />
      <div className="next-prev-button">
        {trace > 0 ? <button onClick={onClickPrev}>Prev</button> : <div></div>}

        <button onClick={onClickNext}>{trace === queue.length - 1 ? 'Finish' : 'Next'}</button>
      </div>
    </div>
  );
}

export default Quiz;
