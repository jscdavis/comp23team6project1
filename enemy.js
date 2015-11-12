Enemy.prototype = Object.create(Phaser.Sprite.prototype);

Enemy.prototype.constructor = Enemy;

var moveSpeed = 200;
var direction; 

function Enemy(game, x, y) {
    direction = 0; // down 
    Phaser.Sprite.call(this, game, x, y, 'enemy');
    this.anchor.setTo(0.5, 0.5);
    this.scale.setTo(1.5, 1.5);
    game.physics.arcade.enable(this);
    this.body.gravity.y = 0;
    this.body.collideWorldBounds = true;
    this.body.velocity.y = -1 * moveSpeed;
    game.add.existing(this);
}

function changeDirections (enemy, platlayer) {
    if (direction == 0){
        enemy.body.velocity.y = moveSpeed;
        direction = 1;
    }else if (direction == 1){
        enemy.body.velocity.y = -moveSpeed;
        direction = 0;
    } 
}