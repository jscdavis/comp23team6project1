class Inventory {

	var itemList; //list of items player currently has
	var overlay; //the picture that everything will be placed over
	var currentPUPSpot; //the next available spot in the create pup flow
	var currentItemSpot; //next available spot in the players inventory
	var opList; //list of states for each operator
	var numList; //list of which numbers are in each spot in the create pup flow
	var items; //array of item objects
	var ops; //array of operators
	var createButton; //button to be clicked when 


	constructor(parameters) {
		set parameters;
	}

	function createItems() {
		//creates an object for each item given
		//places each object in an apt spot on top of the overlay image
	}

	function selected(item) {
		//places the given item into the next available spot in the create pup flow
		//adds it to numList
	}

	function createPUP() {
		//checks what the numbers in the create flow add up to and returns the corresponding powerup code
	}

	function toggleOperator(opNumber) {
		//if an operator is clicked on it should switch to the next operator, e.g. + -> - -> * -> / -> blank -> +...
		//opNumber tells us which operator to change (out of the 3 or 4 used)
	}

	function getnumList() {
		//returns numList;
	}

	function clicked(item) {
		//calls apt method for whatever thing was clicked
	}

	function result() {
		//returns what the result of the current nums/ops is
		//returns SENTINAL if the result is not a whole number
	}
}

/* 

idea:
player only gets 5-10 spots in inverntory
can combine and 3 numbers at any time, with any operations, to save space
e.g. if they have 5, 7, 3, 52, 12, 20, they can do 5*7-12 to create 23 and will have 2 more open spots

*/