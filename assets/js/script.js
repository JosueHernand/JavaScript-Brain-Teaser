const timeEl = document.querySelector(".time");
const startQuizButton = document.getElementById("start");
const quizContainer = document.getElementById("quiz");
const bombEl = quizContainer.querySelector("#bomb");
const answerButtons = document.querySelectorAll(".answer");

let currentQuestionIndex = 0;
let secondsLeft = 999;
let interval;

startQuizButton.addEventListener("click", function () {
    startQuizButton.style.display = 'none';
    const container = document.querySelector(".container");
    container.style.display = "none";
    interval = setInterval(updateTimer, 1000);
    showQuestion(questionIds[currentQuestionIndex]);
});

function showQuestion(questionId) {
    const allQuestions = document.querySelectorAll("#quiz > div");
    for (let i = 0; i < allQuestions.length; i++) {
        allQuestions[i].style.display = "none";
    }
    document.getElementById(questionId).style.display = "block";
}

answerButtons.forEach(function(button) {
    button.addEventListener("click", function() {
        if (currentQuestionIndex < questionIds.length - 1) {
            currentQuestionIndex++;
            showQuestion(questionIds[currentQuestionIndex]);
        }
    });
});

function updateTimer() {
    secondsLeft--;
    timeEl.textContent = "Time: " + secondsLeft;

    if (secondsLeft === 0) {
        clearInterval(interval);
        sendMessage();
        
        if (currentQuestionIndex < questionIds.length - 1) {
            currentQuestionIndex++;
            showQuestion(questionIds[currentQuestionIndex]);
        }
    }
}
  
function sendMessage() {
    timeEl.textContent = " ";
    const imgEl = document.createElement("img");
    imgEl.setAttribute("src", "assets/images/explosion.jpg");
    imgEl.width = 500;
    bombEl.appendChild(imgEl);
}