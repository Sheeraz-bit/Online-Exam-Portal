document.getElementById("loginForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    try {
        const response = await fetch("http://localhost:8082/api/user/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        if (!response.ok) {
            alert("Invalid email or password");
            return;
        }

        const user = await response.json();

        // Save user
        localStorage.setItem("loggedInUser", JSON.stringify(user));

        // Redirecting the user to the dashboard
        if (user.role === "student") {
            window.location.href = "student-dashboard.html";
        } else if (user.role === "admin") {
            window.location.href = "admin-dashboard.html";
        } else {
            alert("Unknown role");
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Something went wrong");
    }
});
