var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });
var platforms;
var ops;

var player;
var inventory;
var items;
var enemies;
var map;
var layer;
var actionKeys;
var pickup;
var theme;
var win;
var lose;
var posAvailable = 0;
var textPos = 0;

function preload() {

    game.load.bitmapFont('bmFont', 'assets/bmFont.png', 'assets/bmFont.xml');
    game.load.tilemap('map', 'assets/tilemap.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.audio('pickup', 'assets/pickup.mp3');
    game.load.audio('win', 'assets/win.mp3');
    game.load.audio('lose', 'assets/lose.mp3');
    game.load.audio('theme', 'assets/theme.mp3');
    game.load.image('grass', 'assets/grass.png');
    game.load.image('dirt', 'assets/dirt.png');
    game.load.image('sky', 'assets/sky.png');
    game.load.image('platformR', 'assets/platformR.png');
    game.load.image('platformN', 'assets/platformN.png');
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
    game.load.image('inventory', 'assets/inventory.png');
    game.load.image('equation', 'assets/equation.png');
    game.load.image('add', 'assets/add.png');
    game.load.image('subtract', 'assets/subtract.png');
    game.load.image('multiply', 'assets/multiply.png');
    //game.load.image('divide', 'assets/divide.png');
}

function create() {

    map = game.add.tilemap('map');

    map.addTilesetImage('grass');
    map.addTilesetImage('dirt');
    map.addTilesetImage('platformR');
    map.addTilesetImage('platformN');
    map.addTilesetImage('sky');

    layer = map.createLayer('Tile Layer 1');
    layer.resizeWorld();

    var array = [21];
    map.setCollisionByExclusion(array, true, layer);

    items = game.add.group();
    items.enableBody = true;

    var rand = Math.floor(Math.random()*10);
    var str = toStr(rand);

    map.createFromObjects('Object Layer 1', 4, str, 0, true, false, items);

    inventory = new Inventory(this, 0, 0);

    actionKeys = {
        pause: game.input.keyboard.addKey(Phaser.Keyboard.P),
        use: game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR),
        nextItem: game.input.keyboard.addKey(Phaser.Keyboard.SHIFT),
    };

    //pause.onDown(pause);
    //use.onDown(useItem);

    game.physics.startSystem(Phaser.Physics.ARCADE);
    player = new Player(this, 32, game.world.height - 80);

    /*
    game.add.sprite(0, 0, 'background');

    platforms = game.add.group();
    platforms.enableBody = true;
    var platform = platforms.create(0, game.world.height - 50, 'platform');
    platform.scale.setTo(4, 1);
    platform.body.immovable = true;
    */

    /*
    for (var i = 0; i < 6; i++)
    {
        var rand = Math.floor(Math.random()*10);
        //  Create a number inside of the 'items' group
        var str = toStr(rand);
        var number = items.create(Math.floor(Math.random()*700) + 50, Math.floor(Math.random()*200) + 51, str);

        number.inputEnabled = true;
        number.events.onInputDown.add(selected, this);
        //  Let gravity do its thing
        number.body.gravity.y = 0;
        number.value = rand;
    }
    */

    game.input.onDown.add(pause);

    ops = game.add.group();
    ops.enableBody = true;

    var add = ops.create(10, 55, 'add');
    var subtract = ops.create(10, 85, 'subtract');
    
    add.inputEnabled = true;
    add.events.onInputDown.add(selected, this);
    add.value = "+";
    add.fixedToCamera = true;
    subtract.inputEnabled = true;
    subtract.events.onInputDown.add(selected, this);
    subtract.value = "-";
    subtract.fixedToCamera = true;

    /* multiply and divide code...

    var multiply = ops.create(730, 5, 'multiply');
    var divide = ops.create(760, 5, 'divide');
    multiply.inputEnabled = true;
    multiply.events.onInputDown.add(clickNum, this);
    multiply.value = "x";
    divide.inputEnabled = true;
    divide.events.onInputDown.add(clickNum, this);
    divide.value = "/";

    */
    pickup = game.add.audio('pickup');
    theme = game.add.audio('theme');
    win = game.add.audio('win');
    lose = game.add.audio('lose');

    theme.loop = true;
    theme.play();
}

function update() {

    //collisions
    game.physics.arcade.collide(player, layer);
    game.physics.arcade.overlap(player, items, addItem, null, this);
    

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

function pause() {
    if(game.paused) {
        theme.resume();
        Iunpause();
        game.paused = false;
    } else {
        theme.pause();
        Ipause();
        game.paused = true;
    }
}
