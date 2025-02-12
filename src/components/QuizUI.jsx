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
            background: "linear-gradient(90deg, #ff7e5f, #ff7e5f)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Hoàn thành!
        </Typography>

        <Typography
          variant="h6"
          style={{
            background: "linear-gradient(90deg, #ff7e5f, #ff7e5f)",
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

  const googleSearchUrl = `https://www.google.com/search?q=${encodeURIComponent(
    questions[currentQuestion].question
  )}`;

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
                background: showCorrectAnswer
                  ? answer === questions[currentQuestion].correctAnswer
                    ? "linear-gradient(90deg, #28a745, #218838)" // Đúng: xanh lá
                    : answer === selectedAnswer
                    ? "linear-gradient(90deg, #dc3545, #c82333)" // Sai: đỏ
                    : "linear-gradient(90deg, #f8f9fa, #e9ecef)" // Mặc định: xám nhạt
                  : "linear-gradient(90deg, #007bff, #0056b3)", // Màu xanh trước khi chọn
                color: showCorrectAnswer ? "black" : "white", // Giữ chữ màu đen sau khi chọn
                fontWeight: "bold",
                textTransform: "none",
                borderRadius: "8px",
                transition: "all 0.3s ease-in-out",
                "&:hover": {
                  background: showCorrectAnswer
                    ? answer === questions[currentQuestion].correctAnswer
                      ? "linear-gradient(90deg, #218838, #1e7e34)"
                      : answer === selectedAnswer
                      ? "linear-gradient(90deg, #c82333, #bd2130)"
                      : "linear-gradient(90deg, #d6d8db, #cfd3d8)" // Màu hover của đáp án chưa chọn
                    : "linear-gradient(90deg, #0056b3, #004085)",
                  transform: "scale(1.05)",
                },
                opacity: 1, // Không làm mờ khi bị disabled
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
                onClick={handleNextQuestion}
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

      <Box sx={{ mt: 4, textAlign: "center" }}>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => window.open(googleSearchUrl, "_blank")}
        >
          Search on Google
        </Button>
      </Box>
    </Container>
  );
};

export default QuizUI;