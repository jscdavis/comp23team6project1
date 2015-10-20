 //var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update });


/*

THE GOOD STUFF 


var enemy;


function create_enemy() {

    enemy = game.add.sprite(32, game.world.height - 80, 'enemy');

    //Phaser.Sprite.call(this, game, x, y, 'enemy'); //necessary?!

    enemy.animations.add('walk');

    enemy.animations.play('walk', 50, true);

    game.add.tween(enemy).to({ x: game.world.width }, 100000, Phaser.Easing.Linear.None, true);
    
	game.physics.enable(enemy, Phaser.Physics.ARCADE);

    enemy.body.gravity.y = 400;
    //enemy.body.collideWorldBounds = true;

   	//game.add.existing(enemy);  //necessary?!


    return enemy;

}


//  update isn't called until 'create' has completed. If you need to process stuff before that point (i.e. while the preload is still happening)
//  then create a function called loadUpdate() and use that
//function update_enemy(enemy) {
    
//    if (enemy.x >= 300)
//    {
//       enemy.scale.x += 0.01;
//        enemy.scale.y += 0.01;
//    }

//} 

*/


var tweenA;
var tweenB;

Enemy.prototype = Object.create(Phaser.Sprite.prototype);

Enemy.prototype.constructor = Enemy;

//var moveSpeed = 200;

function Enemy(game, x, y) {
	Phaser.Sprite.call(this, game, x, y, 'enemy');
	this.anchor.setTo(0.5, 0.5);
    this.scale.setTo(1.5, 1.5);
	game.physics.arcade.enable(this);
	this.body.gravity.y = 400;
	this.body.collideWorldBounds = true;

	this.body.velocity.x = 100;
    //tweenA = game.add.tween(this.body.velocity).to({ x: -game.world.width }, 100000, Phaser.Easing.Linear.None, true);
    //tweenB = game.add.tween(this.body.velocity).to({ x: game.world.width }, 100000, Phaser.Easing.Linear.None, true);
    //tweenB.chain(tweenA);

    //tweenA.chain(tweenB);

    //this.body.checkCollision.up = false;
    //this.body.checkCollision.down = false;
    //this.body.bounce.setTo(1, 1);
    //this.body.gravity.set(30, 0);
	//game.add.tween(this.body).to( { x: 300 }, 3000, Phaser.Easing.Linear.None, true);
	//game.camera.follow(this, Phaser.Camera.FOLLOW_TOPDOWN_TIGHT);
	



//	game.add.existing(this);





	//game.camera.follow(this, Phaser.Camera.FOLLOW_TOPDOWN_TIGHT);
	//game.add.existing(enemy);

}












