function add_enemies(enemies){
    for (var i = 0; i < 4; i++){
      var rand = game.rnd.realInRange(100, 500);
      var enemy = enemies.create(rand, rand, 'enemy');
      
      enemy.scale.setTo(.1, .1);

      game.physics.enable(enemy, Phaser.Physics.ARCADE);

        //  This gets it moving
      enemy.body.velocity.setTo(200,200);

        //  This makes the game world bounce-able
      enemy.body.collideWorldBounds = true;

        //  This sets the image bounce energy for the horizontal 
        //  and vertical vectors. "1" is 100% energy return
      enemy.body.bounce.set(1);

    };
    
}