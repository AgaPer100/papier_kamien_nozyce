const choices = document.querySelectorAll('.choice');
const score = document.getElementById('score');
const result = document.getElementById('result');
const restart = document.getElementById('restart');
const modal = document.querySelector('.modal');
const scoreboard = {
    player: 0,
    computer: 0
}

//Play game
function play(e) {
    restart.style.display = 'inline-block';
    const playerChoice = e.target.id;
    const computerChoice = getComputerChoice();
    const winner = getWinner(playerChoice, computerChoice);
    showWinner(winner, computerChoice);
}

//Get computer choice
function getComputerChoice() {
    const rand = Math.random();
    if (rand < 0.34) {
        return 'kamień';
    } else if (rand <= 0.67) {
        return 'papier';
    } else {
        return 'nożyce';
    }
}

//Get game winner
function getWinner(p, c) {
    if (p === c) {
        return 'remis';
    } else if (p === 'kamień') {
        if (c === 'papier') {
            return 'computer';
        } else {
            return 'player';
        }
    } else if (p === 'papier') {
        if (c === 'nożyce') {
            return 'computer';
        } else {
            return 'player';
        }
    } else if (p === 'nożyce') {
        if (c === 'kamień') {
            return 'computer';
        } else {
            return 'player';
        }
    }
}

function showWinner(winner, computerChoice) {
    if (winner === 'player') {
        //Inc player score
        scoreboard.player++;
        // Show modal result
        result.innerHTML = `
        <h1 class="text-win">Wygrałeś!</h1>
        <i class="fas fa-hand-${computerChoice} fa-10x"></i>
        <p>Wybór komputera <strong>${computerChoice}</strong></p>
        `;
    } else if (winner === 'computer') {
        //Inc player score
        scoreboard.computer++;
        // Show modal result
        result.innerHTML = `
        <h1 class="text-lose">Przegrałeś</h1>
        <i class="fas fa-hand-${computerChoice} fa-10x"></i>
        <p>Wybór komputera <strong>${computerChoice}</strong></p>
        `;
    } else {
        result.innerHTML = `
        <h1>Remis</h1>
        <i class="fas fa-hand-${computerChoice} fa-10x"></i>
        <p>Wybór komputera <strong>${computerChoice}</strong></p>
        `;
    }

    //Show score
    score.innerHTML = `
        <p>Gracz: ${scoreboard.player}</p>
        <p>Komputer: ${scoreboard.computer}</p>
        `;

    modal.style.display = 'block';
}

//Restart game
function restartGame() {
    scoreboard.player = 0;
    scoreboard.computer = 0;
    score.innerHTML = `
    <p>Gracz: 0</p>
    <p>Komputer: 0</p>
    `;
}

//Clear modal
function clearModal(e) {
    if (e.target == modal) {
        modal.style.display = 'none';
    }
}


//Event listeners
choices.forEach(choice => choice.addEventListener('click', play));
window.addEventListener('click', clearModal);
restart.addEventListener('click', restartGame);