Enemy.prototype = Object.create(Phaser.Sprite.prototype);

Enemy.prototype.constructor = Enemy;

var moveSpeed = 200;

function Enemy(game, x, y) {
	Phaser.Sprite.call(this, game, x, y, 'enemy');
	this.anchor.setTo(0.5, 0.5);
    this.scale.setTo(1.5, 1.5);
	game.physics.arcade.enable(this);
	this.body.gravity.y = 400;
	this.body.collideWorldBounds = true;
	this.body.velocity.x = moveSpeed;
    game.add.existing(this);
}

function changeDirections (enemy, layer) {
    console.log('test');
    enemy.body.velocity.x = -200;
}