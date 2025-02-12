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
    if (topic.trim() === '' || isNaN(difficultyValue) || difficultyValue < 1 || difficultyValue > 10) {
      alert('Please enter a valid topic and difficulty level (1-10).');
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
            label="Enter difficulty (1-10)"
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
      {startQuiz && (
        <Box sx={{ mt: 4 }}>
          <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4994237070259235" crossorigin="anonymous"></script>
          <ins className="adsbygoogle"
            style={{ display: 'block' }}
            data-ad-client="ca-pub-4994237070259235"
            data-ad-slot="7806394673"
            data-ad-format="auto"
            data-full-width-responsive="true"></ins>
          <script>
            (adsbygoogle = window.adsbygoogle || []).push({});
          </script>
        </Box>
      )}
    </Container>
  );
}

export default App;