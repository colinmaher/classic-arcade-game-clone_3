var Enemy = function() {
	// Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.xValues = [-150, 500];
    this.yValues = [60, 140, 220];
    this.speedRange = [150, 500];
    this.sprite = 'images/enemy-bug.png';
    this.reset();
};
// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    var maxX = this.xValues[1];
    this.x += this.speed * dt;
    //resets enemy when it has travelled offscreen
    if (this.x > maxX) {
        this.reset();
    }
};

//helper function for reset()
Enemy.prototype.getRandY = function() {
    return this.yValues[Math.floor(Math.random() * this.yValues.length)];
};

Enemy.prototype.reset = function() {
    //resets the position of an enemy
    //and randomizes the speed of each bug
    var INITX = this.xValues[0];
    this.x = INITX;
    this.y = this.getRandY();
    this.speed = this.getRandSpeed();
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//helper function for reset()
Enemy.prototype.getRandSpeed = function() {
    var minSpeed = this.speedRange[0];
    var maxSpeed = this.speedRange[1];

    return Math.floor(Math.random() * (maxSpeed - minSpeed)) + minSpeed;
};

//defines the attributes of the player object
var Player = function() {
    this.xValue = [-2, 402];
    this.yValue = [-20, 380];
    this.sprite = 'images/char-boy.png';
    this.reset();
};

Player.prototype.update = function() {
    //checks if enemies collide with player
    //each time update is run
    checkCollisions(this);
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
//resets player's x,y to starting position
Player.prototype.reset = function() {
    this.x = 200;
    this.y = 380;
};

function checkCollisions(Player){
    if (Player.y === -20) {
        // if player is on water, reset
        Player.reset();
    } else if (Player.y >= 60 && Player.y <= 220) {
        var self = Player;
        // if the player is on a road, loop through
        //  each bug and check if a bug is touching the player
        allEnemies.forEach(function(enemy) {   
            if (enemy.y === self.y) {
                if (enemy.x >= player.x - 60 && enemy.x <= player.x + 60) {
                    self.reset();
                }
            }
        });
    }
};

//moves the player based on key pressed
Player.prototype.handleInput = function(key) {
    if (key === 'left') {
        this.x -= (this.x - 101 < this.xValue[0]) ? 0 : 101;
    } else if (key === 'right') {
        this.x += (this.x + 101 > this.xValue[1]) ? 0 : 101;
    } else if (key === 'up') {
        this.y -= (this.y - 80 < this.yValue[0]) ? 0 : 80;
    } else if (key === 'down') {
        this.y += (this.y + 80 > this.yValue[1]) ? 0 : 80;
    }
};

// This listens for key presses and sends the keys to your
//  Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

var enemy1 = new Enemy();
var enemy2 = new Enemy();
var enemy3 = new Enemy();
var allEnemies = [enemy1, enemy2, enemy3];
var player = new Player();