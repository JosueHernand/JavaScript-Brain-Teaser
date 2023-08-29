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


let currentQuestionIndex = 0;
let secondsLeft = 80;
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
    showQuestion(0);
    startCountdown();
}

function showQuestion(questionIndex) {
    questionEl.textContent = questions[questionIndex].question;
    answerButtons.forEach(function(button, index) {
        button.textContent = "";
        button.style.display = "none";
    });

    questions[questionIndex].answers.forEach(function(answer, index) {
        const button = answerButtons[index];
        button.textContent = answer.text;
        button.style.display = "block";
        button.addEventListener("click", function() {
            selectAnswer(answer.correct);
    });
});
}

function selectAnswer(isCorrect) {
    if (isCorrect) {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            showQuestion(currentQuestionIndex);
        } else {
            clearInterval(interval);
            showEndScreen();
        }
    } else {
        secondsLeft -= 10;

        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            showQuestion(currentQuestionIndex);
        } else {
            clearInterval(interval);
            showEndScreen();
        }
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
}

initialsForm.addEventListener("submit", submitInitials);