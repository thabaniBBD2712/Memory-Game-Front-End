
let signupBtn = document.getElementById("signupBtn");
let signinBtn = document.getElementById("signinBtn");
let nameField = document.getElementById("nameField");
let title = document.getElementById("title");

function validateSignupForm() {
	var email = document.getElementById("email").value;
	var fname = document.getElementById("firstname").value;
  var lname = document.getElementById("surname").value;
	var password = document.getElementById("password").value;
  var confirmPassword = document.getElementById("password-confirm").value;

	if (email === ""|| lname === ""  || fname === "" || password === ""|| confirmPassword === "" ) {
		document.getElementById("errorMsg").innerHTML = "Please fill the required fields"
		return false;
	}

  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
        document.getElementById("errorMsg").innerHTML = "Please enter a valid email address.";
    return false;
  }

  if (password !== confirmPassword){
    document.getElementById("errorMsg").innerHTML = "Passwords do not match"
		return false;
  }
	else if (password.length < 8) {
		document.getElementById("errorMsg").innerHTML = "Your password must include atleast 8 characters"
		return false;
	}
	else {
		alert("Successfully signed up");
		//Jacuzzi's function of signing in.
		return true;
	}
}
