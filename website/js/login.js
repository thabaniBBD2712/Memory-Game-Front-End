document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    const response = await fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        email: email,
        password: password
      })
    });

    const result = await response.text();
    document.getElementById('loginStatus').textContent = result;
  } catch (error) {
    console.error('An error occurred:', error);
  }
});
