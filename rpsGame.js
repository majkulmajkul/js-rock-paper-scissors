const choices = [{name:"rock", beats:"scissors"}, {name:"paper", beats:"rock"}, {name:"scissors", beats:"rock"}]

function getComputerChoice() {

    
    const randomChoice = Math.floor(Math.random() * 3)

    return choices.map(choice => choice.name)[randomChoice]
}

function getPlayersChoice() {
    
    let choice = ""
    while (!choices.map(choice => choice.name).includes(choice)) {
        choice = prompt("Rock, Paper or Scissors?").toLowerCase();
    }

    return choice
}

function decide(computerChoice, playerChoice) {
    
    let winner = ""
    
    const theseChoices = [{name:"Computer", choice:computerChoice}, {name:"Player", choice:playerChoice}]






}

//console.log(decide(getComputerChoice(), getPlayersChoice()))

console.log(getComputerChoice())