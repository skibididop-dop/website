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

document.getElementById("register-form").addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);

  try {
    const result = await submitJSON("/api/register", {
      username: formData.get("username"),
      password: formData.get("password"),
      confirmPassword: formData.get("confirmPassword"),
    });

    setMessage("register-message", result.message);
    event.currentTarget.reset();
    setTimeout(() => switchTab("login"), 800);
  } catch (error) {
    setMessage("register-message", error.message, true);
  }
});

document.getElementById("login-form").addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);

  try {
    const result = await submitJSON("/api/login", {
      username: formData.get("username"),
      password: formData.get("password"),
    });

    setMessage("login-message", result.message);
  } catch (error) {
    setMessage("login-message", error.message, true);
  }
});
