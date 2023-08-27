const timeEl = document.querySelector(".time");
const startQuizButton = document.getElementById("start");
const bombEl = document.getElementById("bomb");
const quizContainer = document.getElementById("quiz");

let secondsLeft = 999;
let interval;

startQuizButton.addEventListener("click", startQuiz);

function startQuiz() {
    startQuizButton.style.display = 'none';
    quizContainer.style.display = 'block';
    interval = setInterval(updateTimer, 1000)

    const container = document .querySelector(".container");
    container.style.display = "none";
}

function updateTimer() {
    secondsLeft--;
    timeEl.textContent = "Time: " + secondsLeft

    if (secondsLeft === 0) {
        clearInterval(interval);
        sendMessage();
    }
  }
  
  function sendMessage() {
     timeEl.textContent = " ";
     const imgEl = document.createElement("img");
     imgEl.setAttribute("src", "assets/images/explosion.jpg");
     imgEl.width = 500;
     bombEl.appendChild(imgEl);
  
    }
  
  setTime();