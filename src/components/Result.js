import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import { resetAllAction } from '../redux/question_reducer';
import { resetResultActions } from '../redux/result_reducer';

import { useDispatch } from 'react-redux';
function Result() {
  const [restartQuiz, setRestartQuiz] = useState(undefined);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function onRestart() {
    dispatch(resetAllAction);
    dispatch(resetResultActions);
    setRestartQuiz(1);
  }
  useEffect(() => {
    //console.log(restartQuiz);
    if (restartQuiz === 1) {
      navigate('/');
    }
  });
  return (
    <div className="quiz-container">
      <h1 className="text-center">Quiz Result</h1>

      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title">Result Count</h5>
          <p className="card-text">You scored 5 out of 5 correct answers.</p>
        </div>
      </div>

      <button type="button" onClick={onRestart}>
        Restart Quiz
      </button>
    </div>
  );
}

export default Result;
