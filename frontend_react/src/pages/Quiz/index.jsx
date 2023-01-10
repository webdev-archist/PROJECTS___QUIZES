import React, { useState, useEffect } from "react"
import { Link } from 'react-router-dom'
import quizData from "./quizData.json"

export default function Quiz() {
  // const default_timing = confirm("choisir la durée du timing pour chaque question: (défaut = 5s") - 1
  const default_timing = 5
  , [questions, setQuestions] = useState(quizData.questions)
  , [doGoNext, setDoGoNext] = useState(false)
  , [currentQuestion, setCurrentQuestion] = useState(0)
  , [currentChoices, setCurrentChoices] = useState(rrand(questions))
  , [currentTime, setCurrentTime] = useState(default_timing)
  , [score, setScore] = useState(0)
  , [answered, setAnswered] = useState(false)
  , [isWrong, setIsWrong] = useState(false)
  , [isPaused, setIsPaused] = useState(false)
  let timer = 0

  useEffect(() => {
    timer = setInterval(() => {
    if(answered)clearInterval(timer)
    else setCurrentTime((currentTime) => currentTime - 1)
    }, 1000);
    return () => {clearInterval(timer)}
  }, [currentTime]);

  function handlePauseResume(e) {
    if(!answered && currentTime !== 0)
      if(!isPaused){
        setIsPaused(true)
        clearInterval(timer)
      }else{
        setIsPaused(false)
        setCurrentTime((currentTime) => currentTime - 1)
      }
  }
  function handleRestart(e) {
    setQuestions(quizData.questions)
    setCurrentQuestion(0)
    setCurrentTime(5);
    setAnswered(false);
    setDoGoNext(false);
    setIsWrong(false);
    setIsPaused(false)
  }
  function handleAnswer(e) {
    const selectedAnswer = e.currentTarget.dataset.value;
    if(!answered)
      if (selectedAnswer === questions[currentQuestion].answer) {
        // alert('pl')
        setScore((score) => score + 1);
        setIsWrong("correct")
        e.target.classList.add('correct')
      }else{
        setIsWrong(true)
        e.target.classList.add('wrong')
      }
    if(answered || currentTime === 0)setDoGoNext(true)
    if(!answered){
      setAnswered(true)
      Array.from(
        document.getElementById("choices").querySelectorAll('li')
      ).forEach(el=>{
        if (el.innerHTML === questions[currentQuestion].answer)
          el.classList.add('wasCorrect')
      })
    }else 
      Array.from(
        document.getElementById("choices").querySelectorAll('li')
      ).forEach(el=>{
        el.classList.remove('wrong')
        el.classList.remove('correct')
        el.classList.remove('wasCorrect')
      })
  }

  useEffect(() => {
    if(currentTime == 0){
      clearInterval(timer)
      setIsWrong(true)
      Array.from(
        document.getElementById("choices").querySelectorAll('li')
      ).forEach(el=>{
        console.log(el.innerHTML === questions[currentQuestion].answer)
        console.log(el.innerHTML)
        console.log(questions[currentQuestion].answer)
        console.log("\n\n\n")
        if (el.innerHTML === questions[currentQuestion].answer)
          el.classList.add('wasCorrect')
      })
    }
    if (doGoNext) {
      setCurrentQuestion((currentQuestion) => currentQuestion + 1);
      setCurrentTime(5);
      setAnswered(false);
      setDoGoNext(false);
      setIsWrong(false);
      setIsPaused(false)
      setCurrentChoices(rrand(questions))
    }
  }, [currentTime, currentQuestion, answered, isWrong, doGoNext]);

  if (currentQuestion >= questions.length) {
    return (
      <>
        <header>
          <button id="restart" onClick={handleRestart}>↺</button>
        </header>
        <h1>Quiz terminé !</h1>
        <p>
          Vous avez répondu correctement à {score} questions sur{" "}
          {questions.length}.
        </p>
        <p>
          Votre pourcentage de réponses correctes est de{" "}
          {(score / questions.length) * 100}%.
        </p>
      </>
    )
  }

  return (<>
    <header className={isWrong===true?"gotWrong":isWrong==="correct"?"gotTrue":""}>
      <h1>{currentQuestion + 1}/{questions.length}</h1>
      <h2>{questions[currentQuestion].question}</h2>
        <p id="custom_comments"></p>
        <section id="history">
          <span>H</span>
          <ul></ul>
        </section>
        <section id="stats">
          <ul>
            <li>0</li><li>1</li><li>2</li><li>3</li><li>4</li><li>5</li><li>6</li><li>7</li><li>8</li><li>9</li><li>10</li>
          </ul>
        </section>
      <div id="timing" data-timing={currentTime} data-default_timing={default_timing}>
        <div style={{width:((100*(currentTime-1))/default_timing)+"%"}}></div>
      </div>
      {/* {currentTime} - {default_timing} */}
      <button id="restart" onClick={handleRestart}>↺</button>
      <button id="pauseResume" onClick={handlePauseResume} className={(answered||currentTime==0)?"disabled":undefined}style={{background:isPaused&&"red"}}>{isPaused?"⏯":"⏸️"}</button>
      <button id="exit"><Link to="/settings"><span>出</span><span>路</span><span>EXIT</span></Link></button>
    </header>
    <main>
      {/* {questions[currentQuestion].answer} */}
      <ul id="choices">
        {currentChoices.map((q,i) => (
          <li key={i} data-value={q.answer} onClick={handleAnswer}>
            {q.answer}
          </li>
        ))}
      </ul>
    </main>

    <footer style={{display:answered||currentTime===0?"block":"none"}}>
      <button id="sheet">GO TO SHEET</button>
      <div className="actions"><button id="addCutomComments"></button></div>
      <div className="infos"><span>N1</span><span>difficult</span></div>
    </footer>
  </>);
}

function rrand(arr) {
  const tmp = [...arr]
  for (let i = tmp.length -1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i+1));
    let k = tmp[i];
    tmp[i] = tmp[j];
    tmp[j] = k;
  }
  return [...tmp]
}

