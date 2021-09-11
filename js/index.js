//Game Constant & Variables
//y is row and x is columns
let direction = { x: 0, y: 0 };
let foodSound = new Audio('food.mp3');
let gameOverSound = new Audio('gameover.mp3');
let moveSound = new Audio('move.mp3');
let musicSound = new Audio('music.mp3');
let speed = 10;
let lastPaintTime = 0;
let snakeArray = [
    { x: 13, y: 15 }
]
snakeLength =false;
snakeFood = { x: 3, y: 5 };
let Score = 0;
// Game Functions
function main(currentTime) {
    window.requestAnimationFrame(main);
    //console.log(currentTime);
    if ((currentTime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = currentTime;
    //gameEngine() run snake game
    gameEngine();
}

function isCollide(snake) {
    for (let i = 1; i < snakeArray.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }
    }
    //if you bump into border of board
    if (snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0) {
        return true;
    }

}
function gameEngine() {
    // Part 1 : Updating snake array and food
    //collide then game over
    if (isCollide(snakeArray)) {
        gameOverSound.play();
        // musicSound.pause();
        direction = { x: 0, y: 0 };
        alert("Game over. Press any key to play Again.")
        snakeArray = [{ x: 13, y: 15 }];
        Score = 0;
        snakeLength=false;
        speed=10;
        snakeSpeedBoard.innerHTML="Snake Movement Speed : "+speed;
        playerScore.innerHTML = "Score : 0";
        //musicSound.play();
    }

    // if you have eaten the food, incrementt the Score and regenerate the food
    if (snakeArray[0].y == snakeFood.y && snakeArray[0].x == snakeFood.x) {
        foodSound.play();
        Score += 1;
        if (Score > hiScoreValue) {
            hiScoreValue = Score;
            localStorage.setItem("hiScore", JSON.stringify(hiScoreValue));
            HighScore.innerHTML = "High Score : " + hiScoreValue;
        }

        playerScore.innerHTML = "Score : " + Score;
        snakeArray.unshift({ x: snakeArray[0].x + direction.x, y: snakeArray[0].y + direction.y });
        let a = 2;
        let b = 16;
        snakeFood = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) }
    }
    // moving snake
    // starting i from 2nd last index of snakeArray i=snakeArray.length-2
    for (let i = snakeArray.length - 2; i >= 0; i--) {
        //somthing fishy here
        // snakearray and i to update
        snakeArray[i + 1] = { ...snakeArray[i] };
        if(snakeLength)
        {
            speed=10*(snakeArray.length/2);
            snakeSpeedBoard.innerHTML="Snake Movement Speed : "+speed;
            //console.log();
        }
    }
    snakeArray[0].x += direction.x;
    snakeArray[0].y += direction.y;

    // Part 2 : Display the Snake and Food
    //Display the Snake
    //var board= document.getElementsByClassName('board')[0];
    board.innerHTML = "";
    snakeArray.forEach((element, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = element.y;
        snakeElement.style.gridColumnStart = element.x;
        //only snake head at start of snake
        if (index == 0) {
            snakeElement.classList.add('head');
        }
        else {
            //after having some food the snakebody will appear after snake head
            //console.log(snakeArray.length)

            snakeElement.classList.add('snakeBody');
        }
        board.appendChild(snakeElement);
    });
    //Display the food 
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = snakeFood.y;
    foodElement.style.gridColumnStart = snakeFood.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);

}


// Game main logic Start here
let highScore = localStorage.getItem("hiScore");
if (highScore === null) {
    hiScoreValue = 0;
    localStorage.setItem("hiScore", JSON.stringify(hiScoreValue));
}
else {
    hiScoreValue = JSON.parse(highScore);
    HighScore.innerHTML = "High Score : " + hiScoreValue;

}
window.requestAnimationFrame(main);

window.addEventListener('keydown', e => {
    direction = { x: 0, y: 1 }; //start game
    //moveSound.play();
    // 0: up, 1: left, 2: down, 3: right current Direction
    var lastMove = 1, preMove = -1, currentDirection = -1;
    switch (e.key) {
        case "ArrowUp":
             direction.x=0;
             direction.y=-1;
            //directionFound = 0;
            break;

        case "ArrowDown":
             direction.x=0;
             direction.y=1;
            //directionFound = 2;
            break;

        case "ArrowLeft":
            direction.x = -1;
              direction.y=0;
            // directionFound = 1;
            break;

        case "ArrowRight":
            //directionFound = 3;
             direction.x=1;
            direction.y=0;
            break;
        default:
            break;
    }
    //console.log("directionFound : "+directionFound);
/*
    if (currentDirection !== lastMove)  // Allow a queue of 1 premove so you can turn again before the first turn registers
    {
        preMove = directionFound;
    }
    if (Math.abs(directionFound - lastMove) !== 2)  // Prevent snake from turning 180 degrees
    {
        currentDirection = directionFound;
    }
    //console.log("preMove : "+preMove);
    if (currentDirection !== -1) {
        lastMove = currentDirection;
        if (preMove !== -1) {
            currentDirection = preMove;  // Execute that move next time (unless overwritten)
            preMove = -1;
            if (currentDirection === 0) {
                direction.x = 0;
                direction.y = -1;
            }
            else if (currentDirection === 1) {
                direction.x = -1;
                direction.y = 0;
            }
            else if (currentDirection === 2) {
                direction.x = 0;
                direction.y = 1;
            }
            else if (currentDirection === 3) {
                direction.x = 1;
                direction.y = 0;
            }

        }
    }*/
});

function setModeListener(mode, s) {
    document.getElementById(mode).addEventListener("click", function () {
        speed = s;
    });
}
var selectedSpeed = document.getElementById("selectMode").value;
sspeed = parseInt(selectedSpeed);

var modeDropdown = document.getElementById("selectMode");
if (modeDropdown) {
    modeDropdown.addEventListener("change", function (evt) {
        evt = evt || {};
        var val =  parseInt(evt.target.value) ;
        if(val!==1)
        {
            speed = val;
            snakeSpeedBoard.innerHTML="Snake Movement Speed : "+speed
        }
        if(val===1)
        {
            snakeLength =true;
        }
        


    });
}