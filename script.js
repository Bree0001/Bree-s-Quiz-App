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
  isAnswering = true;

  buttonElements.forEach((button, i) => {
    button.style.display = 'inline-block';
    button.style.backgroundColor = '';
    button.disabled = false;
    button.innerText = questionData.options[i];
    button.onclick = function () {
      if (isAnswering) {
        checkAnswer(questionData.options[i], questionData.correct, button);
      }
    };
  });
}

function checkAnswer(selectedOption, correctOption, selectedButton) {
  isAnswering = false;
  
  // Loop through buttons and color them based on correctness
  buttonElements.forEach(button => {
    if (button.innerText === correctOption) {
      button.style.backgroundColor = 'green'; // Correct answer is green
    } else if (button === selectedButton) {
      button.style.backgroundColor = 'red'; // Selected wrong answer is red
    }
    button.disabled = true; // Disable all buttons once an answer is selected
  });

  // Show feedback for correct or incorrect answer
  if (selectedOption === correctOption) {
    score++;
    feedbackElement.innerText = 'You Got It!😘'; // Correct answer feedback
    feedbackElement.style.color = 'green';
  } else {
    feedbackElement.innerText = 'Really🙄'; // Incorrect answer feedback
    feedbackElement.style.color = 'red';
  }

  // Move to the next question after 1.5 seconds
  setTimeout(() => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      feedbackElement.innerText = ''; // Clear feedback before next question
      displayQuestion(currentQuestionIndex);
    } else {
      endQuiz(); // End the quiz after the last question
    }
  }, 1500); // Wait for 1.5 seconds before moving to the next question
}

function endQuiz() {
  feedbackElement.innerText = ''; // Clear feedback text
  questionText.innerText = ''; // Clear question text

  // Hide the answer buttons
  buttonElements.forEach(button => {
    button.style.display = 'none';
  });

  // Display final score and restart button
  scoreElement.innerText = `Quiz finished. Your score is: ${score}`;
  restartButtonElement.style.display = 'block';
}

startButtonElement.addEventListener('click', startGame);
restartButtonElement.addEventListener('click', startGame);
