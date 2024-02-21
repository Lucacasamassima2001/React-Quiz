import { useContext, useEffect, useState } from "react";
import Answers from "./Answers";
import ProgressBar from "./ProgressBar";
import { QuestionsContext } from "./QuestionContextProvider";
let TIMER = 10000;

export default function Question() {
  const {
    questions,
    activeQuestion,
    getAnswerValue,
    getSkippedValue,
    isAnswered,
    setIsAnswered,
    setActiveQuestion,
  } = useContext(QuestionsContext);
  const question = questions[activeQuestion];
  console.log(isAnswered);

  useEffect(() => {
    const timeOut = setTimeout(() => {
      getSkippedValue();
      setActiveQuestion((prev) => prev + 1);
    }, TIMER);

    return () => {
      clearTimeout(timeOut);
      setIsAnswered(false);
    };
  }, [TIMER, isAnswered, setIsAnswered, getSkippedValue]);

  return (
    <div id="#question-overview">
      <div id="question">
        {<ProgressBar TIMER={TIMER} question={question} />}
        <h2>{questions[activeQuestion].text}</h2>
        <Answers onChangeQuestion={getAnswerValue} TIMER={TIMER} />
      </div>
    </div>
  );
}
