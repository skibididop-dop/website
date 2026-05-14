const tabs = {
  register: document.getElementById("register-tab"),
  login: document.getElementById("login-tab"),
};

function switchTab(target) {
  Object.values(tabs).forEach((tab) => tab.classList.remove("active"));
  tabs[target].classList.add("active");
}

document.querySelectorAll("[data-switch]").forEach((button) => {
  button.addEventListener("click", () => switchTab(button.dataset.switch));
});

function setMessage(elementId, text, isError = false) {
  const el = document.getElementById(elementId);
  if (!el) {
    console.error(`Element ${elementId} not found`);
    return;
  }
  el.textContent = text;
  el.classList.toggle("error", isError);
}

async function submitJSON(url, payload) {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Yêu cầu thất bại");
  }
  return data;
}

function showDashboard(user) {
  document.getElementById("auth-modal").style.display = "none";
  document.getElementById("dashboard").style.display = "block";
  document.getElementById("user-name").textContent = user.username;
  document.getElementById("user-username").textContent = user.username;
  document.getElementById("user-id").textContent = user.id;
  document.getElementById("user-role").textContent = user.role === "admin" ? "Quản trị viên" : "Người dùng";
  
  localStorage.setItem("user", JSON.stringify(user));
}

function showAuthModal() {
  document.getElementById("auth-modal").style.display = "block";
  document.getElementById("dashboard").style.display = "none";
  localStorage.removeItem("user");
}

// Check if user is already logged in
window.addEventListener("load", () => {
  const savedUser = localStorage.getItem("user");
  if (savedUser) {
    try {
      const user = JSON.parse(savedUser);
      showDashboard(user);
    } catch (error) {
      console.error("Error parsing saved user:", error);
      showAuthModal();
    }
  }
});

// Register form
const registerForm = document.getElementById("register-form");
if (registerForm) {
  registerForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    try {
      const result = await submitJSON("/api/register", {
        username: formData.get("username"),
        password: formData.get("password"),
        confirmPassword: formData.get("confirmPassword"),
      });

      setMessage("register-message", result.message);
      if (event.target && typeof event.target.reset === "function") {
        event.target.reset();
      }
      setTimeout(() => switchTab("login"), 1500);
    } catch (error) {
      setMessage("register-message", error.message, true);
    }
  });
}

// Login form
const loginForm = document.getElementById("login-form");
if (loginForm) {
  loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    try {
      const result = await submitJSON("/api/login", {
        username: formData.get("username"),
        password: formData.get("password"),
      });

      setMessage("login-message", result.message);
      if (event.target && typeof event.target.reset === "function") {
        event.target.reset();
      }
      
      // Redirect to dashboard
      setTimeout(() => {
        showDashboard(result.user);
      }, 800);
    } catch (error) {
      setMessage("login-message", error.message, true);
    }
  });
}

// Logout button
const logoutBtn = document.getElementById("logout-btn");
if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    showAuthModal();
    switchTab("login");
  });
}
