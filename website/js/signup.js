 document.getElementById('signupForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const firstname = document.getElementById('firstname').value;
    const lastname = document.getElementById('lastname').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    fetch('http://localhost:3000//users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            firstname,
            lastname,
            email,
            password,
        }),
    })
    .then((response) => response.json())
    .then((data) => {
        if (data.status === 'success') {
            alert('User registered successfully');
        } else {
            alert('An error occurred');
        }
    })
    .catch((error) => console.error('Error:', error));
});
