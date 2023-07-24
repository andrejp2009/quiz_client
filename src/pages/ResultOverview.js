import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { usePublishResult } from '../hooks/setResult';
import { resetAllAction } from '../redux/question_reducer';
import { resetResultAction } from '../redux/result_reducer';
import { getRightAnswersCount, combineResultAndAnswers } from '../helpers/helper';

function ResultOverview() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userId = useSelector((state) => state.result.userId);
  const answers = useSelector((state) => state.questions.answers);
  const result = useSelector((state) => state.result.result);
  const questionGroup = useSelector((state) => state.result.questionGroup);

  const earnPoints = getRightAnswersCount(result, answers);
  const combinedResult = combineResultAndAnswers(result, answers);

  // Call the hook directly and pass the onComplete callback
  usePublishResult({
    result: combinedResult,
    username: userId,
    questionGroup: questionGroup,
    points: earnPoints,
    questionCount: answers.length,
  });

  function onRestart() {
    dispatch(resetAllAction());
    dispatch(resetResultAction());
    navigate('/');
  }

  function onClickAnswersReview() {
    navigate(`/result/review/${userId}`);
  }
  return (
    <div className="quiz-container">
      <h1 className="text-center">{`Quiz ${questionGroup}`}</h1>
      <h2 className="text-center">{`Username: ${userId}`}</h2>
      <h2 className="text-center">{`Result ${earnPoints}/${answers.length}`}</h2>
      <button className="button-container" onClick={onClickAnswersReview}>
        See Detailed
      </button>
      <Link className="link-button" to={'/'} onClick={onRestart}>
        Restart
      </Link>
    </div>
  );
}

export default ResultOverview;
