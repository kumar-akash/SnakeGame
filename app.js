//settings
var snakeX = 2; //starting x
var snakeY = 2; //starting y
var height = 30; //box height
var width = 30; //box width
var interval = 100; // time span 
var increment = 1; //snake box increment

//game variables
var length = 0;
var score = 0;
var tailX = [snakeX];
var tailY = [snakeY];
var fx;
var fy;
var running = false;
var gameOver = false;
var direction = -1;
var int;

/**
 * entry point of the game
 */
function run() {
    init();
    int = setInterval(gameloop, interval);
}

function init() {
    createMap();
    createSnake();
    createFruit();
}

function createMap() {

    document.write("<table>");
    for (var y = 0; y < height; y++) {
        document.write("<tr>");
        for (var x = 0; x < width; x++) {
            if (x == 0 || x == width - 1 ||
                y == 0 || y == height - 1) {
                document.write("<td class ='wall' id ='" + x + "-" + y + "'></td>");
            } else {
                document.write("<td class ='blank' id ='" + x + "-" + y + "'></td>");
            }
        }
        document.write("</tr>");
    }
    document.write("</table>");
}

function createSnake() {
    set(snakeX, snakeY, "snake");
}

function set(x, y, value) {
    if (x != null && y != null)
        get(x, y).setAttribute("class", value);
}

function get(x, y) {
    return document.getElementById(x + '-' + y);
}

function getType(x, y) {
    return get(x, y).getAttribute("class");
}

function createFruit() {
    var found = false;
    while (!found && (length < (width - 2) * (height - 2) + 1)) {
        var fruitX = rand(1, width - 1);
        var fruitY = rand(1, height - 1);
        if (getType(fruitX, fruitY) == 'blank') {
            found = true;
        }
    }
    set(fruitX, fruitY, "fruit");
    fx = fruitX;
    fy = fruitY;
}

function rand(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

window.addEventListener("keydown", function key() {
    //up w
    var key = event.keyCode;
    if (direction != -1 && (key == 38 || key == 87))
        direction = 0;
    //down s
    else if (direction != 0 && (key == 40 || key == 83))
        direction = -1;
    else if (direction != 2 && (key == 37 || key == 65))
        direction = 1;
    else if (direction != 1 && (key == 39 || key == 68))
        direction = 2;

    if (!running)
        running = true;
    else if (key == 32)
        running = false;
});

function gameloop() {
    if (running && !gameOver) {
        update();
    } else if (gameOver) {
        document.querySelector('#gameOver').textContent  = "GameOver";
        clearInterval(int);
    }
}

function update() {
    set(fx, fy, "fruit");
    UpdateTail();
    set(tailX[length], tailY[length], 'blank');
    if (direction == 0)
        snakeY--;
    else if (direction == -1)
        snakeY++;
    else if (direction == 1)
        snakeX--;
    else if (direction == 2)
        snakeX++;
    set(snakeX, snakeY, "snake");
    for(var i = tailX.length-1; i>=0;i--){
        if(snakeX == tailX[i]&& snakeY == tailY[i]){
            set(snakeX , snakeY , "bite");
            gameOver = true;
            break;
        }
    }
    if(snakeX==0||snakeX==width-1 || snakeY == 0 || snakeY == height-1){
        gameOver = true;
        
    }
      
    if (snakeX == fx && snakeY == fy) {
        createFruit();
        length += increment;
        score+=increment;
    }
    document.querySelector('#score').textContent  = score;
}

function UpdateTail() {
    for (var i = length; i > 0; i--) {
        tailX[i] = tailX[i - 1];
        tailY[i] = tailY[i - 1];
    }
    tailX[0] = snakeX;
    tailY[0] = snakeY;
}


run();