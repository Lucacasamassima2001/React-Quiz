import { useState, useEffect, useContext } from "react";
import { QuestionsContext } from "./QuestionContextProvider";

export default function ProgressBar({ TIMER }) {
  const [remainingTime, setRemainingTime] = useState(TIMER);
  const { isAnswered } = useContext(QuestionsContext);

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime((prev) => prev - 10);
    }, 10);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (remainingTime === 0) {
      setRemainingTime(TIMER);
    }
    if (isAnswered) {
      setRemainingTime(TIMER);
    }
  }, [remainingTime, TIMER, isAnswered]);
  return <progress value={remainingTime} max={TIMER} />;
}
