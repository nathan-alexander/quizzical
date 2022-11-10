import { useState, useEffect } from "react";
import Quiz from "./components/Quiz";
import "./App.css";

function App() {
  const [quizStarted, setQuizStarted] = useState(false);

  function startQuiz() {
    setQuizStarted(true);
  }
  return (
    <div className="App">
      {!quizStarted ? (
        <div className="welcome-page">
          <h1>Quizzical</h1>
          <p>The quiz game!</p>
          <button className="quiz-btn start-btn" onClick={startQuiz}>
            Start Quiz
          </button>
        </div>
      ) : (
        <div>
          <Quiz />
        </div>
      )}
    </div>
  );
}

export default App;
