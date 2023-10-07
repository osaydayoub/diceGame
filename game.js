const startGameContainer = document.querySelector(".start-game-container");
const startGame1 = document.querySelector(".start-game1");
const startGame2 = document.querySelector(".start-game2");
const targetScoreInput = document.querySelector(".target-score");
const startGameButton = document.querySelector(".start-game-button");

const gameInProgressContainer = document.querySelector(".game-in-progress-container");

const player1Container = document.querySelector(".player1-container");
const score1 = document.querySelector(".score-1");
const message1 = document.querySelector(".message1");
const currentPoints1 = document.querySelector(".current-points-1");

const player2Container = document.querySelector(".player2-container");
const score2 = document.querySelector(".score-2");
const message2 = document.querySelector(".message2");
const currentPoints2 = document.querySelector(".current-points-2");
const newGameButton = document.querySelector("#new-game-button");
const img1 = document.querySelector("#img1");
const img2 = document.querySelector("#img2");
const rollDiceButton = document.querySelector("#roll-dice-button");
const holdButton = document.querySelector("#hold-button");


let targetScore = 100;
//saves players turn value 1/2
let turn = 1;
let dice1Value;
let dice2Value;
let plyer1TotalScore;
let plyer2TotalScore;
let play1CurrentScore;
let play2CurrentScore;


startGameButton.addEventListener("click", () => {
    targetScore = targetScoreInput.value;
    console.log(targetScore);
    if (targetScore > 0) {
        startTheGame();
    }
})



function startTheGame() {
    startGameContainer.style.display = "none";
    turn = 1;
    plyer1TotalScore = 0;
    plyer2TotalScore = 0;
    play1CurrentScore = 0;
    play2CurrentScore = 0;
}
//call play for playerNumber and updates the appropriate data
function play(playerNumber) {
    const diceValues = randomizeNumbers();
    console.log(diceValues);
    dice1Value = diceValues[0];
    dice2Value = diceValues[1];
    let curScore = dice1Value + dice2Value;
    img1.src = `./images/dice-${dice1Value}.png`
    img2.src = `./images/dice-${dice2Value}.png`
    if (playerNumber === 1) {
        play1CurrentScore += curScore;
        currentPoints1.textContent = play1CurrentScore;

    } else if (playerNumber === 2) {
        play2CurrentScore += curScore;
        currentPoints2.textContent = play2CurrentScore;
    }
}

rollDiceButton.addEventListener('click', () => {
    play(turn);
})

holdButton.addEventListener('click', () => {
    if (turn == 1) {
        plyer1TotalScore += play1CurrentScore;
        score1.textContent = plyer1TotalScore;
        play1CurrentScore=0;
        currentPoints1.textContent = play1CurrentScore;
        turn = 2;
    } else if (turn == 2) {
        plyer2TotalScore += play2CurrentScore;
        score2.textContent = plyer2TotalScore;
        play2CurrentScore=0;
        currentPoints2.textContent = play2CurrentScore;
        turn = 1;
    }
    console.log('the turn--->', turn);
})

const randomizeNumbers = () => {
    const rand1 = Math.ceil(Math.random() * 6)
    const rand2 = Math.ceil(Math.random() * 6)
    return [rand1, rand2];
}
