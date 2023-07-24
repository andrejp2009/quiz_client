import React from 'react';

function QuestionCounter({ currentQuestion, totalQuestions }) {
  // Function to add leading zero to a number if it's less than 10
  const addLeadingZero = (number) => (number > 9 ? number : `0${number}`);

  return (
    <div>
      <span className="active-question-no">{addLeadingZero(currentQuestion)}</span>
      <span className="total-question">/{addLeadingZero(totalQuestions)}</span>
    </div>
  );
}

export default QuestionCounter;
