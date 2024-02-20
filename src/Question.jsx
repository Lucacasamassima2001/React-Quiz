import { useContext, useEffect, useState } from "react";
import Answers from "./Answers";
import ProgressBar from "./ProgressBar";
import { QuestionsContext } from "./QuestionContextProvider";

export default function Question() {
  const {
    questions,
    activeQuestion,
    getAnswerValue,
    getSkippedValue,
    isAnswered,
    setIsAnswered,
  } = useContext(QuestionsContext);

  let TIMER = 5000;

  useEffect(() => {
    const timeOut = setTimeout(() => {
      if (isAnswered === false) {
        getSkippedValue();
        TIMER = 2000;
      }
    }, TIMER);

    return () => {
      clearTimeout(timeOut);
      setIsAnswered(false);
    };
  }, [activeQuestion, getSkippedValue, isAnswered, setIsAnswered]);

  return (
    <div id="#question-overview">
      <div id="question">
        {<ProgressBar TIMER={TIMER} />}
        <h2>{questions[activeQuestion].text}</h2>
        <Answers onChangeQuestion={getAnswerValue} />
      </div>
    </div>
  );
}
