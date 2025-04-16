// js/app.js

const app = document.getElementById("app");

// SPA routes for student and instructor views
const routes = {
  "": "components/home.html",
  "#home": "components/home.html",
  "#login": "components/login.html",
  "#register": "components/register.html",

  // Student routes
  "#complete-review": "components/student/complete-review.html",
  "#feedback": "components/student/feedback.html",
  "#dashboard": "components/student/dashboard.html",
  "#report": "components/student/report.html",

  // Instructor routes
  "#instructor-dashboard": "components/instructor/dashboard.html",
  "#instructor-create-course": "components/instructor/create-course.html",
  "#instructor-create-review": "components/instructor/create-review.html",
  "#instructor-create-team": "components/instructor/create-team.html",
  "#instructor-feedback": "components/instructor/feedback.html",
  "#instructor-load-students": "components/instructor/load-students.html",
  "#instructor-report": "components/instructor/report.html",
  "#instructor-schedule": "components/instructor/schedule.html"
};

// Load and inject HTML view into #app
async function loadView(path) {
  try {
    const res = await fetch(path);
    const html = await res.text();
    app.innerHTML = html;

    // Register form logic
    if (location.hash === "#register") {
      import("./register.js").then(mod => mod.toggleStudent && mod.toggleStudent());
    }

    // Login button handler (mock login)
    if (location.hash === "#login") {
      const btn = document.getElementById("btnLogin");
      if (btn) {
        btn.addEventListener("click", () => {
          const email = document.getElementById("txtEmail").value;
          const password = document.getElementById("txtPassword").value;

          if (email && password) {
            // Set login state and role based on dummy check (set as instructor if email contains "instructor")
            localStorage.setItem("isLoggedIn", "true");
            const role = email.includes("instructor") ? "instructor" : "student";
            localStorage.setItem("role", role);

            // Redirect to appropriate dashboard
            location.hash = role === "instructor" ? "#instructor-dashboard" : "#dashboard";
          } else {
            alert("Enter email and password.");
          }
        });
      }
    }

    // Protect routes by role
    const protectedRoutes = {
      student: ["#dashboard", "#complete-review", "#feedback", "#report"],
      instructor: [
        "#instructor-dashboard",
        "#instructor-create-course",
        "#instructor-create-review",
        "#instructor-create-team",
        "#instructor-feedback",
        "#instructor-load-students",
        "#instructor-report",
        "#instructor-schedule"
      ]
    };

    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    const userRole = localStorage.getItem("role");

    // Redirect based on user role if not allowed
    for (const [role, routes] of Object.entries(protectedRoutes)) {
      if (routes.includes(location.hash)) {
        if (!isLoggedIn || userRole !== role) {
          location.hash = "#login";
          return;
        }
      }
    }
  } catch (err) {
    app.innerHTML = `<div class="text-light">Error loading view: ${path}</div>`;
    console.error(err);
  }
}

function router() {
  const path = routes[location.hash] || routes[""];
  loadView(path);
}

window.addEventListener("hashchange", router);
window.addEventListener("load", router);
