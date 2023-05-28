const loginStatus = localStorage.getItem('userEmail')
const logoutOption = document.getElementById("logout");
document.addEventListener("DOMContentLoaded", function() {
  const leaderBoard = document.getElementById("leardboard");
  const signUp = document.getElementById("signup");
  
  if (loginStatus) {
    logoutOption.style.display = "inline-block";
    leaderBoard.style.display = "inline-block";
    signUp.style.display = "none";
  } else {
    logoutOption.style.display = "none";
    leaderBoard.style.display = "none";
    signUp.style.display = "inline-block";
  }
});
logoutOption.addEventListener('click', function() {
  localStorage.clear();
});
