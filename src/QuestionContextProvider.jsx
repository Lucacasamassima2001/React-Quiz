import { createContext } from "react";
import { useState } from "react";
import { questions } from "./questions";
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
  selectAnswer: () => {},
  CleanButton: () => {},
  lastTry: false,
  setLastTry: () => {},
});

export default function QuestionContextProvider({ children }) {
  const [answeredQuestions, setAnsweredQuestions] = useState({
    activeQuestion: 0,
    isStarted: false,
    answered: [],
  });
  const [isAnswered, setIsAnswered] = useState(false);
  const [lastTry, setLastTry] = useState(false);

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

  // function to start Quiz
  function startQuiz() {
    setAnsweredQuestions((prev) => {
      return { ...prev, isStarted: true };
    });
  }

  // function to restart Quiz
  function restartQuiz() {
    setAnsweredQuestions((prev) => {
      return { ...prev, answered: [], isStarted: false, activeQuestion: 0 };
    });
    setIsAnswered(false);
  }

  // function to check if answer is correct
  const checkIfAnswerIsSelected = (answer, buttonColor) => {
    if (answer) {
      buttonColor.current.className = "selected";
    }
  };

  // function to clean buttonColor
  const cleanButtonColor = (buttonColor) => {
    buttonColor.current.className = "";
  };

  const qtxValue = {
    questions: questions,
    correctAnswers: correctAnswers,
    activeQuestion: answeredQuestions.activeQuestion,
    answeredQuestions: answeredQuestions,
    setAnsweredQuestions: setAnsweredQuestions,
    getAnswerValue: getAnswerValue,
    getSkippedValue: getSkippedValue,
    setIsAnswered: setIsAnswered,
    isAnswered: isAnswered,
    startQuiz: startQuiz,
    restartQuiz: restartQuiz,
    selectAnswer: checkIfAnswerIsSelected,
    CleanButton: cleanButtonColor,
    lastTry: lastTry,
    setLastTry: setLastTry,
  };
  return (
    <QuestionsContext.Provider value={qtxValue}>
      {children}
    </QuestionsContext.Provider>
  );
}
