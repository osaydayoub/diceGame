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
let gameOn = false;
let turn = 1;
//0,1,2
let winnerPlayer = 0;
let dice1Value;
let dice2Value;
let plyer1TotalScore;
let plyer2TotalScore;
//roundScore
let roundScore1;
let roundScore2;
// firstCase secondCase
const WinLossMessage = [["You Win!", "Passed the target score"], ["You Win!,you reachd the target score", "You lose"]]

startGameButton.addEventListener("click", () => {
    targetScore = targetScoreInput.value;
    console.log(targetScore);
    if (targetScore > 0) {
        startTheGame();
    }
})

function startTheGame() {
    startGameContainer.style.display = "none";
    message1.style.display = "none";
    message2.style.display = "none";
    gameOn = true;
    turn = 1;
    plyer1TotalScore = 0;
    score1.textContent=0;
    plyer2TotalScore = 0;
    score2.textContent=0;
    roundScore1 = 0;
    currentPoints1.textContent=0;
    roundScore2 = 0;
    currentPoints2.textContent=0;
}
//call play for playerNumber and updates the appropriate data
function play(playerNumber) {
    const diceValues = randomizeNumbers();
    console.log(diceValues);
    dice1Value = diceValues[0];
    dice2Value = diceValues[1];
    let curScore = dice1Value + dice2Value;
    let change = false;
    img1.src = `./images/dice-${dice1Value}.png`
    img2.src = `./images/dice-${dice2Value}.png`
    //if the player rolls a double six all his round’s score gets lost.
    if (curScore === 12) {
        change = true;
        roundScore1 = 0;
        roundScore2 = 0;
        curScore = 0;
    }
    if (playerNumber === 1) {
        roundScore1 += curScore;
        currentPoints1.textContent = roundScore1;

    } else if (playerNumber === 2) {
        roundScore2 += curScore;
        currentPoints2.textContent = roundScore2;
    }
    if (change) {
        changeTurns();
    }
}

rollDiceButton.addEventListener('click', () => {
    if (gameOn) {
        play(turn);
    }
})

holdButton.addEventListener('click', () => {
    if (gameOn) {
        changeTurns();
        CallWinner();
    }
})

newGameButton.addEventListener('click', () => {
    startGame1.style.display = "none";
    startGameContainer.style.display = "block";
})

function changeTurns() {
    if (turn == 1) {
        plyer1TotalScore += roundScore1;
        score1.textContent = plyer1TotalScore;
        roundScore1 = 0;
        currentPoints1.textContent = roundScore1;
        turn = 2;
    } else if (turn == 2) {
        plyer2TotalScore += roundScore2;
        score2.textContent = plyer2TotalScore;
        roundScore2 = 0;
        currentPoints2.textContent = roundScore2;
        turn = 1;
    }
    console.log('the turn--->', turn);
}

const randomizeNumbers = () => {
    const rand1 = Math.ceil(Math.random() * 6)
    const rand2 = Math.ceil(Math.random() * 6)
    return [rand1, rand2];
}
function CallWinner() {
    let messageNum;
    if (plyer2TotalScore > targetScore) {
        winnerPlayer = 1;
        messageNum = 0;
        gameOn = false;
    } else if (plyer1TotalScore === targetScore) {
        winnerPlayer = 1;
        messageNum = 1;
        gameOn = false;
    } else if (plyer1TotalScore > targetScore) {
        winnerPlayer = 2;
        messageNum = 0;
        gameOn = false;
        writeWinnerLoserMessage(2, 0);
    } else if (plyer2TotalScore === targetScore) {
        winnerPlayer = 2;
        messageNum = 0;
        gameOn = false;
        writeWinnerLoserMessage(2, 1);
    }

    if (!gameOn) {
        writeWinnerLoserMessage(winnerPlayer, messageNum);
    }
}

function writeWinnerLoserMessage(playerNumber, messageNum) {
    if (playerNumber === 1) {
        message1.textContent = WinLossMessage[messageNum][0];
        message2.textContent = WinLossMessage[messageNum][1];

    } else if (playerNumber === 2) {
        message2.textContent = WinLossMessage[messageNum][0];
        message1.textContent = WinLossMessage[messageNum][1];
    }
    message1.style.display = "block";
    message2.style.display = "block";
}


