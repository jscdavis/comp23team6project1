Player.prototype = Object.create(Phaser.Sprite.prototype);

Player.prototype.constructor = Player;

var moveKeys;
var moveSpeed = 200;
var jumpSpeed = -325;

//array that keeps track of each item
//for some, it may act like a boolean, some may be a count, etc.

function Player(game, x, y) {
	Phaser.Sprite.call(this, game, x, y, 'player');
	this.anchor.setTo(0.5, 0.5);
	this.scale.setTo(0.8, 0.60377);
	game.physics.arcade.enable(this);
	this.body.gravity.y = 400;
	this.body.collideWorldBounds = true;
	game.camera.follow(this, Phaser.Camera.FOLLOW_TOPDOWN_TIGHT);
	game.add.existing(this);

	moveKeys = {
        up: game.input.keyboard.addKey(Phaser.Keyboard.W),
        down: game.input.keyboard.addKey(Phaser.Keyboard.S),
        left: game.input.keyboard.addKey(Phaser.Keyboard.A),
        right: game.input.keyboard.addKey(Phaser.Keyboard.D),
    };
}

Player.prototype.update = function() {

	player.body.velocity.x = 0;

	if (moveKeys.left.isDown)
    {
        moveLeft();
    }
    else if (moveKeys.right.isDown)
    {
        moveRight();
    }

    if (moveKeys.up.isDown && player.body.onFloor())
    {
        jump();
    }
}

function moveRight() {
    player.body.velocity.x = moveSpeed;
}

function moveLeft() {
    player.body.velocity.x = -1 * moveSpeed;
}

function jump() {
	player.body.velocity.y += jumpSpeed;
}

function useItem(item) {
	if(item == 0) {
		console.log('used jump');
		jump();
	} else if(item == 1) {
		//create projectile moving in direction of player
	}
}


function killPlayer(player, enemy) {
	//game over stuff
	theme.stop();
	lose.play();
	player.kill();
	//display fail animation
}