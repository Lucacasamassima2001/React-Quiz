import { useContext, useEffect } from "react";
import Answers from "./Answers";
import ProgressBar from "./ProgressBar";
import { QuestionsContext } from "./QuestionContextProvider";
let TIMER = 10000;

export default function Question() {
  const {
    questions,
    activeQuestion,
    getSkippedValue,
    isAnswered,
    setIsAnswered,
    setAnsweredQuestions,
    lastTry,
    setLastTry,
  } = useContext(QuestionsContext);

  useEffect(() => {
    if (!isAnswered && !lastTry) {
      const timeOut = setTimeout(() => {
        getSkippedValue();
        setAnsweredQuestions((prev) => {
          return {
            ...prev,
            activeQuestion: activeQuestion + 1,
          };
        });
      }, TIMER);
      return () => clearTimeout(timeOut);
    }

    if (isAnswered) {
      const timeOut = setTimeout(() => {
        setLastTry(true);
      }, 2000);
      return () => {
        setIsAnswered(false);
        clearTimeout(timeOut);
      };
    }

    if (lastTry) {
      const timeOut = setTimeout(() => {
        setAnsweredQuestions((prev) => {
          return {
            ...prev,
            activeQuestion: activeQuestion + 1,
          };
        });
      }, 2000);
      return () => {
        setLastTry(false);
        clearTimeout(timeOut);
      };
    }

    return () => {
      setLastTry(false);
      setIsAnswered(false);
      TIMER = 10000;
    };
  }, [TIMER, isAnswered, setIsAnswered, getSkippedValue, lastTry, setLastTry]);

  return (
    <div id="#question-overview">
      <div id="question">
        {<ProgressBar TIMER={TIMER} question={questions[activeQuestion]} />}
        <h2>{questions[activeQuestion].text}</h2>
        <Answers />
      </div>
      <div id="skip-action">
        <button
          disabled={isAnswered ? true : false}
          onClick={() => {
            getSkippedValue(),
              setAnsweredQuestions((prev) => {
                return {
                  ...prev,
                  activeQuestion: activeQuestion + 1,
                };
              });
          }}
        >
          Skip
        </button>
      </div>
    </div>
  );
}
