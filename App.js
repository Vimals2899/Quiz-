import React, {useState, useEffect} from 'react';
import Questionaire from './components/Questionaire';
import "./App.css"

const API_URL = 'https://opentdb.com/api.php?amount=10&category=17&difficulty=easy&type=multiple'

const App = () => {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showAnswers, setShowAnswers] = useState(false)

  useEffect(() => {
    fetch(API_URL)
    .then((res) => res.json())
    .then((data) => {
      
      const questions = data.results.map((question) => ({
        ...question, answers: [
          question.correct_answer, ...question.incorrect_answers
        ].sort(() => Math.random() - 0.5),
      }));
      setQuestions(questions);
    });
  }, []);

  const handleAnswer= (answer) => {
    if (!showAnswers){
      if (answer === questions[currentIndex].correct_answer){
        setScore(score + 1);
      }
    }

    setShowAnswers(true);
    };

    const handleNextQuestion = () => {
      setCurrentIndex(currentIndex + 1);

      setShowAnswers (false);
    };

  return questions.length > 0 ? (
    <div>
      {currentIndex >= questions.length ? (
        <h1 className='end-p'>Your Score: {score}</h1>
      ) : (
      <Questionaire data={questions[currentIndex]}
      showAnswers = {showAnswers}
      handleNextQuestion = {handleNextQuestion}
      handleAnswer = {handleAnswer}/>
      )}
    </div>
  ) : (
    <h2 className='loading'>Loading...</h2>
  )
};

export default App;

