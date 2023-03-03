// Declaring vars
var width;
var height;
var fps;
var tileSize;
var canvas;
var context;
var snake;
var interval;


// Loading the browser 
window.addEventListener("load",function(){

    game();

});

// Adding an event listener for button presses. 
window.addEventListener("keydown", function (evt) {
    if (evt.key === " ") {
        evt.preventDefault();
        isPaused = !isPaused;
    }
    else if (evt.key === "ArrowDown") {
        evt.preventDefault();
        if (snake.velY != -1 && snake.x >= 0 && snake.x <= width && snake.y >= 0 && snake.y <= height)
            snake.dir(0, 1);
    }
    else if (evt.key === "ArrowLeft") {
        evt.preventDefault();
        if (snake.velX != 1 && snake.x >= 0 && snake.x <= width && snake.y >= 0 && snake.y <= height)
            snake.dir(-1, 0);
    }
    else if (evt.key === "ArrowRight") {
        evt.preventDefault();
        if (snake.velX != -1 && snake.x >= 0 && snake.x <= width && snake.y >= 0 && snake.y <= height)
            snake.dir(1, 0);
    }
    else if (evt.key === "ArrowUp") {
        evt.preventDefault();        if (snake.velY != 1 && snake.x >= 0 && snake.x <= width && snake.y >= 0 && snake.y <= height)
            snake.dir(0, -1);
    }

});
// Working on HTML

class Snake {

    // Starting the object properties.
    constructor(pos, color) {
        this.velX = 1;
        this.velY = 0;
        this.x = pos.x;
        this.y = pos.y;
        this.tail = [{ x: pos.x - tileSize, y: pos.y }, { x: pos.x - tileSize * 2, y: pos.y }];
        this.color = color;

    }

    // Drawing the snake on the board.
    draw() {
        context.lineWidth = 3;
        context.stroke();
        context.closePath();
        context.beginPath();
        context.rect(this.x, this.y, tileSize, tileSize);
        context.fillStyle = this.color;
        context.fill();
        context.strokeStyle = "black";
        
        // Drawing the tail of the snake
        for (var i = 0; i < this.tail.length; i++) {
            context.strokeStyle = "black";
            context.lineWidth = 3;
            context.stroke();
            context.closePath();
            context.beginPath();
            context.rect(this.tail[i].x, this.tail[i].y, tileSize, tileSize);
            context.fillStyle = this.color;
            context.fill();
            

        }


    }

    // Uploading  the snake by updating position.
    move() {

        for (var i = this.tail.length - 1; i > 0; i--) {

            this.tail[i] = this.tail[i - 1];

        }

        if (this.tail.length != 0)
            this.tail[0] = { x: this.x, y: this.y };

        this.x += this.velX * tileSize;
        this.y += this.velY * tileSize;

    }

    // Controling the direction of movement 
    dir(dirX, dirY) {

        this.velX = dirX;
        this.velY = dirY;

    }

    // Stoping condition : Don't hit the border

    border() {

        if (this.x + tileSize > width && this.velX != -1 || this.x < 0 && this.velX != 1)
            this.x = width - this.x;

        else if (this.y + tileSize > height && this.velY != -1 || this.velY != 1 && this.y < 0)
            this.y = height - this.y;

    }

}


function init() {

    tileSize = 20;

    // Dynamically controlling the size of canvas.
    width = tileSize * Math.floor(window.innerWidth / tileSize);
    height = tileSize * Math.floor(window.innerHeight / tileSize);;

    fps = 10;

    canvas = document.getElementById("game-area");
    canvas.width = width;
    canvas.height = height;
    context = canvas.getContext("2d");

    snake = new Snake({ x: tileSize * Math.floor(width / (2 * tileSize)), y: tileSize * Math.floor(height / (2 * tileSize)) }, "#39ff14");

}

// Updating the position and redrawing of game objects.
function update() {


    snake.border();


    // Clearing the canvas for redrawing.
    context.clearRect(0, 0, width, height);

    snake.draw();
    snake.move();

}

// The actual game function.
function game() {

    init();

    interval = setInterval(update,1000/fps);

}



