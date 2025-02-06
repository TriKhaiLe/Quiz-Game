import { useState, useEffect } from "react";
import { fetchQuestions } from "../config/geminiConfig";

const useQuiz = (topic, difficulty) => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadQuestions = async () => {
      try {
        const questionsData = await fetchQuestions(topic, difficulty);
        setQuestions(questionsData);
      } catch (error) {
        console.error("Error fetching questions:", error);
        setError("Invalid topic or API error. Please try again.");
      }
    };

    loadQuestions();
  }, [topic, difficulty]);

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
    setShowCorrectAnswer(true);
    if (answer === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    setSelectedAnswer(null);
    setShowCorrectAnswer(false);
    setCurrentQuestion(currentQuestion + 1);
  };

  return {
    questions,
    currentQuestion,
    score,
    selectedAnswer,
    showCorrectAnswer,
    error,
    handleAnswerSelect,
    handleNextQuestion,
  };
};

export default useQuiz;