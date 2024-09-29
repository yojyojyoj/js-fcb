// Variables - storage of values
let board;
let score = 0;
let rows = 4;
let columns = 4;

function setGame(){

	board = [
		[2, 0, 2, 2],
		[0, 0, 0, 0],
		[0, 0, 0, 0],
		[0, 0, 0, 0]
	]; // This board will be used as the backend board to design and modify the tiles of the frontend board

	

	// loop
	for(let r=0; r<rows; r++){
		for(let c=0; c<columns; c++){

			// Creates a div element
			let tile = document.createElement("div");

			// Assign an id based on the position of the tile
			tile.id = r.toString() + "-" + c.toString();

			// Retrieves the number of the tile from the backend board
					// board[2][3]
			let num = board[r][c];

			updateTile(tile, num);

			document.getElementById("board").append(tile);
		}
	}
}

// This function is to update the color of the tile based on its num value
function updateTile(tile, num){

	tile.innerText = "";
	tile.classList.value = "";

	// <div class="tile"></div>
	tile.classList.add("tile");

	if(num > 0){

		// <div class="tile">2</div>
		tile.innerText = num.toString();

		// 2 < 8192
		if(num < 8192) {
			// <div class="tile x2">2</div>
			tile.classList.add("x" + num.toString());
		}
		else{
			tile.classList.add("x8192");
		}
	}
}

window.onload = function(){
	setGame(); // we call the setGame function
}


function handleSlide(e){

	console.log(e.code);

	if(["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(e.code)){

		if(e.code == "ArrowLeft"){
			slideLeft();
		}

		else if(e.code == "ArrowRight"){
			slideRight();
		}

		else if(e.code == "ArrowUp"){
			slideUp();
		}

		else if(e.code == "ArrowDown"){
			slideDown();
		}
	}
}

document.addEventListener("keydown", handleSlide);


// slideLeft function will use slide function to merge matching adjacent tiles.
function slideLeft(){

	for(let r=0; r<rows; r++){

		let row = board[r];
		row = slide(row);
		board[r] = row;

		for(let c=0; c<columns; c++){
			
			let tile = document.getElementById(r.toString() + "-" + c.toString());
			let num = board[r][c];
			updateTile(tile, num);
		}
	}
}


function filterZero(row){
	return row.filter(num => num != 0);
}

function slide(row){

	//[ 2, 0, 2, 2] -> [2, 2, 2]
	row = filterZero(row);

	for(let i=0; i < row.length-1; i++){

		if(row[i] == row[i+1]){ // true 
			row[i] = row[i] * 2; //[4, 2, 2]
			row[i+1] = 0; // [4, 0, 2]
		}
	}

	row = filterZero(row); // [4, 2]


	while(row.length < columns){
		row.push(0); // [4, 2, 0, 0]
	}
	return row;
}



