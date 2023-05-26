document
.getElementById("loginForm")
.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (validateForm()) {
    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          email: email,
          password: password,
        }),
      });

      const result = await response.text();
      document.getElementById("loginStatus").textContent = result;
      console.log(result);

      if (result === "Login successful") {
        localStorage.setItem("userEmail", email);
        window.location.href = '../pages/start.html';
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }
});

function validateForm() {
const email = document.getElementById("email").value;
const password = document.getElementById("password").value;
const errorMsg = document.getElementById("errorMsg");

errorMsg.textContent = "";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if (!emailRegex.test(email)) {
  errorMsg.textContent = "Please enter a valid email address.";
  return false;
}

if (password.trim() === "") {
  errorMsg.textContent = "Please enter a password.";
  return false;
}

return true;
}