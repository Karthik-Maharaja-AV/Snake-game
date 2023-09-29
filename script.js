const gameContainer = document.getElementById("game-container");
const gridSize = 20;
const snake = [{ x: 10, y: 10 }];
let food = generateFood();
let dx = 1;
let dy = 0;

function generateFood() {
  const x = Math.floor(Math.random() * gridSize);
  const y = Math.floor(Math.random() * gridSize);
  return { x, y };
}

function draw() {
  gameContainer.innerHTML = "";

  // Draw snake
  snake.forEach(segment => {
    const snakeElement = document.createElement("div");
    snakeElement.classList.add("snake");
    snakeElement.style.gridColumn = segment.x + 1;
    snakeElement.style.gridRow = segment.y + 1;
    gameContainer.appendChild(snakeElement);
  });

  // Draw food
  const foodElement = document.createElement("div");
  foodElement.classList.add("food");
  foodElement.style.gridColumn = food.x + 1;
  foodElement.style.gridRow = food.y + 1;
  gameContainer.appendChild(foodElement);
}

function moveSnake() {
  const head = { x: snake[0].x + dx, y: snake[0].y + dy };
  snake.unshift(head);

  // Check if snake eats the food
  if (head.x === food.x && head.y === food.y) {
    food = generateFood();
  } else {
    snake.pop();
  }
}

function checkCollision() {
  // Check if snake hits the boundaries
  const head = snake[0];
  return head.x < 0 || head.x >= gridSize || head.y < 0 || head.y >= gridSize;
}

function gameLoop() {
  moveSnake();
  if (checkCollision()) {
    alert("Game Over!");
    snake.length = 1; // Reset the snake
  }
  draw();
}

document.addEventListener("keydown", function(event) {
  switch(event.key) {
    case "ArrowUp":
      dx = 0;
      dy = -1;
      break;
    case "ArrowDown":
      dx = 0;
      dy = 1;
      break;
    case "ArrowLeft":
      dx = -1;
      dy = 0;
      break;
    case "ArrowRight":
      dx = 1;
      dy = 0;
      break;
  }
});

setInterval(gameLoop, 200);

