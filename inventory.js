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
	pupList = [10, 0];
	equationList = [0, '+', 0, '+', 0];
	equationSprites = new Array(5);
	itemSprites = new Array(7);
	pupSprites = new Array(2);
	itemList = [0, 0, 0, 0, 0, 0, 0];
	equation = game.add.sprite(game.camera.x + 375, game.camera.y + 10, 'equation');
	equation.fixedToCamera = true;

	pupSprites[0] = game.add.bitmapText(game.camera.x, game.camera.y, 'bmFont', pupList[0].toString(), 12);
	pupSprites[0].fixedToCamera = true;
	pupSprites[0].cameraOffset.setTo(645, 40); 
	pupSprites[1] = game.add.bitmapText(game.camera.x, game.camera.y, 'bmFont', pupList[1].toString(), 12);
	pupSprites[1].fixedToCamera = true;
	pupSprites[1].cameraOffset.setTo(745, 40); 

	useKeys = {
		inv1: game.input.keyboard.addKey(Phaser.Keyboard.ONE),
		inv2: game.input.keyboard.addKey(Phaser.Keyboard.TWO),
		inv3: game.input.keyboard.addKey(Phaser.Keyboard.THREE),
		inv4: game.input.keyboard.addKey(Phaser.Keyboard.FOUR),
		inv5: game.input.keyboard.addKey(Phaser.Keyboard.FIVE),
		inv6: game.input.keyboard.addKey(Phaser.Keyboard.SIX),
		inv7: game.input.keyboard.addKey(Phaser.Keyboard.SEVEN),
		plus: game.input.keyboard.addKey(Phaser.Keyboard.EQUALS),
		minus: game.input.keyboard.addKey(Phaser.Keyboard.UNDERSCORE),
		make: game.input.keyboard.addKey(Phaser.Keyboard.ENTER),
		esc: game.input.keyboard.addKey(Phaser.Keyboard.ESC),
	}
}

Inventory.prototype.create = function () {

}

Inventory.prototype.update = function () {

	if(useKeys.inv1.isDown && currentItemSpot >= 1 && itemSprites[0].alpha == 1 && currentEqSpot%2 == 0) {
		addToEq(0);
	}
	if(useKeys.inv2.isDown && currentItemSpot >= 2 && itemSprites[1].alpha == 1 && currentEqSpot%2 == 0) {
		addToEq(1);
	}
	if(useKeys.inv3.isDown && currentItemSpot >= 3 && itemSprites[2].alpha == 1 && currentEqSpot%2 == 0) {
		addToEq(2);
	}
	if(useKeys.inv4.isDown && currentItemSpot >= 4 && itemSprites[3].alpha == 1 && currentEqSpot%2 == 0) {
		addToEq(3);
	}
	if(useKeys.inv5.isDown && currentItemSpot >= 5 && itemSprites[4].alpha == 1 && currentEqSpot%2 == 0) {
		addToEq(4);
	}
	if(useKeys.inv6.isDown && currentItemSpot >= 6 && itemSprites[5].alpha == 1 && currentEqSpot%2 == 0) {
		addToEq(5);
	}
	if(useKeys.inv7.isDown && currentItemSpot >= 7 && itemSprites[6].alpha == 1 && currentEqSpot%2 == 0) {
		addToEq(6);
	}
	if(useKeys.plus.isDown && currentEqSpot%2 != 0) {
		addToEq(10);
	}
	if(useKeys.minus.isDown && currentEqSpot%2 != 0) {
		addToEq(20);
	}
	if(useKeys.make.isDown) {
		createEq();
	}
	if(useKeys.esc.isDown) {
		destroyEquation();
		restoreItems();
	}
}

function renderEquation() {
	for (var i = 0; i < equationList.length; i++) {
		if(i%2 == 0)
			equationSprites[i] = game.add.bitmapText(game, game.camera.x + 505 + i*50, game.camera.y + 5, 'bmFont', equationList[i].toString(), 24);
		else
			equationSprites[i] = game.add.bitmapText(game, game.camera.x + 520 + i*50, game.camera.y + 10, 'bmFont', equationList[i], 8);
	};
}

function renderInv () {
	currentItemSpot = 0;
	for(var i = 0; i < itemList.length; i++) {
		if(itemSprites[i] != null) {
			itemSprites[i].kill();
		}
		if(itemList[i] != 0) {
			addNum(parseInt(itemList[i]));
			itemSprites[i].fixedToCamera = true;
			itemSprites[i].cameraOffset.setTo(50*i + 10, 10);
		} else
			itemSprites[i] = null;
	};
	for(var j = 0; j < pupList.length; j++) {
		pupSprites[j].kill();
		pupSprites[j] = game.add.bitmapText(game.camera.x, game.camera.y, 'bmFont', pupList[j].toString(), 12);
		pupSprites[j].fixedToCamera = true;
		pupSprites[j].cameraOffset.setTo(645 + j*100, 40); 
	};
}

