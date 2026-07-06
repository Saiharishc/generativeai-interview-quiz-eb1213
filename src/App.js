import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [topics, setTopics] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentQuiz, setCurrentQuiz] = useState(null);

  useEffect(() => {
    fetch('/topics')
      .then(res => res.json())
      .then(data => setTopics(data.topics))
      .catch(console.error);
  }, []);

  useEffect(() => {
    let url = '/quizzes';
    if (selectedTopic) {
      url += `?topic=${selectedTopic}`;
    }
    fetch(url)
      .then(res => res.json())
      .then(data => setQuizzes(data))
      .catch(console.error);
  }, [selectedTopic]);

  const handleTopicSelect = (topic) => {
    setSelectedTopic(topic);
    setCurrentQuiz(null); // Clear current quiz when changing topic
  };

  const handleSearch = () => {
    let url = '/quizzes/search?';
    if (searchTerm) {
      url += `keyword=${searchTerm}`;
    }
    if (selectedTopic) {
      if (searchTerm) url += '&';
      url += `topic=${selectedTopic}`;
    }
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setQuizzes(data);
        setCurrentQuiz(null);
      })
      .catch(console.error);
  };

  const handleQuizClick = (quizId) => {
    fetch(`/quizzes/${quizId}`)
      .then(res => res.json())
      .then(data => setCurrentQuiz(data))
      .catch(console.error);
  };

  return (
    <div className="App">
      <h1>Generative AI Interview Quiz</h1>

      <div className="sidebar">
        <h2>Topics</h2>
        <ul>
          <li onClick={() => handleTopicSelect('')} style={{ cursor: 'pointer', fontWeight: !selectedTopic ? 'bold' : 'normal' }}>All Topics</li>
          {topics.map(topic => (
            <li key={topic} onClick={() => handleTopicSelect(topic)} style={{ cursor: 'pointer', fontWeight: selectedTopic === topic ? 'bold' : 'normal' }}>
              {topic}
            </li>
          ))}
        </ul>
      </div>

      <div className="main-content">
        <div className="search-bar">
          <input 
            type="text" 
            placeholder="Search quizzes by keyword..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
        </div>

        <h2>{selectedTopic ? `${selectedTopic} Quizzes` : 'Latest Quizzes'}</h2>
        {!currentQuiz && (
          <ul className="quiz-list">
            {quizzes.map(quiz => (
              <li key={quiz.id} onClick={() => handleQuizClick(quiz.id)} style={{ cursor: 'pointer' }}>
                <h3>{quiz.title}</h3>
                <p>Topic: {quiz.topic}</p>
              </li>
            ))}
          </ul>
        )}

        {currentQuiz && (
          <div className="quiz-details">
            <h2>{currentQuiz.title}</h2>
            <p>Topic: {currentQuiz.topic}</p>
            {currentQuiz.questions && currentQuiz.questions.map((q, index) => (
              <div key={index} className="question">
                <h4>Q{index + 1}: {q.question}</h4>
                <p><strong>Answer:</strong> {q.answer}</p>
                <p><em>Explanation:</em> {q.explanation}</p>
              </div>
            ))}
            <button onClick={() => setCurrentQuiz(null)}>Back to Quizzes</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
