import { useState, useEffect, useContext } from "react";
import { QuestionsContext } from "./QuestionContextProvider";

export default function ProgressBar({ TIMER, question }) {
  const [remainingTime, setRemainingTime] = useState(TIMER);
  const { isAnswered, lastTry } = useContext(QuestionsContext);

  useEffect(() => {
    if (isAnswered || lastTry) {
      setRemainingTime(2000);
    } else {
      setRemainingTime(TIMER);
    }

    const interval = setInterval(() => {
      setRemainingTime((prev) => prev - 10);
    }, 10);

    return () => clearInterval(interval);
  }, [question, TIMER, isAnswered, lastTry]);

  useEffect(() => {
    if (remainingTime === 0) {
      setRemainingTime(TIMER);
    }
  }, [remainingTime, TIMER]);

  return (
    <progress
      id="progress"
      className={isAnswered ? "answered" : ""}
      value={remainingTime}
      max={isAnswered || lastTry ? 2000 : TIMER}
    />
  );
}
