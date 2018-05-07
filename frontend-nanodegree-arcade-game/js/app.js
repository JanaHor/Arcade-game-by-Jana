var Water = false;


// Enemies our player must avoid
var Enemy = function(x, y) {
    this.x = x;
    this.y = y;
    this.speed = Math.floor(Math.random() * 200 + 1);
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
    if (this.x < 505) {
        this.x += this.speed * dt;
    } else {
        this.x = -100;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.x = 202;
    this.y = 404;
    this.score = 0;
    this.lives = 2;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/char-pink-girl.png';
};

//Draw the player on the canvas.
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//Update track score and collisions
Player.prototype.update = function() {
    this.increaseScore();
    this.enemyCollision();

    if (player.score > 5 && player.y === 0) {
        $('#winner').show();
        $('.won').click(function() {
            $('#winner').hide();
            document.location.reload();
        });
    }
};

//Calculate score of the player
Player.prototype.increaseScore = function() {
    if (Water) {
        this.score++;
        setTimeout(() => {
            this.x = 202;
        }, 500);
		setTimeout(() => {
            this.y = 404;
        }, 500);
        Water = false;
    }
};

//Player and enemy collision detection.
Player.prototype.enemyCollision = function() {
    var bug = checkCollision(allEnemies);
    //if collision detected, reduce a player life.
    //Game over if all lives lost.
    if (bug) {
        if (this.lives !== 0) {
            this.lives--;
            this.x = 202;
			this.y = 404;
        } else {
            $('#looser').show();
            $('.lost').click(function() {
                $('#looser').hide();
                document.location.reload();
            });
        }
    }
};

//Collision detection between entities
var checkCollision = function(targetArray) {
    for (var i = 0; i < targetArray.length; i++) {
        if (player.x < targetArray[i].x + 50 &&
            player.x + 50 > targetArray[i].x &&
            player.y < targetArray[i].y + 40 &&
            player.y + 40 > targetArray[i].y) {
            return targetArray[i];
        }
    }
};

//Update player movements based on keyboard inputs
//Player move up, down, left and right and
//limit movement within the canvas
Player.prototype.handleInput = function(key) {
    switch (key) {
        case 'left':
            if (this.x - 101 < 0) {
                this.x = 0;
            } else {
                this.x -= 101;
            }
            break;

        case 'right':
            if (this.x + 101 >= 505) {
                this.x = 404;
            } else {
                this.x += 101;
            }
            break;

        case 'up':
            if (this.y - 83 < 0) {
                this.y = 0;
                Water = true;
            } else {
                this.y -= 83;
            }
            break;

        case 'down':
            if (this.y + 83 >= 404) {
                this.y = 404;
            } else {
                this.y += 83;
            }
            break;
    }
};


// Now instantiate your objects.
// enemy objects placed in an array called allEnemies and
var allEnemies = [];
var enemyPosition = [60, 140, 220];
var enemy;

// defining enemies positions
enemyPosition.forEach(function(posY) {
    enemy = new Enemy(0, posY, 100 + Math.floor(Math.random() * 512));
    allEnemies.push(enemy);
});

// player object placed in a variable called player
var player = new Player();



// This listens for key presses and sends the keys to your
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
