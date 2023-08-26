const timeEl = document.querySelector(".time");

const bombEl = document.getElementById("bomb");

let secondsLeft = 80;

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
     bombEl.appendChild(imgEl);
  
    }
  
  setTime();