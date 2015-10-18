Player.prototype = Object.create(Phaser.Sprite.prototype);

Player.prototype.constructor = Player;

var moveKeys;
var moveSpeed = 200;
var jumpSpeed = -600;
var itemIDs = ['doubleJump', 'projectile', 'invinsible', 'build'];

//array that keeps track of each item
//for some, it may act like a boolean, some may be a count, etc.
var itemStatus = [0, 0, 0, 0];

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

function build() {
	//check if anything is inside the tile below the player
	//if clear, build a 1 tile platform, decrease itemStatus[3]
}

function useItem(player, item) {
	if(item == itemIDs[0]) {
		jump();
	} else if(item == itemIDs[1]) {
		//create projectile moving in direction of player
	} else if(item == itemIDs[2]) {
		//make enemy collisions do nothing to player
	} else if(item == itemIDs[3]) {
		build();
	}
}

//var itemIDs = {'doubleJump', 'projectile', 'invinsible', 'build'}
function makeItem(item) {
	if(item == itemIDs[0]) {
		itemStatus[0]++;
	} else if(item == itemIDs[1]) {
		itemStatus[1]++;
	} else if(item == itemIDs[2]) {
		itemStatus[2]++;
		//maybe add time instead of count
	} else if(item == itemIDs[3]) {
		itemStatus[3]++;
	}
}