import { useContext } from "react";
import { QuestionsContext } from "./QuestionContextProvider";
export default function Summary() {
  const { answeredQuestions, questions, restartQuiz } =
    useContext(QuestionsContext);
  const skippedArray = answeredQuestions.answered.filter(
    (answer) => answer.result === "skipped"
  );
  const wrongArray = answeredQuestions.answered.filter(
    (answer) => answer.result === "wrong"
  );
  const correctArray = answeredQuestions.answered.filter(
    (answer) => answer.result === "correct"
  );

  return (
    <div id="summary">
      <img src="/public/quiz-complete.png" alt="" />
      <h2>Quiz completed!</h2>
      <div id="summary-stats">
        <p>
          <span className="number">
            {((skippedArray.length / questions.length) * 100).toFixed(0)}%
          </span>
          <span className="text">Skipped Questions</span>
        </p>
        <p>
          <span className="number">
            {((wrongArray.length / questions.length) * 100).toFixed(0)}%
          </span>
          <span className="text">Wrong Questions</span>
        </p>
        <p>
          <span className="number">
            {((correctArray.length / questions.length) * 100).toFixed(0)}%
          </span>
          <span className="text">Correct Questions</span>
        </p>
      </div>
      <ol>
        {answeredQuestions.answered.map((answer, index) => (
          <li key={index}>
            <h3>{answer.questionId}</h3>
            <div className="question">{answer.question}</div>
            <div className={`user-answer ${answer.result}`}>
              {answer.answer}
            </div>
          </li>
        ))}
      </ol>
      <div className="start-quiz">
        <button onClick={restartQuiz}>Restart Quiz!</button>
      </div>
    </div>
  );
}
