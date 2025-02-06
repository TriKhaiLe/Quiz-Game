import useQuiz from "./components/QuizLogic";
import QuizUI from "./components/QuizUI";

const Quiz = ({ topic, difficulty }) => {
  const {
    questions,
    currentQuestion,
    score,
    selectedAnswer,
    showCorrectAnswer,
    error,
    handleAnswerSelect,
    handleNextQuestion,
  } = useQuiz(topic, difficulty);

  return (
    <QuizUI
      questions={questions}
      currentQuestion={currentQuestion}
      score={score}
      selectedAnswer={selectedAnswer}
      showCorrectAnswer={showCorrectAnswer}
      error={error}
      handleAnswerSelect={handleAnswerSelect}
      handleNextQuestion={handleNextQuestion}
    />
  );
};

export default Quiz;