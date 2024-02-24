import { useContext, useRef, useEffect, useState } from "react";
import { QuestionsContext } from "./QuestionContextProvider";
export default function Answer({ answer }) {
  const {
    isAnswered,
    selectAnswer,
    getAnswerValue,
    CleanButton,
    lastTry,
    correctAnswers,
    activeQuestion,
  } = useContext(QuestionsContext);
  const buttonColor = useRef();
  const [selectedAnswer, setSelectedAnswer] = useState({
    selectAnswer: "",
    isCorrect: null,
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isAnswered === false) {
        CleanButton(buttonColor);
      }
      if (lastTry === true) {
        setSelectedAnswer({
          selectAnswer: "",
          isCorrect: null,
        });
      }
    }, 2000);
    return () => {
      clearTimeout(timer);
    };
  }, [isAnswered]);

  return (
    <li className="answer">
      <button
        disabled={isAnswered || lastTry ? true : false}
        ref={buttonColor}
        className={lastTry ? selectedAnswer.isCorrect : ""}
        onClick={() => {
          setSelectedAnswer({
            selectAnswer: answer,
            isCorrect:
              answer === correctAnswers[activeQuestion].correctAnswer
                ? "correct"
                : "wrong",
          });
          selectAnswer(answer, buttonColor);
          getAnswerValue(answer);
        }}
      >
        {answer}
      </button>
    </li>
  );
}
