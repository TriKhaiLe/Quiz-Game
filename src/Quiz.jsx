import { useState, useEffect } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import {
  Container,
  Card,
  CardContent,
  Typography,
  Button,
  CircularProgress,
  Box,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import CelebrationIcon from "@mui/icons-material/Celebration";

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

const Quiz = ({ topic }) => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const prompt = `Create 5 multiple-choice questions on the topic "${topic}" in Vietnamese. 
        Each question has 4 possible answers, one of which is correct. The questions should be short, 
        easy to understand, and general knowledge. Format the response as a JSON array:
        [{ "question": "text", "answers": ["a", "b", "c", "d"], "correctAnswer": "answer" }]`;

        const result = await model.generateContent(prompt);
        const response = await result.response;

        const jsonText = response.candidates?.[0]?.content?.parts?.[0]?.text;
        if (!jsonText) throw new Error("Invalid response format");

        const cleanJsonText = jsonText.replace(/```json|```/g, "").trim();
        const questionsData = JSON.parse(cleanJsonText).map((q) => {
          // Lấy đáp án chính xác dựa trên chỉ mục của nó trong danh sách `answers`
          const answerIndex = ["a", "b", "c", "d"].indexOf(q.correctAnswer.toLowerCase());
          return {
            ...q,
            correctAnswer: answerIndex !== -1 ? q.answers[answerIndex] : q.correctAnswer,
          };
        });
                
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

  if (error) {
    return (
      <Container>
        <Typography color="error">{error}</Typography>
      </Container>
    );
  }

  if (questions.length === 0) {
    return (
      <Container sx={{ textAlign: "center", mt: 4 }}>
        <CircularProgress />
        <Typography variant="h6">Đang tải câu hỏi...</Typography>
      </Container>
    );
  }

  if (currentQuestion >= questions.length) {
    return (
      <Container sx={{ textAlign: "center", mt: 4 }}>
        <CelebrationIcon color="success" sx={{ fontSize: 50 }} />
        <Typography variant="h4" fontWeight="bold" style={{ background: 'linear-gradient(90deg, #ff7e5f, #feb47b)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Hoàn thành!
        </Typography>
        
        <Typography variant="h6" style={{ background: 'linear-gradient(90deg, #ff7e5f, #feb47b)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Điểm của bạn: <b>{score}</b>/{questions.length}
        </Typography>        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
          onClick={() => setCurrentQuestion(0)}
        >
          Chơi lại
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Card sx={{ boxShadow: 3, borderRadius: 3 }}>
        <CardContent>
          <Typography variant="h5" fontWeight="bold">
            {questions[currentQuestion].question}
          </Typography>

          <Box sx={{ mt: 2 }}>
            {questions[currentQuestion].answers.map((answer, index) => (
              <Button
                key={index}
                fullWidth
                variant="contained"
                sx={{
                  mt: 1,
                  backgroundColor:
                    showCorrectAnswer && answer === questions[currentQuestion].correctAnswer
                      ? "green"
                      : showCorrectAnswer && answer === selectedAnswer
                      ? "red"
                      : "primary.main",
                  "&:hover": {
                    backgroundColor:
                      showCorrectAnswer && answer === questions[currentQuestion].correctAnswer
                        ? "green"
                        : showCorrectAnswer && answer === selectedAnswer
                        ? "red"
                        : "primary.dark",
                  },
                }}
                onClick={() => handleAnswerSelect(answer)}
                disabled={showCorrectAnswer}
              >
                {answer}
              </Button>
            ))}
          </Box>

          {showCorrectAnswer && (
            <Box sx={{ textAlign: "center", mt: 2 }}>
              {selectedAnswer === questions[currentQuestion].correctAnswer ? (
                <CheckCircleIcon sx={{ color: "green", fontSize: 40 }} />
              ) : (
                <CancelIcon sx={{ color: "red", fontSize: 40 }} />
              )}
              <Typography variant="body1">
                Đáp án đúng:{" "}
                <b style={{ color: "green" }}>{questions[currentQuestion].correctAnswer}</b>
              </Typography>
              <Button variant="outlined" sx={{ mt: 2 }} onClick={handleNextQuestion}>
                Câu tiếp theo
              </Button>
            </Box>
          )}

          <Typography variant="body2" sx={{ mt: 2 }}>
            Điểm: <b>{score}</b>
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Quiz;
