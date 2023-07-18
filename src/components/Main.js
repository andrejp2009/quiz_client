import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function Main() {
  const [name, setName] = useState('');

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Perform necessary logic on form submission
  };

  return (
    <div className="container">
      <h1 className="text-center">Quiz</h1>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nameInput">Enter your name:</label>
          <input
            type="text"
            className="form-control"
            id="nameInput"
            placeholder="Your Name"
            value={name}
            onChange={handleNameChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Start Quiz
        </button>
      </form>
    </div>
  );
}

export default Main;
