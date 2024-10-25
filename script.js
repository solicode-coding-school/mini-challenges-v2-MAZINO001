// const snake = document.querySelector(".head");
// const food = document.querySelector(".food");
// const TheBoard = document.querySelector(".play-board");
// let x = 0;
// let y = 0;
// let score = 0;
// let highestScore = 0;
// let max_x = TheBoard.offsetWidth - snake.offsetWidth;
// let max_y = TheBoard.offsetHeight - snake.offsetHeight;
// const stepX = max_x / 30;
// const stepY = max_y / 30;
// let direction = { x: 0, y: 0 };
// let snakeBody = [];
// generateFood();

// setInterval(() => {
//   x = Math.min(max_x, Math.max(0, x + direction.x * stepX));
//   y = Math.min(max_y, Math.max(0, y + direction.y * stepY));
//   snake.style.transform = `translate(${Math.round(x)}px, ${Math.round(y)}px)`;
//   handleScore();
// }, 100);

// document.addEventListener("keydown", (event) => {
//   switch (event.key) {
//     case "ArrowLeft":
//       direction = { x: -1, y: 0 };
//       break;
//     case "ArrowUp":
//       direction = { x: 0, y: -1 };
//       break;
//     case "ArrowRight":
//       direction = { x: 1, y: 0 };
//       break;
//     case "ArrowDown":
//       direction = { x: 0, y: 1 };
//       break;
//   }
// });

// function generateFood() {
//   let foodX;
//   let foodY;
//   do {
//     foodX = Math.round(Math.random() * max_x);
//     foodY = Math.round(Math.random() * max_y);
//   } while (foodX === x && foodY === y);

//   food.style.transform = `translate(${foodX}px, ${foodY}px)`;
// }

// // thi is not me
// function handleScore() {
//   const snakeRect = snake.getBoundingClientRect();
//   const foodRect = food.getBoundingClientRect();

//   if (
//     snakeRect.left < foodRect.left + foodRect.width &&
//     snakeRect.left + snakeRect.width > foodRect.left &&
//     snakeRect.top < foodRect.top + foodRect.height &&
//     snakeRect.top + snakeRect.height > foodRect.top
//   ) {
//     generateFood();
//     updateSnake();
//     score += 1;
//     if (score > highestScore) {
//       highestScore += 1;
//     }
//     document.querySelector(".score").textContent = `Score: ${score}`;
//     document.querySelector(
//       ".highest-score"
//     ).textContent = `High Score: ${highestScore}`;
//   }
// }

// function updateSnake() {
//   let newDiv = document.createElement("div");
//   newDiv.classList.add("body");
//   TheBoard.appendChild(newDiv);
//   snakeBody.push(newDiv);
//   console.log(snakeBody);
//   newDiv.style.transform = `translate(${x}px, ${y}px)`;
// }

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
  console.log();
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
      // snakeBody[0][0] === snakeBody[i][0] &&
      // snakeBody[0][1] === snakeBody[i][1]
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

foodGeneration();
setIntervalId = setInterval(stratGame, 100);
document.addEventListener("keyup", changeDirection);
