import { useContext } from "react";
import { QuestionsContext } from "./QuestionContextProvider";
import Answer from "./Answer";
export default function Answers({ onChangeQuestion, TIMER }) {
  const { questions, activeQuestion } = useContext(QuestionsContext);
  return (
    <>
      <ul id="answers">
        {questions[activeQuestion].answers.map((answer, index) => (
          <Answer
            key={index}
            onChange={onChangeQuestion}
            answer={answer}
            TIMER={TIMER}
          />
        ))}
      </ul>
    </>
  );
}
