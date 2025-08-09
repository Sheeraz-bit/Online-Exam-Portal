# Online-Exam-Portal

A simple Spring Boot (MVC) web app to manage online quizzes. Students can take a timed quiz and see their scores. Admins can manage quiz questions, view students, and see results. Data is stored in PostgreSQL.
<a href="https://www.buymeacoffee.com/SK_Sheeraz" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" style="height: 60px !important;width: 217px !important;" ></a>
---

## 🛠️ Technologies Used

- **Java 24**
- **Spring Boot (MVC)**
- **Spring Data JPA**
- **PostgreSQL**
- **Maven**
- **HTML, CSS, JavaScript**

---

## ✅ Features

- Student
  - Login / Signup
  - Start exam (10 random questions)
  - Question navigation (prev/next/skip)
  - 15-minute timer + auto-submit
  - Score displayed after submit
- Admin
  - Login
  - Quiz management (list/add/edit/delete)
  - View students and attempt status
  - View all results with timestamps

---

## 📄 Pages

- `index.html` – Login
- `signup.html` – Signup
- `student-dashboard.html` – Start exam
- `quiz.html` – Exam screen (timer + options)
- `result.html` – Student result
- `admin-dashboard.html` – Admin home
- `quiz-list.html` – Manage quiz questions
- `student-list.html` – Students
- `result-list.html` – All results

---

## 🧱 Database Tables

- `users` – user info (student/admin) + attempted flag
- `quiz_questions` – question + 4 options + correct answer (A/B/C/D)
- `results` – saved score per user with submit time

---

## 📊 ER Overview

| Table Name      | Primary Key | Foreign Keys             | Description                              |
|-----------------|-------------|--------------------------|------------------------------------------|
| `users`         | `id`        | -                        | Stores user data + role + attempt flag   |
| `quiz_questions`| `id`        | -                        | Questions with options and right answer  |
| `results`       | `id`        | `user_id` → users(id)    | Score per submission + timestamp         |

---

## 🧭 Architecture (MVC)

- Controller → Service → Repository → Entity
- Backend: REST APIs (JSON)
- Frontend: simple HTML/CSS/JS pages

---

## 🚀 How to Run

1) Prerequisites
- Java 17+
- PostgreSQL installed

2) Configure DB (file: `src/main/resources/application.properties`)
```
server.port=8082
spring.datasource.url=jdbc:postgresql://localhost:5432/YOUR_DB
spring.datasource.username=YOUR_USER
spring.datasource.password=YOUR_PASS
spring.jpa.hibernate.ddl-auto=none
spring.jpa.show-sql=true
```

3) Create tables (match the schema above) and insert some quiz questions.

4) Start the app
```
# Windows PowerShell
./mvnw spring-boot:run
```
Open: `http://localhost:8082`

---

## 🔎 Notes

- Roles are handled simply on the client for demo purposes
- Result is saved on submit and user `attempt` is set to true
- Frontend is kept minimal (no frameworks)

---

## Created By

- Human : 85%
- AI : 15% (Readme, Debugging Backend, Debugging Fruntend)

---

## Group Members
### Programmer(DB, Front end, Back end): (Group Leader)

- Name: Abdul Nabi Sheeraz
- Phone: 9022009241
- Email: sheeraz842122@gmail.com

### Superwiser:

- Name: Jaywanta Kawale
- Phone: 7028089058
- Email: jaywanta98@gmail.com

### Github Manager:

- Name: Shaikh Masum 
- Phone: 8830597819
- Email: shaikhmasum319051@gmail.com

### Debugger:

- Name: Pathan Faizan
- Phone: 8767025292
- Email: pathanfaizan8767@gmail.com

### CSS:

- Name: Abdul Muqtasid
- Phone: 7410717151
- Email: null
