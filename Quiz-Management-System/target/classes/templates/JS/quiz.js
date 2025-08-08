const API_URL = "http://localhost:8082/questions/random";
const RESULT_API_URL = "http://localhost:8082/api/results/submit";

let questions = [];
let currentQuestionIndex = 0;
let answers = {};
let timer; // to store interval
let timeLeft = 15 * 60; // 15 minutes in seconds

// Assume you have userId stored somewhere (e.g. after login)
const userId = localStorage.getItem("userId"); // adjust as needed

// Elements
const questionNavDiv = document.getElementById("question-nav");
const questionTextDiv = document.getElementById("question-text");
const optionsDiv = document.getElementById("options");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const skipBtn = document.getElementById("skip-btn");
const submitBtn = document.getElementById("submit-btn");
const timerDiv = document.getElementById("timer");

async function loadQuestions() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("Failed to fetch questions");
    questions = await response.json();

    if (!questions.length) {
      alert("No questions found!");
      return;
    }

    renderQuestionNav();
    showQuestion(0);
    startTimer();
  } catch (error) {
    alert(error.message);
  }
}

function renderQuestionNav() {
  questionNavDiv.innerHTML = "";
  questions.forEach((q, i) => {
    const btn = document.createElement("button");
    btn.textContent = i + 1;
    btn.className = "question-nav-btn";
    if (answers[i] !== undefined) btn.classList.add("answered");
    if (i === currentQuestionIndex) btn.classList.add("current");
    btn.addEventListener("click", () => showQuestion(i));
    questionNavDiv.appendChild(btn);
  });
}

function showQuestion(index) {
  currentQuestionIndex = index;
  const q = questions[index];

  // Update nav buttons
  [...questionNavDiv.children].forEach((btn, i) => {
    btn.classList.toggle("current", i === index);
  });

  questionTextDiv.textContent = q.questionText;

  optionsDiv.innerHTML = "";
  ["optionA", "optionB", "optionC", "optionD"].forEach((optKey, i) => {
    const optionText = q[optKey];
    const optionId = `option-${index}-${i}`;

    const label = document.createElement("label");
    label.setAttribute("for", optionId);
    label.textContent = optionText;

    const radio = document.createElement("input");
    radio.type = "radio";
    radio.name = "options";
    radio.id = optionId;
    radio.value = optionText;
    if (answers[index] === optionText) radio.checked = true;

    radio.addEventListener("change", () => {
      answers[index] = radio.value;
      renderQuestionNav(); // update answered status
    });

    optionsDiv.appendChild(radio);
    optionsDiv.appendChild(label);
    optionsDiv.appendChild(document.createElement("br"));
  });

  updateButtons();
}

function updateButtons() {
  prevBtn.disabled = currentQuestionIndex === 0;
  nextBtn.disabled = currentQuestionIndex === questions.length - 1;
}

prevBtn.addEventListener("click", () => {
  if (currentQuestionIndex > 0) showQuestion(currentQuestionIndex - 1);
});

nextBtn.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length - 1) showQuestion(currentQuestionIndex + 1);
});

skipBtn.addEventListener("click", () => {
  // Mark unanswered question as skipped (optional)
  answers[currentQuestionIndex] = null;
  renderQuestionNav();
  if (currentQuestionIndex < questions.length - 1) {
    showQuestion(currentQuestionIndex + 1);
  }
});

submitBtn.addEventListener("click", () => {
  if (!confirm("Are you sure you want to submit the exam?")) return;
  submitExam();
});

function startTimer() {
  updateTimerDisplay();
  timer = setInterval(() => {
    timeLeft--;
    if (timeLeft <= 0) {
      clearInterval(timer);
      alert("Time's up! Your exam will be submitted automatically.");
      submitExam();
      return;
    }
    updateTimerDisplay();
  }, 1000);
}

function updateTimerDisplay() {
  const mins = Math.floor(timeLeft / 60).toString().padStart(2, "0");
  const secs = (timeLeft % 60).toString().padStart(2, "0");
  timerDiv.textContent = `Time Left: ${mins}:${secs}`;
}

async function submitExam() {
  clearInterval(timer);

  // Calculate score
  let score = 0;
  questions.forEach((q, i) => {
    if (answers[i] === q.correctAnswer) score++;
  });

  try {
    const response = await fetch(RESULT_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: Number(userId), score }),
    });

    if (!response.ok) throw new Error("Failed to submit result");

    alert(`Exam submitted successfully! Your score is: ${score} / ${questions.length}`);
    // Redirect or show result page
    window.location.href = "result.html"; // or wherever
  } catch (error) {
    alert(error.message);
  }
}

loadQuestions();
