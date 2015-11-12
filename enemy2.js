var moveSpeed2 = 200;
var direction2; 
var e;


function create_enemy2(x, y) {

    direction2 = 0;
    e = game.add.sprite(x, y, 'enemy2');
    game.physics.enable(e, Phaser.Physics.ARCADE);

    e.animations.add('walk');

    e.animations.play('walk', 50, true);

    e.body.velocity.x = moveSpeed2;


    game.add.tween(e.body.velocity.x).to({ x: game.world.width }, 100000, Phaser.Easing.Linear.None, true);
    
    e.body.gravity.y = 400;
    e.body.collideWorldBounds = true;


    game.add.existing(e);



    return e;

}


function changeDirections2 (e, platlayer) {

    if (direction2 == 0){
        e.body.velocity.x = -moveSpeed2;
        direction2 = 1;
    }else if (direction2 == 1){
        e.body.velocity.x = moveSpeed2;
        direction2 = 0;
    }
}