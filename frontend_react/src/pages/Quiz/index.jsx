import React, { useState, useEffect } from "react";
import quizData from "./quizData.json";

export default function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [currentTime, setCurrentTime] = useState(5);
  const [score, setScore] = useState(0);
  const [questions, setQuestions] = useState(quizData.questions);
  const [answered, setAnswered] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime((currentTime) => currentTime - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [currentTime]);

  function handleAnswer(e) {
    const selectedAnswer = e.currentTarget.value;
    if (selectedAnswer === questions[currentQuestion].answer) {
      setScore((score) => score + 1);
    }
    setAnswered(true);
  }

  useEffect(() => {
    if (currentTime === 0 || answered) {
      setCurrentQuestion((currentQuestion) => currentQuestion + 1);
      setCurrentTime(5);
      setAnswered(false);
    }
  }, [currentTime, currentQuestion, answered]);

  if (currentQuestion >= questions.length) {
    return (
      <div>
        <h1>Quiz terminé !</h1>
        <p>
          Vous avez répondu correctement à {score} questions sur{" "}
          {questions.length}.
        </p>
        <p>
          Votre pourcentage de réponses correctes est de{" "}
          {(score / questions.length) * 100}%.
        </p>
      </div>
    );
  }

  return (
    <div>
      <h1>Question {currentQuestion + 1}</h1>
      <p>Temps restant : {currentTime} secondes</p>
      <Question
        question={questions[currentQuestion]}
        handleAnswer={handleAnswer}
      />
    </div>
  );
}

function Question({ question, handleAnswer }) {
  return (
    <form>
      <h2>{question.question}</h2>
      {question.choices.map((choice) => (
        <label key={choice}>
          <input
            type="radio"
            name="answer"
            value={choice}
            onChange={handleAnswer}
          />
          {choice}
        </label>
      ))}
    </form>
  );
}
