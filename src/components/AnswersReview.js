import Accordion from 'react-bootstrap/Accordion';
import React, { useEffect, useState } from 'react';
import { getServerData } from '../helpers/helper';
import { useSelector } from 'react-redux';

function AnswersReview() {
  const userId = useSelector((state) => state.result.userId);
  const [resultData, setResultData] = useState(null);
  const [questionsData, setQuestionsData] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state

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
        <>
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
        </>
      )}
    </>
  );
}

export default AnswersReview;
