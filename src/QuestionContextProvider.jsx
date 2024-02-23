import { createContext } from "react";
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
  CheckAnswer: () => {},
  CleanButton: () => {},
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
  const checkifAnswerIsCorrect = (answer, buttonColor) => {
    if (
      answer === correctAnswers[answeredQuestions.activeQuestion].correctAnswer
    ) {
      buttonColor.current.className = "correct";
    } else {
      buttonColor.current.className = "wrong";
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
    CheckAnswer: checkifAnswerIsCorrect,
    CleanButton: cleanButtonColor,
  };
  return (
    <QuestionsContext.Provider value={qtxValue}>
      {children}
    </QuestionsContext.Provider>
  );
}
