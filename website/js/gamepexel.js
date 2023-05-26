const selectors = {
  boardContainer: document.querySelector(".board-container"),
  board: document.querySelector(".board"),
  moves: document.querySelector(".moves"),
  timer: document.querySelector(".timer"),
  start: document.querySelector("button"),
  win: document.querySelector(".win"),
};

const state = {
  gameStarted: false,
  flippedCards: 0,
  totalFlips: 0,
  totalTime: 0,
  loop: null,
  score: 1000,
  user: null,
  images: [],
};

function updateUser(email) {
  state.user = email;
  console.log("Updated user:", state.user);
}

const userEmail = localStorage.getItem("userEmail");
if (userEmail) {
  updateUser(userEmail);
} else {
  window.location.href = "../pages/login.html";
  console.log("User email not found.");
}

const shuffle = (array) => {
  const clonedArray = [...array];
  for (let i = clonedArray.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    const original = clonedArray[i];
    clonedArray[i] = clonedArray[randomIndex];
    clonedArray[randomIndex] = original;
  }
  return clonedArray;
};
