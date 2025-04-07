// Quiz questions data
const quizQuestions = [
    {
        question: "What is the capital of France?",
        options: ["London", "Paris", "Berlin", "Madrid"],
        correctAnswer: 1
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Venus", "Mars", "Jupiter", "Saturn"],
        correctAnswer: 1
    },
    {
        question: "What is the largest mammal?",
        options: ["Elephant", "Blue Whale", "Giraffe", "Polar Bear"],
        correctAnswer: 1
    },
    {
        question: "Which language runs in a web browser?",
        options: ["Java", "C", "Python", "JavaScript"],
        correctAnswer: 3
    }
];

// DOM elements
const questionText = document.getElementById('questionText');
const optionsContainer = document.getElementById('optionsContainer');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const questionCount = document.getElementById('questionCount');
const progressBar = document.getElementById('progressBar');

// Quiz state
let currentQuestionIndex = 0;
let userAnswers = Array(quizQuestions.length).fill(null);

// Initialize quiz
function initQuiz() {
    showQuestion(currentQuestionIndex);
    updateProgress();
}

// Display question
function showQuestion(index) {
    const question = quizQuestions[index];
    questionText.textContent = question.question;
    
    // Clear previous options
    optionsContainer.innerHTML = '';
    
    // Create new options
    question.options.forEach((option, i) => {
        const optionElement = document.createElement('div');
        optionElement.className = `option ${userAnswers[index] === i ? 'selected' : ''}`;
        
        const radio = document.createElement('input');
        radio.type = 'radio';
        radio.name = 'answer';
        radio.id = `option${i}`;
        radio.value = i;
        radio.checked = userAnswers[index] === i;
        
        radio.addEventListener('change', () => {
            userAnswers[index] = i;
            optionElement.classList.add('selected');
        });
        
        const label = document.createElement('label');
        label.htmlFor = `option${i}`;
        label.textContent = option;
        
        optionElement.appendChild(radio);
        optionElement.appendChild(label);
        optionsContainer.appendChild(optionElement);
    });
    
    // Update navigation buttons
    prevBtn.disabled = index === 0;
    nextBtn.textContent = index === quizQuestions.length - 1 ? 'Finish' : 'Next';
    
    // Update question count
    questionCount.textContent = `Question ${index + 1} of ${quizQuestions.length}`;
}

// Update progress bar
function updateProgress() {
    const progress = ((currentQuestionIndex + 1) / quizQuestions.length) * 100;
    progressBar.style.width = `${progress}%`;
}

// Event listeners
prevBtn.addEventListener('click', () => {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        showQuestion(currentQuestionIndex);
        updateProgress();
    }
});

nextBtn.addEventListener('click', () => {
    // Validate answer before proceeding
    if (userAnswers[currentQuestionIndex] === null) {
        alert('Please select an answer before proceeding');
        return;
    }
    
    if (currentQuestionIndex < quizQuestions.length - 1) {
        currentQuestionIndex++;
        showQuestion(currentQuestionIndex);
        updateProgress();
    } else {
        // Quiz finished - redirect to results page
        localStorage.setItem('quizResults', JSON.stringify({
            totalQuestions: quizQuestions.length,
            correctAnswers: calculateScore(),
            userAnswers: userAnswers
        }));
        window.location.href = 'result.html';
    }
});

// Calculate score
function calculateScore() {
    let score = 0;
    userAnswers.forEach((answer, index) => {
        if (answer === quizQuestions[index].correctAnswer) {
            score++;
        }
    });
    return score;
}

// Initialize the quiz when page loads
document.addEventListener('DOMContentLoaded', initQuiz);