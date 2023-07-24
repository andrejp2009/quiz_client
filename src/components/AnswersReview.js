import Accordion from 'react-bootstrap/Accordion';
import React, { useEffect, useState } from 'react';
import { getServerData } from '../helpers/helper';
import { useSelector } from 'react-redux';
import { getFetchResultByUserID } from '../hooks/setResult';
import { getFetchQuestionsResByGroup } from '../hooks/FetchQuestion';

function AnswersReview() {
  const userId = useSelector((state) => state.result.userId);
  const [resultData, setResultData] = useState(null);
  const [questionsData, setQuestionsData] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state

  function setRightWrongQuestion(questionAnswer, index) {
    // ... Same as before
  }

  useEffect(() => {
    getServerData(`${process.env.REACT_APP_SERVER_HOSTNAME}/api/result/${userId}`, (res) => {
      setResultData(res);
      console.log(res);

      if (res?.questionGroup) {
        getServerData(
          `${process.env.REACT_APP_SERVER_HOSTNAME}/api/questions/${res.questionGroup}`,
          (questionsRes) => {
            setQuestionsData(questionsRes);
            console.log(questionsRes);
            setLoading(false); // Set loading to false after fetching questions data
          },
        );
      } else {
        setLoading(false); // Set loading to false if questionGroup is not available
      }
    });
  }, [userId]);

  return (
    <>
      {loading ? (
        <div>Loading...</div> // Show loading message when data is being fetched
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
