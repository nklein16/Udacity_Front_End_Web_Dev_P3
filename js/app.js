// Enemies our player must avoid
let Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = speed;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    // load(this.sprite);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if(this.x < 510){
        this.x += this.speed * dt;
    }

    // NOTES:
    // 1. Board rendering starts at top left
    // 2. Board is 405px * 405px

    if(this.x > 510) {
        this.x = -50;
        this.speed = 100 + Math.floor(Math.random() * 150);
    }
    
    // Collision detection
    if(player.x < this.x + 80 && player.x + 80 > this.x &&
       player.y < this.y + 70 && player.y + 70 > this.y) {
            player.resetPlayer();
    }

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Enemy.prototype.checkCollisions = function(x, y, pX, pY) {
//     this.x = x;
//     this.y = y;
//     player.x = pX;
//     player.y = pY;

//     // Collision detection
//     if (player.x < this.x + 80 && player.x + 80 > this.x &&
//         player.y < this.y + 70 && player.y + 70 > this.y) {
//             return true;
//     }
//     return false;
// };

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
let Player = function(x, y) {

    this.x = x;
    this.y = y;

    // The player image
    this.player = 'images/char-boy.png';
};

Player.prototype.update = function(){

};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.player), this.x, this.y);
};

Player.prototype.handleInput = function(e) {

    this.key = e;

    if(this.key === 'left' && player.x >= 1) {
        player.x -= 101;
    }
    if(this.key === 'right' && player.x <= 305) {
        player.x += 101;
    }
    if(this.key === 'up' && player.y > 0) {
        player.y -= 83;
    }
    if(this.key === 'down' && player.y <= 321) {
        player.y += 83;

    }
    // Handle situation if player makes it to the water
    if(player.y <= 0) {
        
        console.log("Game was won");
        buildModal();
        //displayModal();
        // Display modal
        // Get rid of modal
        // reset board
        // reset player on board
        setTimeout(function() {

            // Show winning message here, then reset Game and Player;
            // Do not remove board; simply display message in pop-up modal on top of board
            // setTimeout(function() {
            //     console.log("Game was won");
            //     buildModal();
            //     // displayModal();
            // }, 500)
            console.log("you are in outer setTimeout");
            resetBoard()
            player.resetPlayer();
        }, 3000);
    }

    // Handle Collisions
    // if(enemy.checkCollisions(enemy.x, enemy.y, this.x, this.y) === true) {
    //     player.resetPlayer();
    // }
};

/*
 * resetPlayer() places the player back in the original spot following:
 * A) A collision with an enemy
 * B) Winning the game
 */
Player.prototype.resetPlayer = function() {
    player.x = 201;
    player.y = 404;
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
let allEnemies = []
allEnemies.push(new Enemy(15, 63, 25))
allEnemies.push(new Enemy(120, 145, 60))
allEnemies.push(new Enemy(25, 229, 40))

const player = new Player(201, 404);

// 72 = y lowest value while still below water
// 155 (72 + 83) gets next block down
// 238 (155 + 83) gets next block down
// 321 (238 + 83) gets to top grass
// 404 (321 + 83) gets to bottom grass

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

function buildModal() {
    
    console.log("You are in buildModal");

    let container = document.createElement('container');
    
    // let modal = document.createElement('modal');
    // modal.style.width = '550';
    // modal.style.height = '650';
    // modal.style.justifySelf = 'center';
    // modal.style.backgroundColor = 'gray';
    
    // let span = document.createElement('span');
    
    let heading = document.createElement('h1');
    // heading.style.backgroundColor = 'blue'
    heading.style.color = 'blue';
    heading.style.justifyContent = 'center';
    heading.innerHTML = 'Well done!  You made it to the river!';

    // let closeButton = document.createElement('button');
    // closeButton.style.backgroundColor = 'blue';
    // closeButton.style.color = 'white';
    // closeButton.style.justifyContent = 'center';
    // closeButton.innerHTML = 'Close';

    // span.appendChild(heading);
    // span.appendChild(closeButton);    
    // modal.appendChild(span);
    // container.appendChild(modal);
    container.appendChild(heading);
    document.body.appendChild(container);
    document.querySelector('canvas').style.display = 'none';
};

function displayModal(){

    console.log("You are in displayModal");
    document.querySelector('canvas').style.display = 'none';

    setTimeout(function() {

        // document.querySelector('canvas').style.display = 'none';
        // document.querySelector('modal').toggleAttribute('modal');
        // document.querySelector('modal').classList.on('.modal');
        // document.querySelector('modal').on('modal');
    }, 3000);

    // closeButton.addEventListener('click', function() {
    //     document.querySelector('.modal').classList.off('.modal');
    // });

    // setTimeout(function() {
    //     document.querySelector('modal').classList.off('.modal');
    // }, 3000);
};

function resetBoard() {
    
    console.log("You are now resetting the board");
    
    setTimeout(function() {
        // document.querySelector('modal').toggleAttribute('modal');
        document.querySelector('container').remove();
        // document.querySelector('canvas').style.textAlign = 'center';
        document.body.textAlign = 'center';
        document.body.display = 'block';
        document.body.margin = '8px';
        document.querySelector('canvas').style.display = 'block';
    }, 500);
}

// function toggleModal() {
//     const toggleModal = () => {
//         document.querySelector('.modal').classList.toggle('.modal')
//     }   
//     // modal.classList.toggle('.modal');
// }
