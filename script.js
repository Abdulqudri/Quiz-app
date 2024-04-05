
const questions = [
  {
    question: "what is the largest animal?",
    answers: [
      {text: "shark", correct: false},
      {text: "blue whale", correct: true},
      {text: "elephant", correct: false},
      {text: "lion", correct: false}
    ]
  },
  {
    question: "what is the fastest animal?",
    answers: [
      {text: "cheeter", correct: false},
      {text: "falcon", correct: true},
      {text: "jaguar", correct: false},
      {text: "lion", correct: false}
    ]
  },
  {
    question: "which of this is a wild animal?",
    answers: [
      {text: "dog", correct: false},
      {text: "cow", correct: false},
      {text: "leopard", correct: true},
      {text: "goat", correct: false}
    ]
  },
  {
    question: "which of this is a ruminant animal?",
    answers: [
      {text: "cow", correct: true},
      {text: "dog", correct: false},
      {text: "pig", correct: false},
      {text: "cat", correct: false}
    ]
  }
];

const questionElement = document.querySelector("#question");

const answerButtons = document.querySelector("#answer-buttons");

const nextButton = document.querySelector("#next-btn");

const skipButton = document.querySelector("#skip-btn");

let currentQuestionIndex = 0

let score = 0

const startQuiz = () => {
  currentQuestionIndex = 0
  score = 0
  nextButton.innerHTML = "next";
  showQuestion()
}

const showQuestion = () => {
  resetState()
  currentQuestion = questions[currentQuestionIndex];
  questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = `${questionNo}. ${currentQuestion.question}`;
  
  currentQuestion.answers.forEach(answer=>{
    const button = document.createElement('button');
    button.innerHTML = answer.text;
    button.classList.add('btn')
    answerButtons.appendChild(button);
    if(answer.correct){
      button.dataset.correct = answer.correct
    }
    button.addEventListener("click", selectAnswer)
  })
}

const resetState = () => {
  nextButton.style.display = 'none';
  skipButton.style.display = 'block';
  while(answerButtons.firstChild){
    answerButtons.removeChild(answerButtons.firstChild)
  }
  
}

const selectAnswer = e => {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true"
  if (isCorrect){
    selectedBtn.classList.add('correct');
    score++
  }else {
    selectedBtn.classList.add('incorrect')
  }
  Array.from(answerButtons.children).forEach(button => {
    if (button.dataset.correct === "true"){
      button.classList.add('correct')
    }
    button.disabled = true;
  })
  skipButton.style.display = 'none'
  nextButton.style.display = 'block'
}

nextButton.addEventListener('click', () => {
  if(currentQuestionIndex < questions.length){
    handleNextButton()
  }else {
    startQuiz()
  }
})

skipButton.addEventListener('click', () => {
  if(currentQuestionIndex < questions.length){
    handleNextButton()
  }else {
    startQuiz()
  }
})

const handleNextButton = () => {
  currentQuestionIndex++
  if (currentQuestionIndex < questions.length){
    showQuestion()
  }else {
    showScore()
  }
}

const showScore = () => {
  resetState()
  questionElement.innerHTML = `You scored ${score} out of ${questions.length}`;
  nextButton.innerHTML = "Play Again";
  
  skipButton.style.display = "none";
  nextButton.style.display = "block";
  
}

startQuiz();







