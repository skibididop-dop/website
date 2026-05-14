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
      setTimeout(() => switchTab("login"), 800);
    } catch (error) {
      setMessage("register-message", error.message, true);
    }
  });
}

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
    } catch (error) {
      setMessage("login-message", error.message, true);
    }
  });
}
