Inventory.prototype = Object.create(Phaser.Sprite.prototype);

Inventory.prototype.constructor = Inventory;


var SENTINEL = -1000;
var FULL = 7;
var itemList; //list of items player currently has
var pupList; //list of pups player currently has
var createList;
var equationSprites;
var itemSprites;
var pupSprites;
var equation;
var currentPUPSpot; //the next available spot in the create pup flow
var currentItemSpot; //next available spot in the players inventory
var createButton; //button to be clicked when


function Inventory(game, x, y) {
	Phaser.Sprite.call(this, game, x, y, 'inventory');
	game.add.existing(this);
	this.fixedToCamera = true;

	currentPUPSpot = 0;
	currentItemSpot = 0;
	pupList = [0, 0, 0, 0];
	createList = ['0', 'plus', '0', 'plus', '0'];
	equationSprites = new Array(5);
	itemSprites = new Array(7);
	pupSprites = new Array(4);
	itemList = ['0', '0', '0', '0', '0', '0', '0'];
}

function renderEquation() {
	for (var i = 0; i < createList.length; i++) {
		equationSprites[i] = game.add.text(game, location, locat, createList[i]);
	};
}

function renderInv (argument) {
	//render current inventory
}

function addItem(player, item) {
	if(currentItemSpot < FULL) {
		itemSprites[currentItemSpot] = game.add.bitmapText(game.camera.x + 50*currentItemSpot + 10, game.camera.y, 'bmFont', 'sup', 32);
		itemSprites[currentItemSpot].fixedToCamera = true;
		itemSprites[currentItemSpot].cameraOffset.setTo(10, 10);
		itemList[currentItemSpot] = item.value;
		console.log(game.camera.y);
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
		itemList[i] = itemList[i+1];
	}
	itemList[currentItemSpot-1] = '0';
	currentItemSpot--;
}

function selected(item) {
	//places the given item into the next available spot in the create pup flow
	//adds it to numList
	if(currentPUPSpot == FULL || !game.paused)
		return false;

	if(currentPUPSpot%2 == 0) { //expecting number
		if(item.value == '+' || item.value == '-')
			return false;
	} else {
		if(item.value != '+' && item.value != '-')
			return false;
	}
	createList[currentPUPSpot] = item.value;
	currentPUPSpot++;
	renderEquation();
	return true;
}

function createPUP() {
	//checks what the numbers in the create flow add up to and returns the corresponding powerup code
}

function getnumList() {
	//returns numList;
}

function result() {
	//returns what the result of the current nums/ops is
	if(currentPUPSpot == 0) {
		return SENTINEL;
	}
}

function Ipause() {
	equation = game.add.sprite(game.camera.x + 200, game.camera.y + 200, 'equation');
}

function Iunpause() {
	currentPUPSpot = 0;
	createList = [0, 'plus', 0, 'plus', 0, 'plus', 0];
	for(var i = 0; i < equationSprites.length; i++) {
		//equationSprites[i].kill();
	};
	equation.kill();
}