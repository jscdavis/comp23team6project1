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
var useKeys; //keys to select items for equation


function Inventory(game, x, y) {
	Phaser.Sprite.call(this, game, x, y, 'inventory');
	game.add.existing(this);
	this.fixedToCamera = true;
	currentPUP = 0;
	currentEqSpot = 0;
	currentItemSpot = 0;
	pupList = [0, 0];
	equationList = [0, 'plus', 0, 'plus', 0];
	equationSprites = new Array(5);
	itemSprites = new Array(7);
	pupSprites = new Array(2);
	itemList = [0, 0, 0, 0, 0, 0, 0];

	useKeys = {
		inv1: game.input.keyboard.addKey(Phaser.Keyboard.ONE),
		inv2: game.input.keyboard.addKey(Phaser.Keyboard.TWO),
		inv3: game.input.keyboard.addKey(Phaser.Keyboard.THREE),
		inv4: game.input.keyboard.addKey(Phaser.Keyboard.FOUR),
		inv5: game.input.keyboard.addKey(Phaser.Keyboard.FIVE),
		inv6: game.input.keyboard.addKey(Phaser.Keyboard.SIX),
		inv7: game.input.keyboard.addKey(Phaser.Keyboard.SEVEN),
		plus: game.input.keyboard.addKey(Phaser.Keyboard.PLUS),
		minus: game.input.keyboard.addKey(Phaser.Keyboard.MINUS),
		make: game.input.keyboard.addKey(Phaser.Keyboard.ENTER),
	}
}

Inventory.prototype.create = function () {

}

Inventory.prototype.update = function () {

}

function renderEquation() {
	for (var i = 0; i < equationList.length; i++) {
		if(i%2 == 0)
			equationSprites[i] = game.add.text(game, game.camera.x + 200 + i*50, game.camera.y + 200, equationList[i]);
		else
			equationSprites[i] = game.add.text(game, game.camera.x + 215 + i*50, game.camera.y + 215, equationList[i]);
	};
}

function renderInv () {
	for(var i = 0; i < itemList.length; i++) {
		if(itemList[i] != 0) {
			itemSprites[i] = game.add.bitmapText(game.camera.x, game.camera.y, 'bmFont', toStr(item.value), 32);
			itemSprites[i].fixedToCamera = true;
			itemSprites[i].cameraOffset.setTo(50*i + 10, 10);
		} else
			itemSprites[i] = null;
	};
}

function addItem(player, item) {
	if(currentItemSpot < FULL) {
		pickup.play();
		itemSprites[currentItemSpot] = game.add.bitmapText(game.camera.x, game.camera.y, 'bmFont', toStr(item.value), 32);
		itemSprites[currentItemSpot].fixedToCamera = true;
		itemSprites[currentItemSpot].cameraOffset.setTo(50*currentItemSpot + 10, 10);
		itemList[currentItemSpot] = item.value;
		currentItemSpot++;
		item.kill();
		return true;
	} else
		return false;
}

function removeItems() {
	//removes all items from inventory used in equation
	for (var i = 0; i < currentItemSpot; i++) {
		if(itemSprites[i].alpha < 1) {
			itemSprites[i] = itemSprites[i+1];
			itemList[i] = itemList[i+1];
			itemList[currentItemSpot-1] = 0;
			currentItemSpot--;
			i--;
		}
	}
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
	if(num < 0) {
		destroyEquation();
		return false;
	} else if(num == jumpCost) {
		pupList[0]++;
	} else if(num == projCost) {
		pupList[1] += 3;
	} else if(num != 0) {
		addItem(null, num);
	}
	removeItems();
	renderInv();
	return true;
}

function destroyEquation() {
	for(var i = 0; i < currentEqSpot; i++) {
		equationSprites[i].kill();
	};
	equationList = [0, 'plus', 0, 'plus', 0, 'plus', 0];
	currentEqSpot = 0;
	equation.kill();
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

function addToEq(pos) {
	if(currentEqSpot >= 5)
		return false;
	if(pos > 7) {
		if(pos == 10)
			equationList[currentEqSpot] = '+';
		if(pos == 20)
			equationList[currentEqSpot] = '-';
	}
	if(pos < 7 && itemList[pos] != 0) {
		equationList[currentEqSpot] = itemList[pos];
		equationSprites[currentEqSpot] = game.add.bitmapText(game.camera.x + 200 + currentEqSpot*50, game.camera.y + 200, 'bmFont', toStr(item.value), 32);
		itemSprites[pos].alpha = 0.25;
	}
	currentEqSpot++;
	return true;
}

function Ipause() {
	equation = game.add.sprite(game.camera.x + 200, game.camera.y + 200, 'equation');
	console.log('test1');
	console.log('test2');
	console.log('test3');
	//while(!useKeys.make.isDown) {
		console.log('test4');
		if(useKeys.inv1.isDown && itemSprites[0].alpha == 1 && currentEqSpot%2 != 0) {
			console.log('test5');
			addToEq(0);
		}
		if(useKeys.inv2.isDown && itemSprites[1].alpha == 1 && currentEqSpot%2 != 0) {
			addToEq(1);
		}
		if(useKeys.inv3.isDown && itemSprites[2].alpha == 1 && currentEqSpot%2 != 0) {
			addToEq(2);
		}
		if(useKeys.inv4.isDown && itemSprites[3].alpha == 1 && currentEqSpot%2 != 0) {
			addToEq(3);
		}
		if(useKeys.inv5.isDown && itemSprites[4].alpha == 1 && currentEqSpot%2 != 0) {
			addToEq(4);
		}
		if(useKeys.inv6.isDown && itemSprites[5].alpha == 1 && currentEqSpot%2 != 0) {
			addToEq(5);
		}
		if(useKeys.inv7.isDown && itemSprites[6].alpha == 1 && currentEqSpot%2 != 0) {
			addToEq(6);
		}
		if(useKeys.plus.isDown && currentEqSpot%2 == 0) {
			addToEq(0);
		}
		if(useKeys.minus.isDown && currentEqSpot%2 == 0) {
			addToEq(0);
		}
		if(useKeys.make.isDown) {
			createEq();
		}
	//}
}

function Iunpause() {
	destroyEquation();
}