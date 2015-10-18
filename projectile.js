Projectile.prototype = Object.create(Phaser.Sprite.prototype);

Projectile.prototype.constructor = Projectile;

var speed;
var type;

function Projectile(game, x, y, typ, spd) {
	Phaser.Sprite.call(this, game, x, y, typ);
	type = typ;
	speed = spd;
	this.anchor.setTo(0.5, 0.5);
	game.physics.enable(this, Phaser.Physics.ARCADE);
	this.body.gravity.y = 0;
	this.body.collideWorldBounds = false;
	game.add.existing(this);
}


Projectile.prototype.update = function() {
	//check collisions?

}

function collideWith(projectile, object) {
	projectile.kill();
}