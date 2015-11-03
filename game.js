var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game', { preload: preload, create: create, update: update });

var player;
var enemy;
var enemy2;
var inventory;
var items;
var enemies;
var map;
var layer;
var platlayer;
var ojectlayer;
var pickup;
var theme;
var win;
var lose;
var ming;
var actionKeys;
var jButton;
var pButton;
var posAvailable = 0;
var textPos = 0;

function preload() {
    game.load.bitmapFont('bmFont', 'assets/bmFont.png', 'assets/bmFont.xml');
    game.load.tilemap('map', 'assets/tilemap.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.audio('pickup', 'assets/pickup.mp3');
    game.load.audio('win', 'assets/win.mp3');
    game.load.audio('lose', 'assets/lose.mp3');
    game.load.audio('theme', 'assets/theme.mp3');
    game.load.image('enemy', 'assets/enemy.png');
    game.load.spritesheet('enemy2', 'assets/metalslug_mummy37x45.png', 37, 45, 18);
    game.load.image('grass', 'assets/grass.png');
    game.load.image('dirt', 'assets/dirt.png');
    game.load.image('sky', 'assets/sky.png');
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
    game.load.image('carrot', 'assets/carrot.png');
    game.load.image('calc', 'assets/calc.png');
    game.load.image('ming', 'assets/mingTile.png');
    game.load.image('winner', 'assets/winner.png');
    game.load.image('loser', 'assets/loser.png');

}

function create() {

    map = game.add.tilemap('map');

    map.addTilesetImage('grass');
    map.addTilesetImage('dirt');
    map.addTilesetImage('platformN');
    map.addTilesetImage('sky');

    layer = map.createLayer('Tile Layer');
    layer.resizeWorld();

    platlayer = map.createLayer('Platform Layer');

    var array = [4];
    map.setCollisionByExclusion(array, true, layer);
    map.setCollisionBetween(0, 1000, true, platlayer);

    items = game.add.group();
    items.enableBody = true;

    var rand = Math.floor(Math.random()*10);
    var str = toStr(rand);

    map.createFromObjects('Number Layer', 8, 'carrot', 0, true, false, items);

    items.forEach(updateNum, this);

    inventory = new Inventory(this, 0, 0);

    actionKeys = {
        pause: game.input.keyboard.addKey(Phaser.Keyboard.K),
        mute: game.input.keyboard.addKey(Phaser.Keyboard.M),
        useJ: game.input.keyboard.addKey(Phaser.Keyboard.COMMA),
        useP: game.input.keyboard.addKey(Phaser.Keyboard.PERIOD),
    };
    jButton = false;
    pButton = false;

    game.physics.startSystem(Phaser.Physics.ARCADE);
    player = new Player(this, 200, game.world.height - 600);

    enemy = new Enemy (this, 32, game.world.height - 80);
    enemy2 = create_enemy2();

    ming = game.add.sprite(64, game.world.height-64, 'ming');

    game.input.onDown.add(pause);

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
    game.physics.arcade.collide(player, platlayer);
    game.physics.arcade.collide(enemy, platlayer, changeDirections);
    game.physics.arcade.collide(enemy2, platlayer, changeDirections2);
    game.physics.arcade.collide(enemy, layer);
    game.physics.arcade.collide(enemy2, layer);

    game.physics.arcade.overlap(player, items, addItem, null, this);
    game.physics.arcade.overlap(player, enemy, loser, null, this);
    game.physics.arcade.overlap(player, enemy2, loser, null, this);
    game.physics.arcade.overlap(player, ming, winner);


    if(actionKeys.mute.isDown) {
        if(theme.volume == 1) {
            theme.fadeOut();
        } else if(theme.volume == 0) {
            theme.fadeIn();
        }
    }
    if(actionKeys.useJ.isDown) {
        if(jButton) {
            use(0);
            jButton = false;
        }
    } else {
        jButton = true;
    }
    if(actionKeys.useP.isDown) {
        if(pButton) {
            pButton = false;
            use(1);
        }
    } else {
        pButton = true;
    }
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

function updateNum(number) {
    var r = Math.floor(Math.random()*9 + 1);
    number.value = r;
}

function winner(player) {
    theme.stop();
    win.play();
    game.add.sprite(game.camera.x + 200, game.camera.y + 200, 'winner');
    game.pause();
}

function loser(player) {
    killPlayer(player);
    theme.stop();
    lose.play();
    game.add.sprite(game.camera.x + 200, game.camera.y + 200, 'loser');
}

function pause() {
    if(game.paused) {
        theme.resume();
        game.paused = false;
    } else {
        theme.pause();
        game.paused = true;
    }
}