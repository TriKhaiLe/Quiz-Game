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
    <Container maxWidth="sm" style={{ marginTop: '2rem', textAlign: 'center' }}>
      {!startQuiz ? (
        <Box>
          <Typography variant="h3" gutterBottom>
            Welcome to the Quiz Game
          </Typography>
          <TextField
            label="Enter topic"
            variant="outlined"
            fullWidth
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            style={{ marginBottom: '1rem' }}
          />
          <Button variant="contained" color="primary" onClick={handleStartQuiz}>
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