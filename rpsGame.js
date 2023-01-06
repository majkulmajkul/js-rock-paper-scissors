const choices = [
  { name: "rock", beats: "scissors" },
  { name: "paper", beats: "rock" },
  { name: "scissors", beats: "rock" },
];

function getComputerChoice() {
  const randomChoice = Math.floor(Math.random() * 3);

  return choices.map((choice) => choice.name)[randomChoice];
}

function getPlayersChoice() {
  let choice = "";
  while (!choices.map((choice) => choice.name).includes(choice)) {
    choice = prompt("Rock, Paper or Scissors?").toLowerCase();
  }

  return choice;
}

function decide(computerChoice, playerChoice) {
  let winner = "";
  let winnerToken = "";
  let loserToken = "";

  const playersChoices = [
    { name: "Computer", choice: computerChoice },
    { name: "Player", choice: playerChoice },
  ];

  playersChoices.forEach((thisPlayerChoice) => {
    let otherPlayerChoice = playersChoices.filter(
      (playerChoice) => playerChoice.name !== thisPlayerChoice.name
    )[0];

    choices.forEach((choice) => {
      if (
        thisPlayerChoice.choice === choice.name &&
        otherPlayerChoice.choice === choice.beats
      ) {
        winner = thisPlayerChoice.name;
        winnerToken = thisPlayerChoice.choice;
        loserToken = otherPlayerChoice.choice;
      }
    });
  });

  if (winner === "") {
    return { winner: null, message: `Tie! You both chose ${playerChoice}` };
  } else {
    return {
      winner: winner,
      message: `${winner} Wins! ${winnerToken} beats ${loserToken}`,
    };
  }
}

//for (let i = 0; i < 10; i++) {
//  console.log(decide(getComputerChoice(), getPlayersChoice()));
// }

//Start game:
// Display score
// Display options - R P S -> update getPlayerChoice function
// X rounds: get choice, update scores
// End Game

let gameOn = false;
let round = 1;

const startButton = document.querySelector("#start-button");
const gameContainer = document.querySelector(".game-container");
const playerScoreElement = document.querySelector("#player-score");
const computerScoreElement = document.querySelector("#computer-score");
const rockButton = document.querySelector("#rock-button");
const paperButton = document.querySelector("#paper-button");
const scissorsButton = document.querySelector("#scissors-button");
const gameHistoryDiv = document.querySelector("#game-history");

startButton.addEventListener("click", startGame);
rockButton.addEventListener("click", () => oneRound("rock"));
paperButton.addEventListener("click", () => oneRound("paper"));
scissorsButton.addEventListener("click", () => oneRound("scissors"));

let playerScore;
let computerScore;

function startGame() {
  playerScore = 0;
  computerScore = 0;

  gameContainer.style.visibility = "visible";
  startButton.style.visibility = "hidden";
  playerScoreElement.textContent = playerScore;
  computerScoreElement.textContent = computerScore;
  gameOn = true;
  round = 1;
}

function updateScore(winner) {
  if (winner === "Player") {
    playerScore++;
    playerScoreElement.textContent = playerScore;
  } else if (winner === "Computer") {
    computerScore++;
    computerScoreElement.textContent = computerScore;
  }
}

function updateGameHistory(round, text) {
  const historyLogItemWrapper = document.createElement("p");
  historyLogItemWrapper.className = "history-log-item";
  const historyLogItem = document.createElement("small");

  historyLogItem.textContent = `Round ${round}: ${text}`;
  historyLogItemWrapper.appendChild(historyLogItem);
  gameHistoryDiv.appendChild(historyLogItemWrapper);
}

function oneRound(playerChoice) {
  const result = decide(getComputerChoice(), playerChoice);
  console.log(result);
  updateScore(result.winner);
  updateGameHistory(round, result.message);
  round++;
}
