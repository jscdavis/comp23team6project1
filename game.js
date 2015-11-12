var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game', { preload: preload, create: create, update: update });

var player;
var enemy;
var enemy2;
var enemy3;
var enemy4;
var enemy5;
var enemy6;
var enemy7; 
var enemy8;
var enemy9;
var enemy10;
var enemy11;
var enemy12;
var enemy13;
var enemy14;
var enemy15;
var enemy16;
var enemy17;
var enemy18;
var enemy19;
var enemy20;
var enemy21;
var enemy22;
var enemy23;
var enemy24;
var enemy25;
var enemy26;
var enemy27;
var enemy28;
var enemy29;
var enemy30;
var enemy31;
var enemy32;
var enemy33;
var enemy34;
var enemy36;
var enemy38;
var enemy40;
var enemy42;
var enemy44;
var enemy46;
var enemy48;
var enemy50;
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
var ming2;
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
    
    enemyodd = game.add.group();
    //enemy = new Enemy (this, 32, game.world.height - 80);
    enemy3 = new Enemy (this, 32, game.world.height - 200);
    enemy5 = new Enemy (this, 2783, 2790);
    enemy7 = new Enemy (this, 2933, 2720);
    enemy9 = new Enemy (this, 4011, 2290);
    enemy11 = new Enemy (this, 80, 1799);
    enemy13 = new Enemy (this, 694, 1300);
    enemy15 = new Enemy (this, 3787, 2899);
    enemy17 = new Enemy (this, 4090, 2899);
    enemy19 = new Enemy (this, 4027, 299);
    enemy21 = new Enemy (this, 4280, 299);
    enemy23 = new Enemy (this, 4600, 299);
    enemy25 = new Enemy (this, 5800, 299);
    enemy27 = new Enemy (this, 3231, 399);
    enemy29 = new Enemy (this, 3591, 899);
    enemy31 = new Enemy (this, 3096, 899);
    enemy33 = new Enemy (this, 3225, 699);

    enemyodd.add(enemy3);
    enemyodd.add(enemy5);
    enemyodd.add(enemy7);
    enemyodd.add(enemy9);
    enemyodd.add(enemy11);
    enemyodd.add(enemy13);
    enemyodd.add(enemy15);
    enemyodd.add(enemy17);
    enemyodd.add(enemy19);
    enemyodd.add(enemy21);
    enemyodd.add(enemy23);
    enemyodd.add(enemy25);
    enemyodd.add(enemy27);
    enemyodd.add(enemy29);
    enemyodd.add(enemy31);
    enemyodd.add(enemy33);




    enemyeven = game.add.group();


    enemy6 = create_enemy2(433, 3099);
    enemy8 = create_enemy2(3228, 3099);
    enemy10 = create_enemy2(2000, 3099);
    enemy12 = create_enemy2(433, 3099);
    enemy14 = create_enemy2(4111, 2352);
    enemy16 = create_enemy2(514, 1190);
    enemy18 = create_enemy2(814, 1190);
    enemy20 = create_enemy2(2311, 1190);
    enemy22 = create_enemy2(3342, 1030);
    enemy24 = create_enemy2(3311, 811);
    enemy26 = create_enemy2(480, 790);
    enemy28 = create_enemy2(730, 690);
    enemy30 = create_enemy2(1040, 690);
    enemy32 = create_enemy2(1390, 690);
    enemy34 = create_enemy2(1735, 816);
    enemy36 = create_enemy2(2011, 690);
    enemy38 = create_enemy2(2244, 690);
    enemy40 = create_enemy2(4274, 200);
    enemy42 = create_enemy2(5130, 220);
    enemy44 = create_enemy2(6023, 220);
    enemy46 = create_enemy2(6213, 2800);
    enemy48 = create_enemy2(6200, 2800);
    enemy50 = create_enemy2(6200, 2790);
    

    enemyeven.add(enemy6);
    enemyeven.add(enemy8);
    enemyeven.add(enemy10);
    enemyeven.add(enemy12);
    enemyeven.add(enemy14);
    enemyeven.add(enemy16);
    enemyeven.add(enemy18);
    enemyeven.add(enemy20);
    enemyeven.add(enemy22);
    enemyeven.add(enemy24);
    enemyeven.add(enemy26);
    enemyeven.add(enemy28);
    enemyeven.add(enemy30);
    enemyeven.add(enemy32);
    enemyeven.add(enemy34);
    enemyeven.add(enemy36);
    enemyeven.add(enemy38);
    enemyeven.add(enemy40);
    enemyeven.add(enemy42);
    enemyeven.add(enemy44);
    enemyeven.add(enemy46);
    enemyeven.add(enemy48);
    enemyeven.add(enemy50);
  
    
    player = new Player(this, 200, game.world.height - 100);


    ming = game.add.sprite(game.world.width-32, game.world.height-64, 'ming');
    ming2 = game.add.sprite(game.world.width-32, 128, 'ming');


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
    game.physics.arcade.collide(enemyodd, platlayer, changeDirections);
    game.physics.arcade.collide(enemyeven, platlayer, changeDirections2);
    game.physics.arcade.collide(enemyodd, layer);
    game.physics.arcade.collide(enemyeven, layer);

    game.physics.arcade.overlap(player, items, addItem, null, this);
    game.physics.arcade.overlap(player, enemyodd, loser, null, this);
    game.physics.arcade.overlap(player, enemyeven, loser, null, this);
    
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