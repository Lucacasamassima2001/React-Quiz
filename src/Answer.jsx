import { useContext, useRef, useEffect } from "react";
import { QuestionsContext } from "./QuestionContextProvider";
export default function Answer({ answer, onChange }) {
  const { answeredQuestions, activeQuestion, correctAnswers } =
    useContext(QuestionsContext);
  const buttonColor = useRef();

  const checkifAnswerIsCorrect = (answer) => {
    if (answer === correctAnswers[activeQuestion].correctAnswer) {
      buttonColor.current.className = "correct";
    } else {
      buttonColor.current.className = "wrong";
    }
  };

  function cleanButtonColor() {
    buttonColor.current.className = "";
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      if (activeQuestion !== answeredQuestions.answered.length - 1) {
        cleanButtonColor();
      }
    }, 200);
    return () => {
      clearTimeout(timer);
    };
  });

  return (
    <li className="answer">
      <button
        ref={buttonColor}
        className={buttonColor}
        onClick={() => {
          checkifAnswerIsCorrect(answer);
          onChange(answer);
        }}
      >
        {answer}
      </button>
    </li>
  );
}
