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
    return `Tie! You both chose ${playerChoice}`;
  } else {
    return `${winner} Wins! ${winnerToken} beats ${loserToken}`;
  }
}

console.log(decide(getComputerChoice(), getPlayersChoice()));
