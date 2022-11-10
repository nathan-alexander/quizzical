import { useState, useEffect } from "react";
import uniqid from "uniqid";
import { decodeHtml, shuffle } from "../util";
import Question from "./Question";

function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [quizEnded, setQuizEnded] = useState(false);
  const [score, setScore] = useState(0);
  const [resetGame, setResetGame] = useState(false);
  useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=5&difficulty=medium")
      .then((res) => res.json())
      .then((data) =>
        setQuestions(
          data.results.map((q, index) => {
            let answersArray = q.incorrect_answers;
            answersArray.push(q.correct_answer);
            shuffle(answersArray);
            return {
              key: index,
              id: uniqid(),
              question: decodeHtml(q.question),
              correctAnswer: q.correct_answer,
              answers: answersArray,
              answered: false,
              correct: false,
              answerGiven: "",
            };
          })
        )
      );
  }, [resetGame]);

  function handleAnswerClick(id, answer) {
    setQuestions((prevState) =>
      prevState.map((question) => {
        if (question.id === id) {
          return {
            ...question,
            answered: true,
            correct: answer === question.correctAnswer,
            answerGiven: answer,
          };
        }
        return question;
      })
    );
  }

  function endQuiz() {
    for (let question of questions) {
      if (question.correct) {
        setScore((prevScore) => prevScore + 1);
      }
    }
    setQuizEnded(true);
  }

  function playAgain() {
    setScore(0);
    setQuizEnded(false);
    setResetGame((prevState) => !prevState);
  }

  let questionElements = questions.map((question) => (
    <Question
      {...question}
      answerQuestion={handleAnswerClick}
      quizEnded={quizEnded}
    />
  ));
  return (
    <div>
      {questionElements}
      <div className="game-control">
        {quizEnded && <p>You scored {score} out of 5</p>}
        {!quizEnded ? (
          <button className="quiz-btn" onClick={endQuiz}>
            Score Quiz
          </button>
        ) : (
          <button className="quiz-btn" onClick={playAgain}>
            Play Again
          </button>
        )}
      </div>
    </div>
  );
}

export default Quiz;
