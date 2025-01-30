import { useState } from 'react';
import Quiz from './Quiz';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import './App.css';

function App() {
  const [topic, setTopic] = useState('');
  const [startQuiz, setStartQuiz] = useState(false);

  const handleStartQuiz = () => {
    if (topic.trim() === '') {
      alert('Please enter a valid topic.');
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
          <Button
            variant="contained"
            className="button"
            onClick={handleStartQuiz}
          >
            Start Quiz
          </Button>
        </Box>
      ) : (
        <Quiz topic={topic} />
      )}
    </Container>
  );
}

export default App;