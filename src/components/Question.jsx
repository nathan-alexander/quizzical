import { decodeHtml } from "../util";

function Question(props) {
  let answerElements = props.answers.map((answer, index) => {
    let styles = {
      backgroundColor: props.answerGiven === answer ? "#D6DBF5" : "transparent",
    };
    let endingStyles = {
      backgroundColor:
        answer === props.correctAnswer
          ? "#94D7A2"
          : answer === props.answerGiven
          ? "#F8BCBC"
          : "transparent",
      color:
        answer === props.correctAnswer
          ? ""
          : answer === props.answerGiven
          ? "gray"
          : "gray",
      border:
        answer === props.correctAnswer
          ? ""
          : answer === props.answerGiven
          ? "1px solid gray"
          : "1px solid gray",
    };

    return (
      <div
        key={index}
        style={!props.quizEnded ? styles : endingStyles}
        className="answer"
        onClick={() => props.answerQuestion(props.id, answer)}
      >
        {decodeHtml(answer)}
      </div>
    );
  });

  return (
    <div className="question-container">
      <div className="question">{props.question}</div>
      <div className="answer-container">{answerElements}</div>
    </div>
  );
}
export default Question;
