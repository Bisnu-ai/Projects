//select element "dom"
const startscreen = document.getElementById("start-screen");
const quizscreen = document.getElementById("quiz-screen");
const resultscreen = document.getElementById("result-screen");
const startbutton = document.getElementById("start-btn");
const questiontext = document.getElementById("question-text");
const answerscontainer = document.getElementById("answers-container");
const currentquestionspan = document.getElementById("current-question");
const totalquestionsSpan = document.getElementById("total-questions");
const scorespan = document.getElementById("score");
const finalscoreSpan = document.getElementById("final-score");
const maxscorespan = document.getElementById("max-score");
const resultmessage = document.getElementById("result-message");
const restartbutton = document.getElementById("restart-btn");
const progressbar = document.getElementById("progress");

const quizquestion = [
  {
    question: "Which data structure uses FIFO order?",
    answers: [
      { text: "Stack", correct: false },
      { text: "Queue", correct: true },
      { text: "Tree", correct: false },
      { text: "Graph", correct: false },
    ],
  },
  {
    question: "What is the time complexity of binary search?",
    answers: [
      { text: "O(n)", correct: false },
      { text: "O(nlogn)", correct: false },
      { text: "O(log n)", correct: true },
      { text: "O(1)", correct: false },
    ],
  },
  {
    question: "In which traversal root visited first ?",
    answers: [
      { text: "Inorder", correct: false },
      { text: "Postorder", correct: false },
      { text: "Preorder", correct: true },
      { text: "Level order", correct: false },
    ],
  },
  {
    question: "Which data structure uses for function call?",
    answers: [
      { text: "Stack", correct: true },
      { text: "Queue", correct: false },
      { text: "Array", correct: false },
      { text: "Linked List", correct: false },
    ],
  },
  {
    question: "Which data structure uses BFS in a graph?",
    answers: [
      { text: "Stack", correct: false },
      { text: "Queue", correct: true },
      { text: "Array", correct: false },
      { text: "Tree", correct: false },
    ],
  },
];

let currentquestion = 0;
let score = 0;
let answersdisabled = false;

totalquestionsSpan.textContent = quizquestion.length;
maxscorespan.textContent = quizquestion.length;

startbutton.addEventListener("click", startquiz);
restartbutton.addEventListener("click", restartquiz);

function startquiz() {
  currentquestion = 0;
  scorespan.textContent = 0;

  startscreen.classList.remove("active");
  quizscreen.classList.add("active");
  showquestion();
}
function showquestion() {
  answersdisabled = false;
  const questionobj = quizquestion[currentquestion];

  currentquestionspan.textContent = currentquestion + 1;
  const progresspercent = (currentquestion / quizquestion.length) * 100;
  progressbar.style.width = progresspercent + "%";
  questiontext.textContent = questionobj.question;

  answerscontainer.innerHTML = "";
  questionobj.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.textContent = answer.text;
    button.classList.add("answer-btn");
    // dataset allow to store custom data
    button.dataset.correct = answer.correct;

    button.addEventListener("click", selectanswer);
    answerscontainer.appendChild(button);
  });
}
function selectanswer(event) {
  if (answersdisabled) return;

  answersdisabled = true;
  const selectedbtn = event.target;
  const iscorrect = selectedbtn.dataset.correct === "true";

  Array.from(answerscontainer.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    } else if(button===selectedbtn){
      button.classList.add("incorrect");
    }
  });
  if (iscorrect) {
    score++;
    scorespan.textContent = score;
  }
  setTimeout(() => {
    currentquestion++;
    if (currentquestion < quizquestion.length) {
      showquestion();
    } else {
      showresult();
    }
  }, 1000);
}
function showresult() {
  quizscreen.classList.remove("active");
  resultscreen.classList.add("active");
  finalscoreSpan.textContent = score;
  const percentage = (score / quizquestion.length) * 100;
  if (percentage === 100) {
    resultmessage.textContent = "Great,You are a genius...";
  } else if (percentage >= 80) {
    resultmessage.textContent = "Great job...";
  } else if (percentage >= 60) {
    resultmessage.textContent = "Keep Learning...";
  } else if (percentage >= 40) {
    resultmessage.textContent = "Not bad, try again to improve...";
  } else {
    resultmessage.textContent = "Learn more, you will get better";
  }
}
function restartquiz() {
  score = 0;
  
  currentquestion = 0;
  scorespan.textContent=0;
  startscreen.classList.add("active");
  quizscreen.classList.remove("active");
  resultscreen.classList.remove("active");
  scorespan.textContent = score;
}
