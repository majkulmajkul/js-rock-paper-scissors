const choices = [
  { name: "rock", beats: "scissors" },
  { name: "paper", beats: "rock" },
  { name: "scissors", beats: "rock" },
];

function getComputerChoice() {
  const randomChoice = Math.floor(Math.random() * 3);

  return choices.map((choice) => choice.name)[randomChoice];
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

let round;

const startButton = document.querySelector("#start-button");
const gameContainer = document.querySelector(".game-container");
const playerScoreElement = document.querySelector("#player-score");
const computerScoreElement = document.querySelector("#computer-score");
const rockButton = document.querySelector("#rock-button");
const paperButton = document.querySelector("#paper-button");
const scissorsButton = document.querySelector("#scissors-button");
const gameHistoryDiv = document.querySelector("#game-history");
const roundNumberSpan = document.querySelector("#round-number");
const tieBreakSpan = document.querySelector("#tie-break");
const buttonContainerDiv = document.querySelector(".buttons-container");
const roundContainerDiv = document.querySelector(".round-container");

startButton.addEventListener("click", startGame);
rockButton.addEventListener("click", () => oneRound("rock"));
paperButton.addEventListener("click", () => oneRound("paper"));
scissorsButton.addEventListener("click", () => oneRound("scissors"));

let playerScore;
let computerScore;

function startGame() {
  playerScore = 0;
  computerScore = 0;

  buttonContainerDiv.style.visibility = "visible";
  gameContainer.style.visibility = "visible";
  startButton.style.visibility = "hidden";
  playerScoreElement.textContent = playerScore;
  computerScoreElement.textContent = computerScore;
  round = 1;
  updateRoundNumber();
  gameOn = true;
  gameHistoryDiv.innerHTML = "";
  tieBreakSpan.style.visibility = "hidden";
  roundContainerDiv.style.visibility = "visible";
}

function setGameWon() {
  buttonContainerDiv.style.visibility = "hidden";
  startButton.style.visibility = "visible";
  roundContainerDiv.style.visibility = "hidden";
}

function setTieBreak() {
  tieBreakSpan.style.visibility = "visible";
}

function checkIfGameIsWon() {
  if (round >= 10) {
    if (playerScore === computerScore) {
      setTieBreak();
    } else if (playerScore > computerScore) {
      console.log("Player Won!");
    } else {
      console.log("Computer Won!");
    }
  }
}

function updateRoundNumber() {
  roundNumberSpan.textContent = round;
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
  const computerChoice = getComputerChoice();
  const result = decide(computerChoice, playerChoice);
  console.log(result);
  updateScore(result.winner);
  updateGameHistory(round, result.message);

  if (round >= 10) {
    if (playerScore === computerScore) {
      setTieBreak();
    } else {
      setGameWon();

      if (playerScore > computerScore) {
        console.log("Player Won!");
      } else {
        console.log("Computer Won!");
      }
    }
  }

  round++;
  updateRoundNumber();
}
