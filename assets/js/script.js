const startButton = document.getElementById("commence");
const quizContainer = document.getElementById("quiz");
const questionEl = document.getElementById("question");
const answerButtons = document.querySelectorAll(".answer");
const timeEl = document.querySelector(".time");
const container = document.querySelector(".container");
const endContainer = document.getElementById("end");
const finalScoreEl = document.getElementById("final-score");
const initialsForm = document.getElementById("initials-form");
const initialsInput = document.getElementById("initials");
const highScoresContainer = document.getElementById("high-scores");
const highScoresList = document.getElementById("high-scores-list");
const goBackButton = document.getElementById("go-back");
const clearScoresButton = document.getElementById("clear-scores");
const viewHighScoresButton = document.getElementById("view-high-scores");


let lastFeedbackContainer = null
let currentQuestionIndex = 0;
let secondsLeft = 80;
let highScores = [];
let highScore = 0;
let interval;

const questions = [
    {
        question: "Commonly used data types DO Not Include: ",
        answers: [
            {text: 'Strings', correct:false },
            {text: 'Booleans', correct:false },
            {text: 'Alerts', correct:true },
            {text: 'Numbers', correct:false },
        ],
     },

     {
        question: "The condition in an if / else statement is enclosed with ______. ",
        answers: [
            {text: 'Quotes', correct:false },
            {text: 'Curley Brackets', correct:false },
            {text: 'Parenthesis', correct:true },
            {text: 'Square Brackets', correct:false },
        ],
     },

     {
        question: "Arrays in JavaScript can be used to store ______. ",
        answers: [
            {text: 'Numbers and Strings', correct:false },
            {text: 'Other Arrays', correct:false },
            {text: 'Booleans', correct:false },
            {text: 'All of The Above', correct:true },
        ],
     },

     {
        question: "String values must be enclosed within ____ when being assigned to variables.",
        answers: [
            {text: 'Commas', correct:false },
            {text: 'Curley Brackets', correct:false },
            {text: 'Quotes', correct:true },
            {text: 'Parenthesis', correct:false },
        ],
     },

     {
        question: "A very useful tool used during development and debugging for printing content to the debugger is: ",
        answers: [
            {text: 'JavaScript', correct:false },
            {text: 'Terminal/Bash', correct:false },
            {text: 'For Loops', correct:false },
            {text: 'Console.log', correct:true },
        ],
     },
];

startButton.addEventListener("click", startQuiz);

function startQuiz() {
    startButton.style.display = "none";
    quizContainer.style.display = "block";
    container.style.display = "none";
    
    currentQuestionIndex = 0;
    secondsLeft = 80;
    highScore = 0;

    showQuestion(0);
    startCountdown();
}

function showQuestion(questionIndex) {
    if (questionIndex >= 0 && questionIndex < questions.length) {
        questionEl.textContent = questions[questionIndex].question;
        
        const answers = questions[questionIndex].answers;
        if (answers) {
            for (let i = 0; i < answerButtons.length; i++) {
                const button = answerButtons[i];
                const answer = answers[i];
                if (answer) {
                    button.textContent = answer.text;
                    button.style.display = "block";
                }
            }
        }

    questions[questionIndex].answers.forEach(function(answer, index) {
        const button = answerButtons[index];
        button.textContent = answer.text;
        button.style.display = "block";
        button.addEventListener("click", function() {
            selectAnswer(answer.correct);
        });
    });
}}

function selectAnswer(isCorrect) {
    const feedbackEl = document.createElement("p");
    feedbackEl.style.textAlign = "center";
    feedbackEl.style.fontSize = "25px";

    if (isCorrect) {
        feedbackEl.textContent = "Correct!";
        feedbackEl.style.color = "grey";
        highScore += 10;
    } else {
        feedbackEl.textContent = "Wrong!";
        feedbackEl.style.color = "grey";
        secondsLeft -= 10;
    }

    const feedbackContainer = document.createElement("div");
    feedbackContainer.style.marginTop = "10px";
    feedbackContainer.appendChild(feedbackEl);

    if (lastFeedbackContainer) {
        lastFeedbackContainer.remove();
    }

    lastFeedbackContainer = feedbackContainer;

    const answerButtonContainer = document.querySelector(".answer-buttons");
    answerButtonContainer.insertAdjacentElement("afterend", feedbackContainer);

    setTimeout(function () {
        feedbackContainer.remove();
    }, 500);

    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        setTimeout(function () {
            showQuestion(currentQuestionIndex);
        }, 400);
    } else {
        clearInterval(interval);
        setTimeout(function () {
            showEndScreen();
        }, 400);
    }
}

function startCountdown() {
    interval = setInterval(function () {
        timeEl.textContent = "Time: " + secondsLeft;       
        secondsLeft--;        
        if (secondsLeft < 0) {
            clearInterval(interval);
            timeEl.textContent = "Time's up!";
            showEndScreen();
        }
    }, 1000);
}

function showEndScreen() {
    quizContainer.style.display = "none";
    endContainer.style.display = "block";
    finalScoreEl.textContent = secondsLeft;

    const viewHighScoresButton = document.querySelector("#view-high-scores");
    if (!viewHighScoresButton && !highScoresContainer.style.display) {
    }
}

initialsForm.addEventListener("submit", submitInitials);

function showHighScores() {
    container.style.display = "none";
    quizContainer.style.display = "none";
    endContainer.style.display = "none";
    highScoresContainer.style.display = "block";

    displayHighScores();
}

function submitInitials(event) {
    event.preventDefault();

    const initials = initialsInput.value.trim().toUpperCase();
    if (initials === "") return;

    const newScore = { initials, score: highScore };
    highScores.push(newScore);

    localStorage.setItem("highScores", JSON.stringify(highScores));

    showHighScores();
}


function displayHighScores() {
    highScoresList.innerHTML = "";

    for (let i = 0; i < highScores.length; i++) {
        const score = highScores[i];
        const listItem = document.createElement("li");
        listItem.textContent = score.initials + ": " + score.score;
        highScoresList.appendChild(listItem);
    }
    
    const buttonsContainer = document.querySelector(".buttons-container");
    buttonsContainer.style.marginTop = (highScores.length * 1) + "px";
}

goBackButton.addEventListener("click", function () {
    highScoresContainer.style.display = "none";
    endContainer.style.display = "none";
    container.style.display = "block";
    startButton.style.display = "block";
});

clearScoresButton.addEventListener("click", function () {
    highScores = [];
    localStorage.removeItem("highScores");
    displayHighScores();
});

viewHighScoresButton.addEventListener("click", function(event) {
    event.preventDefault();
    showHighScores();
});