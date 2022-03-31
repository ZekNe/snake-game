const canvas = document.getElementById('snakeCanvas');
const ctx = canvas.getContext('2d');
const Container = document.querySelector('.snakeContainer');
const sbutton = Container.querySelector('.startButton');

let snake = [{ x: 150, y: 150 },
{ x: 140, y: 150 },
{ x: 130, y: 150 },
{ x: 120, y: 150 },
{ x: 110, y: 150 }];

let nextsnake = [{ x: 160, y: 150 },
{ x: 150, y: 150 },
{ x: 140, y: 150 },
{ x: 130, y: 150 },
{ x: 120, y: 150 }];


function clearCanvas() {
    ctx.fillStyle = "white"; ctx.strokeStyle = "black";
    ctx.fillRect(0, 0, snakeCanvas.width, snakeCanvas.height);
    ctx.strokeRect(0, 0, snakeCanvas.width, snakeCanvas.height);
}

// setTimeout(function onTick() {  clearCanvas();  advanceSnake();  drawSnake();}, 100);

function drawSnakePart(snakePart) {
    ctx.fillStyle = 'green'; ctx.strokestyle = 'darkgreen';
    ctx.fillRect(snakePart.x, snakePart.y, 10, 10);
    ctx.strokeRect(snakePart.x, snakePart.y, 10, 10);
}



Container.addEventListener("click", (e) => {
    if (e.target.matches("button")) {
        drawSnake()
        sbutton.style.display = "none";

    }
})

function advanceSnake() {
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };
    snake.unshift(head);
    snake.pop();
}

function drawSnake() {
    snake.forEach(drawSnakePart);
}
