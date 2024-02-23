import { useContext, useRef, useEffect } from "react";
import { QuestionsContext } from "./QuestionContextProvider";
export default function Answer({ answer }) {
  const { isAnswered, CheckAnswer, getAnswerValue, CleanButton } =
    useContext(QuestionsContext);
  const buttonColor = useRef();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isAnswered === false) {
        CleanButton(buttonColor);
      }
    }, 200);
    return () => {
      clearTimeout(timer);
    };
  }, [isAnswered]);

  return (
    <li className="answer">
      <button
        disabled={isAnswered ? true : false}
        ref={buttonColor}
        className={buttonColor}
        onClick={() => {
          CheckAnswer(answer, buttonColor);
          getAnswerValue(answer);
        }}
      >
        {answer}
      </button>
    </li>
  );
}
