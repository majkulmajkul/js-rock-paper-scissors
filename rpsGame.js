function getComputerChoice() {

    const choices = ["rock", "paper", "scissors"]
    const randomChoice = Math.floor(Math.random() * 3)

    return choices[randomChoice]
}

