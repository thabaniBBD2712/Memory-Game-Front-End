fetch("https://thabanigame.azurewebsites.net/ola")
.then(response => response.json())
.then(data => {
  console.log(data);
  
  const tableBody = document.getElementById("scores-table-body");

  data.forEach((scoreValue, index) => {
    const { player_email, score } = scoreValue;

    const newRow = document.createElement("tr");

    const rankCell = document.createElement("td");
    rankCell.textContent = index + 1; 
    const userCell = document.createElement("td");
    userCell.textContent = player_email;
    const scoreCell = document.createElement("td");
    scoreCell.textContent = score;

    newRow.appendChild(rankCell);
    newRow.appendChild(userCell);
    newRow.appendChild(scoreCell);

    tableBody.appendChild(newRow);
  });
})
.catch(error => {
  console.error("Error fetching scores:", error);
});

const home = () => {
  window.location = '../pages/start.html';
};
