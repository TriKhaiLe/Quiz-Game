import { useState } from 'react';
import Quiz from './Quiz';
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
    <div>
      {!startQuiz ? (
        <div>
          <h1>Welcome to the Quiz Game</h1>
          <input
            type="text"
            placeholder="Enter topic"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />
          <button onClick={handleStartQuiz}>Start Quiz</button>
        </div>
      ) : (
        <Quiz topic={topic} />
      )}
    </div>
  );
}

export default App;