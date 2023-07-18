import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function Result({ resultCount, answeredQuestions, handleRestartQuiz }) {
  return (
    <div className="container">
      <h1 className="text-center">Quiz Result</h1>

      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title">Result Count</h5>
          <p className="card-text">
            You scored {resultCount} out of {answeredQuestions.length} correct answers.
          </p>
        </div>
      </div>

      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title">Answered Questions</h5>
          <ul>
            {answeredQuestions.map((question, index) => (
              <li key={index}>{question}</li>
            ))}
          </ul>
        </div>
      </div>

      <button type="button" className="btn btn-primary" onClick={handleRestartQuiz}>
        Restart Quiz
      </button>
    </div>
  );
}

export default Result;
