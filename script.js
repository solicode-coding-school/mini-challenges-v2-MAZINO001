// const playBoard = document.querySelector(".play-board");
// const scoreElement = document.querySelector(".score");
// const highestScoreElement = document.querySelector(".highest-score");
// let gameOver = false;
// let foodX, foodY;
// let snakeX = 15;
// let snakeY = 15;
// let velocityX = 0;
// let velocityY = 0;
// let snakeBody = [];
// let setIntervalId;
// let score = 0;

// let highestScore = localStorage.getItem("highest-score") || 0;
// highestScoreElement.innerText = `High Score: ${highestScore}`;

// function foodGeneration() {
//   foodX = Math.floor(Math.random() * 30) + 1;
//   foodY = Math.floor(Math.random() * 30) + 1;
// }

// function handleGameOver() {
//   clearInterval(setIntervalId);
//   const gameOverContainer = document.querySelector(".game_over");
//   const playAgainBtn = document.querySelector("#play_again");
//   const coverAll = document.querySelector(".cover_All");
//   let endGameScore = gameOverContainer.querySelector("#score");
//   console.log();
//   endGameScore.innerText = `Your Score is : ${score}`;
//   coverAll.style.display = "block";
//   gameOverContainer.style.display = "flex";
//   playAgainBtn.addEventListener("click", () => {
//     gameOverContainer.style.display = "none";
//     coverAll.style.display = "none";
//     location.reload();
//   });
// }

// function changeDirection(e) {
//   if (e.key === "ArrowUp" && velocityY !== 1) {
//     velocityX = 0;
//     velocityY = -1;
//   } else if (e.key === "ArrowDown" && velocityY !== -1) {
//     velocityX = 0;
//     velocityY = 1;
//   } else if (e.key === "ArrowLeft" && velocityX !== 1) {
//     velocityX = -1;
//     velocityY = 0;
//   } else if (e.key === "ArrowRight" && velocityX !== -1) {
//     velocityX = 1;
//     velocityY = 0;
//   }
// }

// function stratGame() {
//   if (gameOver) return handleGameOver();

//   if (snakeX === foodX && snakeY === foodY) {
//     foodGeneration();
//     snakeBody.push([snakeX, snakeY]);
//     score++;
//     highestScore = Math.max(score, highestScore);
//     localStorage.setItem("highest-score", highestScore);
//     scoreElement.innerText = `Score: ${score}`;
//     highestScoreElement.innerText = `High Score: ${highestScore}`;
//   }

//   const newHead = [snakeX + velocityX, snakeY + velocityY];

//   if (snakeBody.length > 0) {
//     for (let i = snakeBody.length - 1; i > 0; i--) {
//       snakeBody[i] = snakeBody[i - 1];
//     }
//     snakeBody[0] = [snakeX, snakeY];
//   }

//   snakeX = newHead[0];
//   snakeY = newHead[1];
//   if (snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30) {
//     return (gameOver = true);
//   }
//   for (let i = 0; i < snakeBody.length; i++) {
//     if (
//       i !== 0 &&
//       newHead[0] === snakeBody[i][0] &&
//       newHead[1] === snakeBody[i][1]
//       // snakeBody[0][0] === snakeBody[i][0] &&
//       // snakeBody[0][1] === snakeBody[i][1]
//     ) {
//       gameOver = true;
//     }
//   }

//   let html = "";
//   html += `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`;
//   html += `<div class="head" style="grid-area: ${snakeY} / ${snakeX}"></div>`;

//   for (let i = 0; i < snakeBody.length; i++) {
//     const segment = snakeBody[i];
//     html += `<div class="body" style="grid-area: ${segment[1]} / ${segment[0]}"></div>`;
//   }

//   playBoard.innerHTML = html;
// }

// foodGeneration();
// setIntervalId = setInterval(stratGame, 100);
// document.addEventListener("keyup", changeDirection);

const playBoard = document.querySelector(".play-board");
const scoreElement = document.querySelector(".score");
const highestScoreElement = document.querySelector(".highest-score");
let gameOver = false;
let foodX, foodY;
let snakeX = 15;
let snakeY = 15;
let velocityX = 0;
let velocityY = 0;
let snakeBody = [];
let setIntervalId;
let score = 0;

let highestScore = localStorage.getItem("highest-score") || 0;
highestScoreElement.innerText = `High Score: ${highestScore}`;

function foodGeneration() {
  foodX = Math.floor(Math.random() * 30) + 1;
  foodY = Math.floor(Math.random() * 30) + 1;
}

function handleGameOver() {
  clearInterval(setIntervalId);
  const gameOverContainer = document.querySelector(".game_over");
  const playAgainBtn = document.querySelector("#play_again");
  const coverAll = document.querySelector(".cover_All");
  let endGameScore = gameOverContainer.querySelector("#score");
  endGameScore.innerText = `Your Score is : ${score}`;
  coverAll.style.display = "block";
  gameOverContainer.style.display = "flex";
  playAgainBtn.addEventListener("click", () => {
    gameOverContainer.style.display = "none";
    coverAll.style.display = "none";
    location.reload();
  });
}

function changeDirection(e) {
  if (e.key === "ArrowUp" && velocityY !== 1) {
    velocityX = 0;
    velocityY = -1;
  } else if (e.key === "ArrowDown" && velocityY !== -1) {
    velocityX = 0;
    velocityY = 1;
  } else if (e.key === "ArrowLeft" && velocityX !== 1) {
    velocityX = -1;
    velocityY = 0;
  } else if (e.key === "ArrowRight" && velocityX !== -1) {
    velocityX = 1;
    velocityY = 0;
  }
}

function stratGame() {
  if (gameOver) return handleGameOver();

  if (snakeX === foodX && snakeY === foodY) {
    foodGeneration();
    snakeBody.push([snakeX, snakeY]);
    score++;
    highestScore = Math.max(score, highestScore);
    localStorage.setItem("highest-score", highestScore);
    scoreElement.innerText = `Score: ${score}`;
    highestScoreElement.innerText = `High Score: ${highestScore}`;
  }

  const newHead = [snakeX + velocityX, snakeY + velocityY];

  if (snakeBody.length > 0) {
    for (let i = snakeBody.length - 1; i > 0; i--) {
      snakeBody[i] = snakeBody[i - 1];
    }
    snakeBody[0] = [snakeX, snakeY];
  }

  snakeX = newHead[0];
  snakeY = newHead[1];
  if (snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30) {
    return (gameOver = true);
  }
  for (let i = 0; i < snakeBody.length; i++) {
    if (
      i !== 0 &&
      newHead[0] === snakeBody[i][0] &&
      newHead[1] === snakeBody[i][1]
    ) {
      gameOver = true;
    }
  }

  let html = "";
  html += `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`;
  html += `<div class="head" style="grid-area: ${snakeY} / ${snakeX}"></div>`;

  for (let i = 0; i < snakeBody.length; i++) {
    const segment = snakeBody[i];
    html += `<div class="body" style="grid-area: ${segment[1]} / ${segment[0]}"></div>`;
  }

  playBoard.innerHTML = html;
}
// this function do the setinterval dont run utlite you click a btn as you requested :) 
function startGameOnKeyPress() {
  const message = document.querySelector(".message")
  message.style.display = "none"
  setIntervalId = setInterval(stratGame, 100);
  // we remove event-listiner so this function only get called ones
  document.removeEventListener("keydown", startGameOnKeyPress);
}

foodGeneration();
document.addEventListener("keyup", changeDirection);
document.addEventListener("keydown", startGameOnKeyPress); 
