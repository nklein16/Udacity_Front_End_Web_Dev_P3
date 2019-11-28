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
    // Game runs just fine without this function at this time
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.player), this.x, this.y);
};

Player.prototype.handleInput = function(e) {

    this.key = e;

    // Logic to keep player on the board
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
    // Handle situation when player makes it to the water
    if(player.y <= 0) {
        player.resetPlayer();
        displayModal();
    }

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
let allEnemies = [];
allEnemies.push(new Enemy(15, 63, 25));
allEnemies.push(new Enemy(120, 145, 60));
allEnemies.push(new Enemy(25, 229, 40));

// Create new player and place at initial position on board
const player = new Player(201, 404);

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

// Display the winning modal when player reaches the river
function displayModal(){

    // Display Game Over Modal
    let modal = document.getElementById("gameOverModal");
    modal.style.display = 'block';

    // Listen for click event to close modal
    var closeBtn = document.getElementsByClassName("closeBtn")[0];
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });

}
