const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const blockSize = 20;
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;
const initialSnakeLength = 3;
let snake = [{x: 10, y: 10}];
let food = {x: 15, y: 15};
let dx = 0;
let dy = 0;
let score = 0;
const scoreDisplay = document.getElementById('scoreValue');

document.addEventListener('keydown', changeDirection);

function draw() {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    drawGrid();
    drawSnake();
    drawFood();
    moveSnake();
    checkCollision();
    updateScore();
}

function drawGrid() {
    for (let x = 0; x < canvasWidth; x += blockSize) {
        for (let y = 0; y < canvasHeight; y += blockSize) {
            ctx.fillStyle = (x / blockSize + y / blockSize) % 2 === 0 ? '#DDD' : '#AAA';
            ctx.fillRect(x, y, blockSize, blockSize);
        }
    }
}

function drawSnake() {
    snake.forEach(segment => {
        ctx.fillStyle = 'green';
        ctx.fillRect(segment.x * blockSize, segment.y * blockSize, blockSize, blockSize);
    });
}

function drawFood() {
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x * blockSize, food.y * blockSize, blockSize, blockSize);
}

function moveSnake() {
    const head = {x: snake[0].x + dx, y: snake[0].y + dy};
    snake.unshift(head);
    if (head.x === food.x && head.y === food.y) {
        generateFood();
        score++;
    } else {
        snake.pop();
    }
}

function generateFood() {
    food.x = Math.floor(Math.random() * (canvasWidth / blockSize));
    food.y = Math.floor(Math.random() * (canvasHeight / blockSize));
}

function changeDirection(event) {
    const keyPressed = event.keyCode;
    const goingUp = dy === -1;
    const goingDown = dy === 1;
    const goingRight = dx === 1;
    const goingLeft = dx === -1;

    if (keyPressed === 37 && !goingRight) { // Left arrow
        dx = -1;
        dy = 0;
    }
    if (keyPressed === 38 && !goingDown) { // Up arrow
        dx = 0;
        dy = -1;
    }
    if (keyPressed === 39 && !goingLeft) { // Right arrow
        dx = 1;
        dy = 0;
    }
    if (keyPressed === 40 && !goingUp) { // Down arrow
        dx = 0;
        dy = 1;
    }
}

function checkCollision() {
    if (
        snake[0].x < 0 ||
        snake[0].x >= canvasWidth / blockSize ||
        snake[0].y < 0 ||
        snake[0].y >= canvasHeight / blockSize
    ) {
        clearInterval(gameInterval);
        alert('Game over! Score: ' + score);
    }
    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            clearInterval(gameInterval);
            alert('Game over! Score: ' + score);
        }
    }
}

function updateScore() {
    scoreDisplay.textContent = score;
}

const gameInterval = setInterval(draw, 100);
