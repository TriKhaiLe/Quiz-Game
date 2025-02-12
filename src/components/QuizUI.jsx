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
import SearchResults from "./SearchResults";
import { useState } from "react";

const QuizUI = ({
  questions,
  currentQuestion,
  score,
  selectedAnswer,
  showCorrectAnswer,
  error,
  handleAnswerSelect,
  handleNextQuestion,
}) => {
  const [showSearchResults, setShowSearchResults] = useState(false);

  const handleNextQuestionWithReset = () => {
    setShowSearchResults(false);
    handleNextQuestion();
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
        <Typography
          variant="h4"
          fontWeight="bold"
          style={{
            background: "linear-gradient(90deg, #ff7e5f, #feb47b)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Hoàn thành!
        </Typography>

        <Typography
          variant="h6"
          style={{
            background: "linear-gradient(90deg, #ff7e5f, #feb47b)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Điểm của bạn: <b>{score}</b>/{questions.length}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
          onClick={() => window.location.reload()}
        >
          Chơi lại
        </Button>
      </Container>
    );
  }

  const googleSearchQuery = questions[currentQuestion].question;

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
                    showCorrectAnswer &&
                    answer === questions[currentQuestion].correctAnswer
                      ? "green"
                      : showCorrectAnswer && answer === selectedAnswer
                      ? "red"
                      : "primary.main",
                  "&:hover": {
                    backgroundColor:
                      showCorrectAnswer &&
                      answer === questions[currentQuestion].correctAnswer
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
                <b style={{ color: "green" }}>
                  {questions[currentQuestion].correctAnswer}
                </b>
              </Typography>
              <Typography variant="body2" sx={{ mt: 2 }}>
                Giải thích: {questions[currentQuestion].explanation}
              </Typography>
              <Button
                variant="outlined"
                sx={{ mt: 2 }}
                onClick={handleNextQuestionWithReset}
              >
                Câu tiếp theo
              </Button>
            </Box>
          )}

          <Typography variant="body2" sx={{ mt: 2 }}>
            Điểm: <b>{score}</b>
          </Typography>
        </CardContent>
      </Card>

      {showCorrectAnswer && (
        <Box sx={{ mt: 4, textAlign: "center" }}>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => setShowSearchResults(true)}
            disabled={!selectedAnswer}
          >
            Search on Google
          </Button>
        </Box>
      )}

      {showSearchResults && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6">Search Results:</Typography>
          <SearchResults query={googleSearchQuery} />
        </Box>
      )}
    </Container>
  );
};

export default QuizUI;