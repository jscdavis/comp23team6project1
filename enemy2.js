var moveSpeed2 = 200;
var direction2; 



function create_enemy2() {
    direction2 = 0;
    enemy2 = game.add.sprite(32, game.world.height - 80, 'enemy2');
    game.physics.enable(enemy2, Phaser.Physics.ARCADE);

    enemy2.animations.add('walk');

    enemy2.animations.play('walk', 50, true);

    enemy2.body.velocity.x = moveSpeed2;


    game.add.tween(enemy2.body.velocity.x).to({ x: game.world.width }, 100000, Phaser.Easing.Linear.None, true);
    
    enemy2.body.gravity.y = 400;
    enemy2.body.collideWorldBounds = true;

    game.add.existing(enemy2);


    return enemy2;

}


function changeDirections2 (enemy2, platlayer) {
    if (direction2 == 0){
    	enemy2.body.velocity.x = -moveSpeed2;
    	direction2 = 1;
    }else if (direction2 == 1){
    	enemy2.body.velocity.x = moveSpeed2;
    	direction2 = 0;
    }
}