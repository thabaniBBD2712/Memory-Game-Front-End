const loginStatus = localStorage.getItem('userEmail');
const logoutOption = document.getElementById("logout");
const game = document.getElementById("game");
const leaderBoard = document.getElementById("leardboard");
const signUp = document.getElementById("signup");
const home = document.getElementById("home");

document.addEventListener("DOMContentLoaded", function() {
  const displayOption = loginStatus ? "inline-block" : "none";
  setElementDisplay(logoutOption, displayOption);
  setElementDisplay(leaderBoard, displayOption);
  setElementDisplay(game, displayOption);
  setElementDisplay(signUp, loginStatus ? "none" : "inline-block");
});

logoutOption.addEventListener('click', function() {
  localStorage.clear();
});

function setElementDisplay(element, display) {
  element.style.display = display;
}
