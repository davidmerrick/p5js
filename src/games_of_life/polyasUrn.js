class Marble {
	constructor(isRed){
		this.isRed = isRed
	}
}

const CANVAS_WIDTH = 500
const CANVAS_HEIGHT = CANVAS_WIDTH
const CELLS_PER_ROW = 5
const CELLS_PER_COLUMN = CELLS_PER_ROW
let chunkSize = 1;

const marbles = [
	new Marble(true), 
	new Marble(false)
]


function setup() {
	createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
	background('white');
}

function draw() {	
	clear();
	let redMarbles = marbles.filter(marble => marble.isRed)
	let chunkedRedMarbles = chunk(redMarbles, chunkSize)
	let blackMarbles = marbles.filter(marble => !marble.isRed)
	let chunkedBlackMarbles = chunk(blackMarbles, chunkSize)
	
	let canvasIndex = 0;
	
	for(let j = 0; j < chunkedRedMarbles.length; j++){
		let row = Math.floor(canvasIndex % CELLS_PER_ROW)
		let column = Math.floor(canvasIndex / CELLS_PER_COLUMN)
		drawMarble(true, chunkedRedMarbles[j].length, row, column)
		canvasIndex++;
	}
	
	for(let j = 0; j < chunkedBlackMarbles.length; j++){
		let row = Math.floor(canvasIndex % CELLS_PER_ROW)
		let column = Math.floor(canvasIndex / CELLS_PER_COLUMN)
		drawMarble(false, chunkedBlackMarbles[j].length, row, column)
		canvasIndex++;
	}
}

function mouseClicked(){
	iterate();
	let cellCount = CELLS_PER_ROW * CELLS_PER_ROW
	if((marbles.length/chunkSize) > cellCount){
		incrementChunkSize()
	}
}

function getCellXCoord(row){
	let cellWidth = CANVAS_HEIGHT/CELLS_PER_ROW;
	return row * cellWidth + cellWidth/2;
}

function getCellYCoord(column){
	let cellHeight = CANVAS_WIDTH/CELLS_PER_ROW;
	return column * cellHeight + cellHeight/2;
}

function drawMarble(isRed, count, row, column) {
	let x = getCellXCoord(row);
	let y = getCellYCoord(column);
	let marbleColor;
	let textColor = color('white');
	if(isRed) { 
		marbleColor = color('red');
	} else {
		marbleColor = color('black');
	}
	fill(marbleColor);
	noStroke();
	ellipse(x, y, CANVAS_WIDTH/CELLS_PER_ROW, CANVAS_HEIGHT/CELLS_PER_ROW);
	
	if(chunkSize > 1) {
		fill(textColor)
		let textPixelSize = (CANVAS_HEIGHT/CELLS_PER_ROW)/2
		textSize(textPixelSize);
		textAlign(CENTER, CENTER);
		text(count, x, y);
	}
}

// Increases chunk size to next number divisible by 5
function incrementChunkSize(){
	chunkSize++
	while((chunkSize % 5) != 0){
		chunkSize++
	}
}

function iterate(){
	// Draw a random marble out
	let marble = marbles[Math.floor(Math.random() * marbles.length)]
	
	// Add a new one that matches the color
	marbles.push(new Marble(marble.isRed))
}

function chunk(array, size) {
  const chunkedArray = []
  for (var i = 0; i < array.length; i += size) {
   chunkedArray.push(array.slice(i, i + size))
  }
  return chunkedArray
}
