const choices = ["rock", "paper", "scissors"]

function getComputerChoice() {

    
    const randomChoice = Math.floor(Math.random() * 3)

    return choices[randomChoice]
}

function getPlayersChoice() {
    
    let choice = ""
    while (!choices.includes(choice)) {
        choice = prompt("Rock, Paper or Scissors?").toLowerCase();
    }

    return choice
}

