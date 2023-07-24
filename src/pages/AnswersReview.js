import '../styles/AnswersReview.css';
import Accordion from 'react-bootstrap/Accordion';
import React, { useEffect, useState } from 'react';
import { getServerData } from '../helpers/helper';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { resetAllAction } from '../redux/question_reducer';
import { resetResultAction } from '../redux/result_reducer';

function AnswersReview() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userId = useSelector((state) => state.result.userId);
  const [resultData, setResultData] = useState(null);
  const [questionsData, setQuestionsData] = useState(null);
  const [loading, setLoading] = useState(true);

  function setRightWrongQuestion(questionAnswer, index) {
    if (questionAnswer.result === questionAnswer.answer && index === questionAnswer.result) {
      return 'right-answer';
    }
    if (questionAnswer.result !== questionAnswer.answer) {
      if (index === questionAnswer.answer) {
        return 'right-answer';
      }
      if (index === questionAnswer.result) {
        return 'wrong-answer';
      }
    }
  }
  function onRestart() {
    dispatch(resetAllAction());
    dispatch(resetResultAction());
    navigate('/');
  }

  useEffect(() => {
    getServerData(`${process.env.REACT_APP_SERVER_HOSTNAME}/api/result/${userId}`, (res) => {
      setResultData(res);

      if (res?.questionGroup) {
        getServerData(
          `${process.env.REACT_APP_SERVER_HOSTNAME}/api/questions/${res.questionGroup}`,
          (questionsRes) => {
            setQuestionsData(questionsRes);
            setLoading(false);
          },
        );
      } else {
        setLoading(false);
      }
    });
  }, [userId]);

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="quiz-container">
          <h1 className="text-center">{`Quiz ${resultData?.questionGroup}`}</h1>
          <h2 className="text-center">{`Username: ${userId}`}</h2>
          <h2 className="text-center">{`Result ${resultData?.points}/${resultData?.questionCount}`}</h2>
          <Accordion defaultActiveKey="0">
            {questionsData?.questions.map((item, i) => (
              <Accordion.Item eventKey={i} key={i}>
                <Accordion.Header>{item.question}</Accordion.Header>
                <Accordion.Body>
                  <ul key={i}>
                    {item.options.map((options, index) => (
                      <li
                        id={`q${i}-option-${index}`}
                        key={index}
                        className={setRightWrongQuestion(resultData?.result[i], index)}>
                        {options}
                      </li>
                    ))}
                  </ul>
                </Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>
          <Link className="link-button" to={'/'} onClick={onRestart}>
            Restart
          </Link>
        </div>
      )}
    </>
  );
}

export default AnswersReview;
