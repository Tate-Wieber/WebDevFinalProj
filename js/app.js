// Made with assistance from GitHub CoPilot
const app = document.getElementById("app");

const routes = {
  "": "components/home.html",
  "#home": "components/home.html",
  "#login": "components/login.html",
  "#register": "components/register.html",
  "#complete-review": "components/student/complete-review.html",
  "#feedback": "components/student/feedback.html",
  "#dashboard": "components/student/dashboard.html",
  "#report": "components/student/report.html"
};

async function loadView(path) {
  try {
    const res = await fetch(path);
    const html = await res.text();
    app.innerHTML = html;
    if (location.hash === "#register") {
      import("./register.js").then(mod => mod.toggleStudent && mod.toggleStudent());
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
