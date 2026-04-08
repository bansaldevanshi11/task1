// Quiz Questions
const questions = [
    {
        question: "What does HTML stand for?",
        options: ["Hyper Text Markup Language", "High Tech Modern Language", "Home Tool Markup Language", "Hyperlinks Text Mark Language"],
        correct: 0
    },
    {
        question: "Which CSS property changes text color?",
        options: ["text-color", "font-color", "color", "text-style"],
        correct: 2
    },
    {
        question: "How do you declare a JavaScript variable?",
        options: ["variable x = 5", "let x = 5", "v x = 5", "declare x = 5"],
        correct: 1
    },
    {
        question: "Which HTML tag is for the largest heading?",
        options: ["<heading>", "<h6>", "<head>", "<h1>"],
        correct: 3
    },
    {
        question: "What does CSS stand for?",
        options: ["Creative Style Sheets", "Computer Style Sheets", "Cascading Style Sheets", "Colorful Style Sheets"],
        correct: 2
    }
];

let currentQuestion = 0;
let score = 0;
let answered = false;

// DOM Elements
const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultScreen = document.getElementById('result-screen');
const questionEl = document.getElementById('question');
const optionsEl = document.getElementById('options');
const feedbackEl = document.getElementById('feedback');
const progressEl = document.getElementById('progress');
const questionCountEl = document.getElementById('question-count');
const scoreEl = document.getElementById('score');
const messageEl = document.getElementById('message');

// Start Quiz
function startQuiz() {
    startScreen.classList.add('hidden');
    quizScreen.classList.remove('hidden');
    currentQuestion = 0;
    score = 0;
    loadQuestion();
}

// Load Question
function loadQuestion() {
    answered = false;
    feedbackEl.textContent = '';
    feedbackEl.className = 'feedback';
    
    const q = questions[currentQuestion];
    questionEl.textContent = q.question;
    questionCountEl.textContent = `Question ${currentQuestion + 1} of ${questions.length}`;
    progressEl.style.width = ((currentQuestion) / questions.length) * 100 + '%';
    
    optionsEl.innerHTML = '';
    q.options.forEach((option, index) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.textContent = option;
        btn.onclick = () => selectAnswer(index);
        optionsEl.appendChild(btn);
    });
}

// Select Answer
function selectAnswer(selected) {
    if (answered) return;
    answered = true;
    
    const q = questions[currentQuestion];
    const buttons = optionsEl.querySelectorAll('.option-btn');
    buttons.forEach(btn => btn.disabled = true);
    
    if (selected === q.correct) {
        score++;
        buttons[selected].classList.add('correct');
        feedbackEl.textContent = '✓ Correct!';
        feedbackEl.className = 'feedback correct';
    } else {
        buttons[selected].classList.add('wrong');
        buttons[q.correct].classList.add('correct');
        feedbackEl.textContent = '✗ Wrong!';
        feedbackEl.className = 'feedback wrong';
    }
    
    setTimeout(() => {
        currentQuestion++;
        if (currentQuestion < questions.length) {
            loadQuestion();
        } else {
            showResults();
        }
    }, 1500);
}

// Show Results
function showResults() {
    quizScreen.classList.add('hidden');
    resultScreen.classList.remove('hidden');
    progressEl.style.width = '100%';
    scoreEl.textContent = `Your Score: ${score}/${questions.length}`;
    
    const percentage = (score / questions.length) * 100;
    if (percentage === 100) messageEl.textContent = '🌟 Perfect!';
    else if (percentage >= 80) messageEl.textContent = '🎉 Excellent!';
    else if (percentage >= 60) messageEl.textContent = '👍 Good job!';
    else messageEl.textContent = '💪 Keep practicing!';
}

// Restart Quiz
function restartQuiz() {
    resultScreen.classList.add('hidden');
    startScreen.classList.remove('hidden');
}
