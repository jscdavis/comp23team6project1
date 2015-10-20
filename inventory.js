Inventory.prototype = Object.create(Phaser.Sprite.prototype);

Inventory.prototype.constructor = Inventory;


var SENTINEL = -1000;
var FULL = 7;
var jumpCost = 15;
var projCost = 25;
var maxJump = 5; //max number of extra jump powerups allowed at once
var maxProj = 10; //max number of projectile powerups allowed at once
var itemList; //list of items player currently has
var itemSprites; //list of sprites displaying items
var pupList; //list of pups player currently has
var pupSprites; //list of sprites displaying pup info
var equationList; //list of values in the equation
var equationSprites; //list of sprites in the equation
var equation; //sprite displaying equation UI
var currentPUP; //current pup selected
var currentEqSpot; //the next available spot in the create pup flow
var currentItemSpot; //next available spot in the players inventory
var createButton; //button to be clicked when


function Inventory(game, x, y) {
	Phaser.Sprite.call(this, game, x, y, 'inventory');
	game.add.existing(this);
	this.fixedToCamera = true;

	//createButton = game.add.sprite(0, game.world.height-32, 'multiply');
	//createButton.fixedToCamera = true;
	currentPUP = 0;
	currentEqSpot = 0;
	currentItemSpot = 0;
	pupList = [0, 0];
	equationList = [0, 'plus', 0, 'plus', 0];
	equationSprites = new Array(5);
	itemSprites = new Array(7);
	pupSprites = new Array(2);
	itemList = ['0', '0', '0', '0', '0', '0', '0'];

}

Inventory.prototype.update = function () {

}

function highlight(ID) {
	//highlights box around ID location
	//0-6 = item spots, 7-10 = pup spots

}

function renderEquation() {
	for (var i = 0; i < equationList.length; i++) {
		if(i%2 == 0)
			equationSprites[i] = game.add.text(game, game.camera.x + 200 + i*50, game.camera.y + 200, equationList[i]);
		else
			equationSprites[i] = game.add.text(game, game.camera.x + 215 + i*50, game.camera.y + 215, equationList[i]);
	};
}

function renderInv (argument) {
	//render current inventory
}

function addItem(player, item) {
	if(currentItemSpot < FULL) {
		pickup.play();
		itemSprites[currentItemSpot] = game.add.bitmapText(game.camera.x + 50*currentItemSpot + 10, game.camera.y, 'bmFont', toStr(item.value), 32);
		itemSprites[currentItemSpot].fixedToCamera = true;
		itemSprites[currentItemSpot].cameraOffset.setTo(10, 10);
		itemList[currentItemSpot] = item.value;
		console.log(item.value);
		currentItemSpot++;
		item.kill();
		return true;
	} else
		return false;
}

function removeItem(position) {
	//removes item from inventory in position position
	if(position >= currentItemSpot) {
		return false;
	}
	for (var i = position; i < currentItemSpot; i++) {
		if(i != 6)
			itemList[i] = itemList[i+1];
	}
	itemList[currentItemSpot-1] = '0';
	currentItemSpot--;
}

function selected(item) {
	//places the given item into the next available spot in the create pup flow
	//adds it to numList
	if(currentEqSpot == FULL || !game.paused)
		return false;

	if(currentEqSpot%2 == 0) { //expecting number
		if(item.value == '+' || item.value == '-')
			return false;
	} else {
		if(item.value != '+' && item.value != '-')
			return false;
	}
	equationList[currentEqSpot] = item.value;
	currentEqSpot++;
	renderEquation();
	return true;
}

function createEq() {
	var num = result();
	if(num == SENTINEL)
		return;
	if(num == jumpCost) {
		pupList[0]++;
	} else if(num == projCost) {
		pupList[1] += 3;
	}
}

function result() {
	//returns what the result of the current nums/ops is
	var result;

	if(currentEqSpot == 0) {
		return SENTINEL;
	}
	result += equationList[0];
	if(equationList[1] == '+') {
		result += equationList[2];
	} else if(equationList[1] == '-') {
		result -= equationList[2];
	}
	if(equationList[3] == '+') {
		result += equationList[4];
	} else if(equationList[3] == '-') {
		result -= equationList[4];
	}
	return result;
}

function Ipause() {
	equation = game.add.sprite(game.camera.x + 200, game.camera.y + 200, 'equation');
}

function Iunpause() {
	currentEqSpot = 0;
	equationList = [0, 'plus', 0, 'plus', 0, 'plus', 0];
	for(var i = 0; i < currentEqSpot; i++) {
		equationSprites[i].kill();
	};
	equation.kill();
}