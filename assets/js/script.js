const timeEl = document.querySelector(".time");
const startQuizButton = document.getElementById("start");
const bombEl = document.getElementById("bomb");

let secondsLeft = 999;
let interval;

startQuizButton.addEventListener("click", startQuiz);

function startQuiz() {
    startQuizButton.style.display = 'none';
    quizContainer.style.display = 'block';
    interval = setInterval(updateTimeer, 1000)
}

function setTime() {
 
    const timerInterval = setInterval(function() {
      secondsLeft--;
      timeEl.textContent = "Time: " + secondsLeft;
  
      if(secondsLeft === 0) {
        clearInterval(timerInterval);
        sendMessage();
      }
  
    }, 1000);
  }
  
  function sendMessage() {
     timeEl.textContent = " ";
     const imgEl = document.createElement("img");
     imgEl.setAttribute("src", "assets/images/explosion.jpg");
     imgEl.width = 500;
     bombEl.appendChild(imgEl);
  
    }
  
  setTime();