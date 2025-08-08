let questions = [];
let currentQuestionIndex = 0;
let score = 0;
let timer;

async function loadQuestions() {
    try {
        const res = await fetch("http://localhost:8082/questions/random"); // backend endpoint
        if (!res.ok) throw new Error("Failed to fetch questions");
        questions = await res.json();
        startTimer(15 * 60); // 15 minutes
        showQuestion();
    } catch (err) {
        console.error(err);
        alert("Unable to load questions. Please try again later.");
    }
}

function showQuestion() {
    const q = questions[currentQuestionIndex];
    if (!q) {
        endQuiz();
        return;
    }

    document.getElementById("question").innerText = q.question;
    document.getElementById("options").innerHTML = `
        <label><input type="radio" name="option" value="${q.opta}"> ${q.opta}</label><br>
        <label><input type="radio" name="option" value="${q.optb}"> ${q.optb}</label><br>
        <label><input type="radio" name="option" value="${q.optc}"> ${q.optc}</label><br>
        <label><input type="radio" name="option" value="${q.optd}"> ${q.optd}</label><br>
    `;
}

function nextQuestion() {
    const selectedOption = document.querySelector('input[name="option"]:checked');
    if (!selectedOption) {
        alert("Please select an answer!");
        return;
    }

    if (selectedOption.value === questions[currentQuestionIndex].answer) {
        score++;
    }

    currentQuestionIndex++;
    showQuestion();
}

function startTimer(duration) {
    let time = duration;
    timer = setInterval(() => {
        let minutes = Math.floor(time / 60);
        let seconds = time % 60;
        document.getElementById("timer").innerText = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
        time--;

        if (time < 0) {
            clearInterval(timer);
            endQuiz();
        }
    }, 1000);
}

function endQuiz() {
    clearInterval(timer);
    document.getElementById("quiz-container").innerHTML = `
        <h2>Quiz Completed!</h2>
        <p>Your score is ${score} out of ${questions.length}</p>
    `;
}

// Start when page loads
window.onload = loadQuestions;
