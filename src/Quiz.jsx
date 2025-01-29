import { useState, useEffect } from 'react';
import axios from 'axios';
import { GoogleGenerativeAI } from "@google/generative-ai";

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

const Quiz = ({ topic }) => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const prompt = `Create 5 multiple choice questions on the topic "${topic}" in Vietnamese. Each question has 4 possible answers, one of which is correct. The questions should be short, easy to understand, general knowledge, not too academic. Format the response as a JSON array with each question having the structure: { "question": "question text", "answers": ["answer1", "answer2", "answer3", "answer4"], "correctAnswer": "correct answer" }`;
  
        const result = await model.generateContent(prompt);
        const response = await result.response;
        
        const jsonText = response.candidates?.[0]?.content?.parts?.[0]?.text;
        if (!jsonText) {
          throw new Error("Invalid response format");
        }
  
        // Loại bỏ Markdown code block nếu có
        const cleanJsonText = jsonText.replace(/```json|```/g, "").trim();
          const questionsData = JSON.parse(cleanJsonText);
  
        setQuestions(questionsData);
      } catch (error) {
        console.error("Error fetching questions:", error);
        setError("Invalid topic or API error. Please try again.");
      }
    };
  
    fetchQuestions();
  }, [topic]);
  
  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
    setSelectedAnswer(null);
    setCurrentQuestion(currentQuestion + 1);
  };

  if (error) {
    return <div>{error}</div>;
  }

  if (questions.length === 0) {
    return <div>Loading...</div>;
  }

  if (currentQuestion >= questions.length) {
    return <div>Your score: {score}</div>;
  }

  return (
    <div>
      <h2>{questions[currentQuestion].question}</h2>
      <div>
        {questions[currentQuestion].answers.map((answer, index) => (
          <button key={index} onClick={() => handleAnswerSelect(answer)}>
            {answer}
          </button>
        ))}
      </div>
      <button onClick={handleNextQuestion} disabled={!selectedAnswer}>
        Next
      </button>
      <div>Score: {score}</div>
    </div>
  );
};

export default Quiz;