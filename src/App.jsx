import Quiz from "./Quiz";
import QuestionContextProvider from "./QuestionContextProvider";
function App() {
  return (
    <QuestionContextProvider>
      <Quiz />
    </QuestionContextProvider>
  );
}

export default App;
