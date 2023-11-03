import React, { useEffect, useState } from "react";
import "../Quiz.css";
import data from "../data.json";

export default function Question() {
  const [quizData, setQUizData] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [incorrectAnswers, setIncorrectAnswers] = useState([]);
  const [displayCss, setDisplayCss] = useState({
    quizContainer: true,
    submitButton: true,
    retryButton: false,
    showAnswerButton: false,
    resultContainer: false,
    showAnswerContainer:false
  });

  useEffect(() => {
    setQUizData(data);
  }, []);
  console.log(score, currentQuestion, incorrectAnswers);

  function checkAnswer() {
    const selectedOption = document.querySelector('input[name="quiz"]:checked');
    if (selectedOption) {
      const answer = selectedOption.value;
      if (answer === quizData[currentQuestion].answer) {
        setScore(score + 1);
      } else {
        setIncorrectAnswers([
          ...incorrectAnswers,
          {
            question: quizData[currentQuestion].question,
            incorrectAnswer: answer,
            correctAnswer: quizData[currentQuestion].answer,
          },
        ]);
      }
      if (currentQuestion < quizData.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        setCurrentQuestion(currentQuestion + 1);
        displayResult();
      }
      selectedOption.checked = false;
    }
  }

  function displayResult() {
    setDisplayCss({
      ...displayCss,
      quizContainer: false,
      submitButton: false,
      retryButton: true,
      showAnswerButton: true,
      resultContainer: true,
      showAnswerContainer:false
    });
  }

  function retryQuiz() {
    setCurrentQuestion(0);
    setScore(0);
    setIncorrectAnswers([]);
    setDisplayCss({
      ...displayCss,
      quizContainer: true,
      submitButton: true,
      retryButton: false,
      showAnswerButton: false,
      resultContainer: false,
      showAnswerContainer:false
    });
  }

  function showAnswer() {
    setDisplayCss({
        ...displayCss,
        quizContainer:false,
        submitButton:false,
        retryButton:true,
        showAnswerButton:false,
        showAnswerContainer:true
    })
  }

  return (
    <div className="container">
      <h1>Quiz App</h1>
      {quizData.length > currentQuestion && (
        <div id={`quiz ${displayCss.quizContainer ? "" : "hide"}`}>
          <div className="question">{quizData[currentQuestion].question}</div>
          <div className="options">
            {quizData[currentQuestion].options.map((val, key) => {
              return (
                <label htmlFor="" className="option" key={key}>
                  <input type="radio" name="quiz" value={val} key={key} />
                  {val}
                </label>
              );
            })}
          </div>
        </div>
      )}
      <div
        id="result"
        className={`result ${displayCss.resultContainer ? "" : "hide"}`}
      >
        You scored {score} out of {quizData.length}!
        {displayCss.showAnswerContainer && <p>Incorrect Answers:</p>}
        {displayCss.showAnswerContainer &&
          incorrectAnswers.map((val, key) => {
            return (
              <p key={key}>
                <strong>Question:</strong> {val.question} <br />
                <strong>Your Answer:</strong> {val.incorrectAnswer} <br />
                <strong>Correct Answer:</strong> {val.correctAnswer}
              </p>
            );
          })}
      </div>
      <button
        id="submit"
        className={`button ${displayCss.submitButton ? "" : "hide"}`}
        onClick={checkAnswer}
      >
        Submit
      </button>
      <button
        id="retry"
        className={`button ${displayCss.retryButton ? "" : "hide"}`}
        onClick={retryQuiz}
      >
        Retry
      </button>
      <button
        id="showAnswer"
        className={`button ${displayCss.showAnswerButton ? "" : "hide"}`}
        onClick={showAnswer}
      >
        Show Answer
      </button>
    </div>
  );
}
