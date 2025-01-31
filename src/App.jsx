import { useState } from 'react';
import Quiz from './Quiz';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import './App.css';

function App() {
  const [topic, setTopic] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [startQuiz, setStartQuiz] = useState(false);

  const handleStartQuiz = () => {
    const difficultyValue = parseInt(difficulty, 10);
    if (topic.trim() === '' || isNaN(difficultyValue) || difficultyValue < 1 || difficultyValue > 5) {
      alert('Please enter a valid topic and difficulty level (1-5).');
      return;
    }
    setStartQuiz(true);
  };
  
  return (
    <Container maxWidth="sm" className="container">
      {!startQuiz ? (
        <Box>
          <Typography variant="h3" gutterBottom className="typography">
            Welcome to the Quiz Game
          </Typography>
          <TextField
            label="Enter topic"
            variant="outlined"
            fullWidth
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="textField"
          />
          <TextField
            label="Enter difficulty (1-5)"
            variant="outlined"
            fullWidth
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className="textField"
          />
          <Button
            variant="contained"
            className="button"
            onClick={handleStartQuiz}
          >
            Start Quiz
          </Button>
        </Box>
      ) : (
        <Quiz topic={topic} difficulty={difficulty} />
      )}
    </Container>
  );
}

export default App;