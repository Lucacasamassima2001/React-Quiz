import { createContext, useCallback } from "react";
import { useState } from "react";
import questions from "./questions";
import correctAnswers from "../correctAnswers";
export const QuestionsContext = createContext({
  questions: [],
  activeQuestion: null,
  answeredQuestions: { answered: [] },
  getAnswerValue: () => {},
  getSkippedValue: () => {},
  correctAnswers: [],
  setIsAnswered: () => {},
  startQuiz: () => {},
  restartQuiz: () => {},
  setAnsweredQuestions: () => {},
  isAnswered: false,
});

export default function QuestionContextProvider({ children }) {
  const [answeredQuestions, setAnsweredQuestions] = useState({
    activeQuestion: 0,
    isStarted: false,
    answered: [],
  });
  const [isAnswered, setIsAnswered] = useState(false);
  // function to pick answer
  const getAnswerValue = (answer) => {
    setIsAnswered(true);
    setAnsweredQuestions({
      ...answeredQuestions,
      answered: [
        ...answeredQuestions.answered,
        {
          question: questions[answeredQuestions.activeQuestion].text,
          questionId: questions[answeredQuestions.activeQuestion].id,
          answer: answer,
          result:
            correctAnswers[answeredQuestions.activeQuestion].correctAnswer ===
            answer
              ? "correct"
              : "wrong",
        },
      ],
    });
  };

  // function to pick skipped answer

  function getSkippedValue() {
    setAnsweredQuestions({
      ...answeredQuestions,
      answered: [
        ...answeredQuestions.answered,
        {
          question: questions[answeredQuestions.activeQuestion].text,
          questionId: questions[answeredQuestions.activeQuestion].id,
          answer: "skipped",
          result: "skipped",
        },
      ],
    });
  }

  function startQuiz() {
    setAnsweredQuestions((prev) => {
      return { ...prev, isStarted: true };
    });
  }

  function restartQuiz() {
    setAnsweredQuestions((prev) => {
      return { ...prev, answered: [], isStarted: false, activeQuestion: 0 };
    });

    setIsAnswered(false);
  }

  const qtxValue = {
    questions: questions,
    activeQuestion: answeredQuestions.activeQuestion,
    answeredQuestions: answeredQuestions,
    getAnswerValue: getAnswerValue,
    getSkippedValue: getSkippedValue,
    correctAnswers: correctAnswers,
    isAnswered: isAnswered,
    setIsAnswered: setIsAnswered,
    startQuiz: startQuiz,
    restartQuiz: restartQuiz,
    setAnsweredQuestions: setAnsweredQuestions,
    isAnswered: isAnswered,
  };
  return (
    <QuestionsContext.Provider value={qtxValue}>
      {children}
    </QuestionsContext.Provider>
  );
}
