var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });
var platforms;
var ops;
var moveKeys;
var actionKeys;
var numbers;
var posAvailable = 0;
var textPos = 0;

function preload() {

    game.load.image('background', 'assets/bg.png');
    game.load.image('platform', 'assets/platform.png');
    game.load.image('player', 'assets/player.png');
    game.load.image('0', 'assets/zero.png');
    game.load.image('1', 'assets/one.png');
    game.load.image('2', 'assets/two.png');
    game.load.image('3', 'assets/three.png');
    game.load.image('4', 'assets/four.png');
    game.load.image('5', 'assets/five.png');
    game.load.image('6', 'assets/six.png');
    game.load.image('7', 'assets/seven.png');
    game.load.image('8', 'assets/eight.png');
    game.load.image('9', 'assets/nine.png');
    game.load.image('add', 'assets/add.png');
    game.load.image('subtract', 'assets/subtract.png');
    game.load.image('multiply', 'assets/multiply.png');
    game.load.image('divide', 'assets/divide.png');
    game.load.image('ball', 'assets/ball.png');
}

function create() {

    moveKeys = {
        up: game.input.keyboard.addKey(Phaser.Keyboard.W),
        down: game.input.keyboard.addKey(Phaser.Keyboard.S),
        left: game.input.keyboard.addKey(Phaser.Keyboard.A),
        right: game.input.keyboard.addKey(Phaser.Keyboard.D),
    };

    actionKeys = {
        pause: game.input.keyboard.addKey(Phaser.Keyboard.P),
        use: game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR),
    };

    //  We're going to be using physics, so enable the Arcade Physics system
    game.physics.startSystem(Phaser.Physics.ARCADE);

    game.add.sprite(0, 0, 'background');

    //  The platforms group contains the platform and the 2 ledges we can jump on
    platforms = game.add.group();

    //  We will enable physics for any object that is created in this group
    platforms.enableBody = true;

    // Here we create the platform.
    var platform = platforms.create(0, game.world.height - 50, 'platform');

    //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
    platform.scale.setTo(4, 1);

    //  This stops it from falling away when you jump on it
    platform.body.immovable = true;

    //  Now let's create two ledges
    var ledge = platforms.create(400, 400, 'platform');

    ledge.body.immovable = true;

    ledge = platforms.create(150, 250, 'platform');

    ledge.body.immovable = true;

    // The player and its settings
    player = game.add.sprite(32, game.world.height - 150, 'player');

    //  We need to enable physics on the player
    game.physics.arcade.enable(player);

    //  Player physics properties.
    player.body.gravity.y = 300;
    player.body.collideWorldBounds = true;

    numbers = game.add.group();

    numbers.enableBody = true;

    //  Here we'll create 12 of them evenly spaced apart
    for (var i = 0; i < 6; i++)
    {
        var rand = Math.floor(Math.random()*10);
        //  Create a number inside of the 'numbers' group
        var str = toStr(rand);
        var number = numbers.create(Math.floor(Math.random()*700) + 50, Math.floor(Math.random()*200) + 51, str);

        number.inputEnabled = true;
        number.events.onInputDown.add(clickNum, this);
        //  Let gravity do its thing
        number.body.gravity.y = 0;
        number.value = rand;
    }

    ops = game.add.group();
    ops.enableBody = true;

    var add = ops.create(670, 5, 'add');
    var subtract = ops.create(700, 5, 'subtract');
    var multiply = ops.create(730, 5, 'multiply');
    var divide = ops.create(760, 5, 'divide');
    add.inputEnabled = true;
    add.events.onInputDown.add(clickNum, this);
    add.value = "+";
    subtract.inputEnabled = true;
    subtract.events.onInputDown.add(clickNum, this);
    subtract.value = "-";
    multiply.inputEnabled = true;
    multiply.events.onInputDown.add(clickNum, this);
    multiply.value = "x";
    divide.inputEnabled = true;
    divide.events.onInputDown.add(clickNum, this);
    divide.value = "/";

    var ball = game.add.sprite(0, 560, 'ball');
    ball.scale.setTo(.044, .044);
    ball.inputEnabled = true;
    ball.events.onInputDown.add(pause, this);

}

function update() {

    //  Collide the player and the numbers with the platforms
    game.physics.arcade.collide(player, platforms);

        //  Reset the players velocity (movement)
    player.body.velocity.x = 0;

    if(actionKeys.pause.isDown) {
        pause();
    }

    if (moveKeys.left.isDown)
    {
        //  Move to the left
        player.body.velocity.x = -250;
    }
    else if (moveKeys.right.isDown)
    {
        //  Move to the right
        player.body.velocity.x = 250;
    }

    //  Allow the player to jump if they are touching the platform.
    if (moveKeys.up.isDown && player.body.touching.down)
    {
        player.body.velocity.y = -350;
    }

    game.physics.arcade.collide(numbers, platforms);
    game.physics.arcade.overlap(player, numbers, collectNum, null, this);

}

function pause() {
    game.paused = true;
    //display inventory and stuff
    game.paused = false;
}

function toStr(num) {
    if(num == 0) {
        return "0";
    }
    if(num == 1) {
        return "1";
    }
    if(num == 2) {
        return "2";
    }
    if(num == 3) {
        return "3";
    }
    if(num == 4) {
        return "4";
    }
    if(num == 5) {
        return "5";
    }
    if(num == 6) {
        return "6";
    }
    if(num == 7) {
        return "7";
    }
    if(num == 8) {
        return "8";
    }
    if(num == 9) {
        return "9";
    }
}

function collectNum (player, number) {
    if(number.y < 51)
        return;
    number.x = 10 + 33*posAvailable;
    number.y = 5;
    posAvailable++;
    if(posAvailable > 22) {
        posAvailable = 0;
    }
}

function clickNum (number) {
    if(number.y < 51 && textPos < 40) {
        var text = game.add.text(250 + (textPos * 32), 50, number.value, { fill: '#ffffff', fontSize: 30 });
        textPos++;
    }
}

function pause(ball) {
    game.paused = !game.paused;
}