function addItem(player, item) {
	if(currentItemSpot < FULL) {
		pickup.play();
		itemSprites[currentItemSpot] = game.add.bitmapText(game.camera.x, game.camera.y, 'bmFont', item.value.toString(), 32);
		itemSprites[currentItemSpot].fixedToCamera = true;
		itemSprites[currentItemSpot].cameraOffset.setTo(50*currentItemSpot + 10, 10);
		itemList[currentItemSpot] = parseInt(item.value);
		currentItemSpot++;
		item.kill();
		renderInv();
		return true;
	} else
		return false;
}

function addNum(num) {
	var fontsize = 32;
	if(num >= 10)
		fontsize = 20;
	var numStr = '' + num;
	if(currentItemSpot < FULL) {
		pickup.play();
		itemSprites[currentItemSpot] = game.add.bitmapText(game.camera.x, game.camera.y, 'bmFont', numStr, fontsize);
		itemSprites[currentItemSpot].fixedToCamera = true;
		if(fontsize == 32) {
			itemSprites[currentItemSpot].cameraOffset.setTo(50*currentItemSpot + 10, 10);
		} else {
			itemSprites[currentItemSpot].cameraOffset.setTo(50*currentItemSpot + 4, 15);
		}
		itemList[currentItemSpot] = num;
		currentItemSpot++;
		return true;
	} else
		return false;
}
//TODO: fix this
function removeItems() {
	//removes all items from inventory used in equation
	var count = 0;
	for (var i = 0; i < currentItemSpot; i++) {
		if(itemSprites[i].alpha == 1) {
			itemList[count] = itemList[i];
			count++;
		} else {
			itemSprites[i].kill();
		}
	}
	for(var j = count; j < currentItemSpot; j++) {
		itemList[j] = 0;
	}
	currentItemSpot = count;
	renderInv();
}

function restoreItems() {
	for(var i = 0; i < currentItemSpot; i++) {
		itemSprites[i].alpha = 1;
	};
}

function createEq() {
	var num = result();

	if(num < 0) {
		destroyEquation();
		restoreItems();
		return false;

	} else if(num == jumpCost) {
		pupList[0]+=3;
		removeItems();

	} else if(num == projCost) {
		pupList[1] += 3;
		removeItems();

	} else if(num != 0) {
		removeItems();
		addNum(num);
	} else if(num == 0) {
		removeItems();
	}
	destroyEquation();
	return true;
}

function addToEq(pos) {
	var posx, posy;

	if(currentEqSpot >= 5)
		return false;
	if(pos > 7) {
		if(pos == 10) {
			equationList[currentEqSpot] = '+';
			posx = 385 + currentEqSpot*50;
			posy = 25;
		}
		if(pos == 20) {
			equationList[currentEqSpot] = '-';
			posx = 385 + currentEqSpot*50;
			posy = 25;
		}
	}
	if(pos < 7 && itemList[pos] != 0) {
		posx = 385 + currentEqSpot*50;
		posy = 20;
		equationList[currentEqSpot] = '' + itemList[pos];
		itemSprites[pos].alpha = 0.25;
	}
	equationSprites[currentEqSpot] = game.add.bitmapText(game.camera.x, game.camera.y, 'bmFont', equationList[currentEqSpot], 24);
	equationSprites[currentEqSpot].fixedToCamera = true;
	equationSprites[currentEqSpot].cameraOffset.setTo(posx, posy);
	currentEqSpot++;
	return true;
}

function destroyEquation() {
	for(var i = 0; i < currentEqSpot; i++) {
		equationSprites[i].kill();
	};
	equationList = [0, 'plus', 0, 'plus', 0, 'plus', 0];
	currentEqSpot = 0;
}

function result() {
	//returns what the result of the current nums/ops is
	var result = 0;

	if(currentEqSpot < 3) {
		return SENTINEL;
	}

	result += parseInt(equationList[0]);

	if(equationList[1] == '+') {
		result += parseInt(equationList[2]);

	} else if(equationList[1] == '-') {
		result -= parseInt(equationList[2]);
	}

	if(currentEqSpot < 5) {
		return result;
	}

	if(equationList[3] == '+') {
		result += parseInt(equationList[4]);

	} else if(equationList[3] == '-') {
		result -= parseInt(equationList[4]);

	}
	return result;
}

function use(id) {
	if(id == 0) {
		if(pupList[0] > 0) {
			useItem(0);
			pupList[0]--;
			renderInv();
		}
	} else if(id == 1) {
		if(pupList[1] > 0) {
			useItem(1);
			pupList[1]--;
			renderInv();
		}
	}
}