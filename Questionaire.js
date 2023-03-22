import React from 'react';
import '../App.css'



const Questionaire = ({ showAnswers, handleAnswer, handleNextQuestion, data: {question, correct_answer, answers}}) => {

    
  return (
    <div className='main-app'>
        <h1>Quiz Game</h1>
      <div className='que-container'>
        <h3 dangerouslySetInnerHTML={{__html: question }}/>
      </div>

      <div className='ans-container'>
        {answers.map((answer => {
            const bgColor = showAnswers ? answer === correct_answer ? 'bg-green' : 'bg-red' : 'btn';
            return (
            <button className={`${bgColor} btn`}
            onClick={() => handleAnswer(answer)}>{answer}</button>
        )}))}
      </div>
      {showAnswers && (
            <button onClick={handleNextQuestion} className='next-btn'>
            Next Question
            </button>
        )}
    </div>
  )
};



export default Questionaire
