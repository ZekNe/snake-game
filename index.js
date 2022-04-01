const canvas = document.getElementById('snakeCanvas');
const ctx = canvas.getContext('2d');
const Container = document.querySelector('.snakeContainer');
const sbutton = Container.querySelector('.startButton');
const reset = document.querySelector("#reset");

let snake = [{ x: 150, y: 150 },
{ x: 140, y: 150 },
{ x: 130, y: 150 },
{ x: 120, y: 150 },
{ x: 110, y: 150 }];

let score = 0;

function clearCanvas() {
    ctx.fillStyle = "rgb(71, 48, 32)"; ctx.strokeStyle = "black";
    ctx.fillRect(0, 0, snakeCanvas.width, snakeCanvas.height);
    ctx.strokeRect(0, 0, snakeCanvas.width, snakeCanvas.height);
}

function drawSnakePart(snakePart) {
    ctx.fillStyle = 'green'; ctx.strokestyle = 'darkgreen';
    ctx.fillRect(snakePart.x, snakePart.y, 10, 10);
    ctx.strokeRect(snakePart.x, snakePart.y, 10, 10);
}

function randomTen(min, max) { return Math.round((Math.random() * (max - min) + min) / 10) * 10; }

function createFood() {
    foodX = randomTen(0, snakeCanvas.width - 10);
    foodY = randomTen(0, snakeCanvas.height - 10);
    snake.forEach(function isFoodOnSnake(part) {
        const foodIsOnSnake = part.x == foodX && part.y == foodY
        if (foodIsOnSnake) createFood();
    });
}

function drawFood() {
    ctx.fillStyle = 'red';
    ctx.strokestyle = 'darkred';
    ctx.fillRect(foodX, foodY, 10, 10);
    ctx.strokeRect(foodX, foodY, 10, 10);
}

Container.addEventListener("click", (e) => {
    if (e.target.matches("button")) {
        drawSnake()
        sbutton.style.display = "none";
        main()
        createFood()
    }
})

let dx = 10;
let dy = 0;

function didGameEnd() {
    for (let i = 4; i < snake.length; i++) {
        const didCollide = snake[i].x === snake[0].x && snake[i].y === snake[0].y
        if (didCollide) return true
    }

    const hitLeftWall = snake[0].x < 0;
    const hitRightWall = snake[0].x > snakeCanvas.width - 10;
    const hitToptWall = snake[0].y < 0;
    const hitBottomWall = snake[0].y > snakeCanvas.height - 10;
    return hitLeftWall || hitRightWall || hitToptWall || hitBottomWall
}

function advanceSnake() {
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };
    snake.unshift(head);
    const didEatFood = snake[0].x === foodX && snake[0].y === foodY;
    if (didEatFood) {
        score += 1;
        document.getElementById('score').innerHTML = score;
        createFood();
    } else {
        snake.pop();
    }
}

function drawSnake() {
    snake.forEach(drawSnakePart);
}

function main() {
    if (didGameEnd()) return;
    setTimeout(function onTick() {
        changingDirection = false; clearCanvas(); drawFood(); advanceSnake(); drawSnake(); main();
    }, 100)
}

function changeDirection(event) {
    const LEFT_KEY = 37;
    const RIGHT_KEY = 39;
    const UP_KEY = 38;
    const DOWN_KEY = 40;
    if (changingDirection) return;
    changingDirection = true;
    const keyPressed = event.keyCode;
    const goingUp = dy === -10;
    const goingDown = dy === 10;
    const goingRight = dx === 10;
    const goingLeft = dx === -10;
    if (keyPressed === LEFT_KEY && !goingRight) { dx = -10; dy = 0; }
    if (keyPressed === UP_KEY && !goingDown) { dx = 0; dy = -10; }
    if (keyPressed === RIGHT_KEY && !goingLeft) { dx = 10; dy = 0; }
    if (keyPressed === DOWN_KEY && !goingUp) { dx = 0; dy = 10; }
}

document.addEventListener("keydown", changeDirection)

reset.addEventListener("click", () => {
    window.location.reload()
})






