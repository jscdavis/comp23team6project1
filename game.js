
var boundsX = 800, boundsY = 600;
var game = new Phaser.Game(boundsX, boundsY, Phaser.AUTO, "game", {preload:preload, update:update, create:create});
var ship;
var wasd;
var rocks;

function preload () {
    game.load.image('ship', 'ship.png');
    game.load.image('enemy', 'evil.png');
    game.load.image('rocks', 'rocks.png');
}

function create() {


    // Keyboard controls
     wasd = {
        up: game.input.keyboard.addKey(Phaser.Keyboard.W),
        down: game.input.keyboard.addKey(Phaser.Keyboard.S),
        left: game.input.keyboard.addKey(Phaser.Keyboard.A),
        right: game.input.keyboard.addKey(Phaser.Keyboard.D),
    };

    // Physics
    game.physics.startSystem(Phaser.Physics.ARCADE);

    //Rock Creation
    rocks = game.add.group();
    add_rocks(rocks);

    // Ship Creation
    ship = game.add.sprite(50, 50, 'ship');
    game.physics.enable(ship, Phaser.Physics.ARCADE);

    // Enemy Creation
    enemies = game.add.group();
    add_enemies(enemies);

    ship.anchor.setTo(0.5, 0.5);
    this.cursors = game.input.keyboard.createCursorKeys();

   
}

function update() {
    var mX = game.input.mousePointer.x;
    var mY = game.input.mousePointer.y;
    /* look at the mouse */
    ship.angle = Math.atan2(ship.position.x - mX, ship.position.y - mY)  * -57.2957795;

    if (wasd.up.isDown) {
        ship.y -= 3;
    }
    if (wasd.down.isDown) {
        ship.y += 3;
    }
    if (wasd.left.isDown) {
        ship.x -= 3;
    }
    if (wasd.right.isDown) {
        ship.x += 3;
    }
    
    // Collisions! 
     game.physics.arcade.overlap(enemies, ship, kill_ship, null, this);
     game.physics.arcade.overlap(ship, rocks, kill_rock, null, this);
     

}

function kill_ship() {

    ship.kill();
}

function kill_rock(ship, rock){

    rock.kill();
}
