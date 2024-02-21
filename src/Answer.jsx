import { useContext, useRef, useEffect } from "react";
import { QuestionsContext } from "./QuestionContextProvider";
import questions from "./questions";
export default function Answer({ answer, onChange, TIMER }) {
  const { activeQuestion, correctAnswers, isAnswered } =
    useContext(QuestionsContext);
  const buttonColor = useRef();

  const checkifAnswerIsCorrect = (answer) => {
    if (answer === correctAnswers[activeQuestion].correctAnswer) {
      buttonColor.current.className = "correct";
    } else {
      buttonColor.current.className = "wrong";
    }
  };

  const checkifButtonIsSelected = (answer) => {
    if (answer) {
      buttonColor.current.className = "selected";
    }
  };

  function cleanButtonColor() {
    buttonColor.current.className = "";
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isAnswered === false) {
        cleanButtonColor();
      }
    }, 200);
    return () => {
      clearTimeout(timer);
    };
  }, [isAnswered]);

  return (
    <li className="answer">
      <button
        disabled={TIMER === 1000 ? true : false}
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
