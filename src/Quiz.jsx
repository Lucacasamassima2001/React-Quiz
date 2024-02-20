import { useContext } from "react";
import { QuestionsContext } from "./QuestionContextProvider";
import Question from "./Question";
import questions from "./questions";
import Summary from "./Summary";
export default function Quiz() {
  const { activeQuestion } = useContext(QuestionsContext);
  return (
    <div id="quiz">
      {activeQuestion === questions.length ? <Summary /> : <Question />}
    </div>
  );
}
