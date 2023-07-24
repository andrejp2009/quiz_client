import React, { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import Questions from './Questions';
import 'bootstrap/dist/css/bootstrap.min.css';

/** redux store import */
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { MoveNextQuestion, MovePrevQuestion } from '../hooks/FetchQuestion';
import { PushAnswer } from '../hooks/setResult';

function Quiz() {
  const [check, setChecked] = useState(null);
  const result = useSelector((state) => state.result.result);
  const userId = useSelector((state) => state.result.userId);
  const { queue, trace } = useSelector((state) => state.questions);

  const questionGroup = useLoaderData();
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [shouldRedirect, setShouldRedirect] = useState(false);

  useEffect(() => {
    if (result.length && result.length >= queue.length) {
      setShouldRedirect(true);
    }
  }, [result, queue.length]);

  useEffect(() => {
    if (shouldRedirect) {
      navigate(`/result/${userId}`);
    }
  }, [shouldRedirect, navigate, userId]);

  const onClickNext = () => {
    if (trace < queue.length) {
      dispatch(MoveNextQuestion());

      /**insert a new result into array */
      if (result.length <= trace) {
        dispatch(PushAnswer(check));
        setChecked(null);
      } else {
        setChecked(result[trace + 1]);
      }
    }
  };

  const onClickPrev = () => {
    if (trace > 0) {
      dispatch(MovePrevQuestion());
      setChecked(result[trace - 1]);
    }
  };

  function onChecked(check) {
    setChecked(check);
  }

  return (
    <div className="quiz-container">
      {/* display questions*/}
      <Questions onChecked={onChecked} onUnchecked={check} questionGroup={questionGroup} />
      <div className="next-prev-button">
        {trace > 0 ? (
          <button className="button-container" onClick={onClickPrev}>
            Prev
          </button>
        ) : (
          <div></div>
        )}

        <button
          className="button-container"
          onClick={onClickNext}
          disabled={check === null || typeof check === 'undefined'}>
          {trace === queue.length - 1 ? 'Finish' : 'Next'}
        </button>
      </div>
    </div>
  );
}

export default Quiz;

export function loader({ params }) {
  const questionGroup = params.questionGroup;
  return questionGroup;
}
