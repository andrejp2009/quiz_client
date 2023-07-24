import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import AnswersReview from './AnswersReview';
import { resetAllAction } from '../redux/question_reducer';
import { resetResultAction } from '../redux/result_reducer';
import { usePublishResult } from '../hooks/setResult';
import { getRightAnswersCount, combineResultAndAnswers } from '../helpers/helper';

function Result() {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.result.userId);

  const answers = useSelector((state) => state.questions.answers);
  const result = useSelector((state) => state.result.result);
  const questionGroup = useSelector((state) => state.result.questionGroup);

  const earnPoints = getRightAnswersCount(result, answers);
  const combinedResult = combineResultAndAnswers(result, answers);

  // State to manage the completion of the post request
  const [postFinished, setPostFinished] = useState(false);

  // Function to handle the completion of the post request
  const onComplete = () => {
    setPostFinished(true);
    console.log('Post request completed');
  };

  // Call the hook directly and pass the onComplete callback
  usePublishResult(
    {
      result: combinedResult,
      username: userId,
      questionGroup: questionGroup,
      points: earnPoints,
      questionCount: answers.length,
    },
    onComplete,
  );

  function onRestart() {
    dispatch(resetAllAction());
    dispatch(resetResultAction());
  }

  return (
    <div className="quiz-container">
      {postFinished ? (
        // Render the AnswersReview component only when the post request is finished
        <AnswersReview />
      ) : (
        // Render a loading message while waiting for the post request to finish
        <div>Loading...</div>
      )}

      {postFinished && (
        // The button is shown only when the post request is finished
        <Link className="link-button" to={'/'} onClick={onRestart}>
          Restart
        </Link>
      )}
    </div>
  );
}

export default Result;
