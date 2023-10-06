const startGameContainer = document.querySelector(".start-game-container");
const startGame1 = document.querySelector(".start-game1");
const startGame2 = document.querySelector(".start-game2");
const targetScoreInput = document.querySelector(".target-score");
const startGameButton = document.querySelector(".start-game-button");

let targetScore = 100;

startGameButton.addEventListener("click", () => {
    targetScore = targetScoreInput.value;
    console.log(targetScore);
    if (targetScore > 0) {
        startTheGame();
    }
})
function startTheGame() {
    startGameContainer.style.display = "none";

}
const randomizeNumbers = () => {
    const rand1 = Math.ceil(Math.random() * 6)
    const rand2 = Math.ceil(Math.random() * 6)
    console.log(rand1);
    console.log(rand2);
    return [rand1, rand2];
}
randomizeNumbers();