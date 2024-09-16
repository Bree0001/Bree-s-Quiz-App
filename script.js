import {questions} from './questions.js';

const startButtonElement = document.querySelector('.js-start-button');
const questionsElements = document.querySelector('.js-question-div');
const questionText = document.querySelector('.question-text');
const scoreElement = document.querySelector('.score-div');
const restartButtonElement = document.querySelector('.js-restart-button');
const buttonElements = document.querySelectorAll('.js-button');
const feedbackElement = document.querySelector('.js-feedback');

let score = 0;
let currentQuestionIndex = 0;
let isAnswering = true;

function startGame() {
  score = 0;
  currentQuestionIndex = 0;
  startButtonElement.style.display = 'none';
  document.querySelector('h1').style.display = 'none';
  document.querySelector('p').style.display = 'none';
  questionsElements.style.display = 'block';
  feedbackElement.innerText = '';
  scoreElement.innerText = '';
  restartButtonElement.style.display = 'none';
  displayQuestion(currentQuestionIndex);
  
}

function displayQuestion(index) {
  const questionData = questions[index];
  questionText.innerText = questionData.question;

  buttonElements.forEach((button, i) => {
    button.style.display = 'inline-block';
    button.style.backgroundColor = '';
    button.disabled = false;
    button.innerText = questionData.options[i];

    button.onclick = function () {
      checkAnswer(questionData.options[i], questionData.correct, button);
    };
  });
}

function checkAnswer(selectedOption, correctOption, selectedButton) {

  buttonElements.forEach(button => {
    if (button.innerText === correctOption) {
      button.style.backgroundColor = 'green'; 
    } else if (button === selectedButton) {
      button.style.backgroundColor = 'red'; 
    }
   
  });

  if (selectedOption === correctOption) {
    score++;
    feedbackElement.innerText = 'You Got It!😘'; 
    feedbackElement.style.color = 'green';
  } else {
    feedbackElement.innerText = 'Really🙄'; 
    feedbackElement.style.color = 'red';
  }
  setTimeout(() => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      feedbackElement.innerText = ''; 
      displayQuestion(currentQuestionIndex);
    } else {
      endQuiz(); 
    }
  }, 1500); 
}

function endQuiz() {
  console.log("Ending quiz, score: ", score); 
  feedbackElement.innerText = ''; 
  questionText.innerText = ''; 
  
  buttonElements.forEach(button => {
    button.style.display = 'none';
  });

  scoreElement.innerText = `Quiz finished. Your score is: ${score}`;
  restartButtonElement.style.display = 'block';
}

startButtonElement.addEventListener('click', startGame);
restartButtonElement.addEventListener('click', startGame);
