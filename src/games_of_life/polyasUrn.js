const CANVAS_WIDTH = 500
const CANVAS_HEIGHT = CANVAS_WIDTH
const CELLS_PER_ROW = 5
const CELLS_PER_COLUMN = CELLS_PER_ROW

class Marble {
	constructor(isRed){
		this.isRed = isRed
	}
}

class Grid {
	constructor(cellsPerRow, cellsPerColumn) {
		this.cellsPerRow = cellsPerRow;
		this.cellsPerColumn = cellsPerColumn;
		this.chunkSize = 1;
	}
	
	drawMarbles(marbles) {
		let cellCount = this.cellsPerRow * this.cellsPerColumn
		if((Math.ceil(marbles.length/this.chunkSize)) >= cellCount){
			this.incrementChunkSize()
		}
		
		let redMarbles = marbles.filter(marble => marble.isRed)
		let chunkedRedMarbles = chunk(redMarbles, this.chunkSize)
		let blackMarbles = marbles.filter(marble => !marble.isRed)
		let chunkedBlackMarbles = chunk(blackMarbles, this.chunkSize)

		let gridIndex = 0;

		for(let j = 0; j < chunkedRedMarbles.length; j++){
			let row = Math.floor(gridIndex % this.cellsPerRow)
			let column = Math.floor(gridIndex / this.cellsPerColumn)
			this.drawMarble(true, chunkedRedMarbles[j].length, row, column)
			gridIndex++;
		}

		for(let j = 0; j < chunkedBlackMarbles.length; j++){
			let row = Math.floor(gridIndex % this.cellsPerRow)
			let column = Math.floor(gridIndex / this.cellsPerColumn)
			this.drawMarble(false, chunkedBlackMarbles[j].length, row, column)
			gridIndex++;
		}
	}
	
	drawMarble(isRed, count, row, column) {
		let x = this.getCellXCoord(row);
		let y = this.getCellYCoord(column);
		let marbleColor;
		let textColor = color('white');
		if(isRed) { 
			marbleColor = color('red');
		} else {
			marbleColor = color('black');
		}
		fill(marbleColor);
		noStroke();
		ellipse(x, y, CANVAS_WIDTH/this.cellsPerRow, CANVAS_HEIGHT/this.cellsPerColumn);

		if(this.chunkSize > 1) {
			fill(textColor)
			let textPixelSize = (CANVAS_HEIGHT/this.cellsPerRow)/2
			textSize(textPixelSize);
			textAlign(CENTER, CENTER);
			text(count, x, y);
		}
	}
	
	getCellXCoord(row){
		let cellWidth = CANVAS_HEIGHT/this.cellsPerRow;
		return row * cellWidth + cellWidth/2;
	}

	getCellYCoord(column){
		let cellHeight = CANVAS_WIDTH/this.cellsPerRow;
		return column * cellHeight + cellHeight/2;
	}
	
	// Increases chunk size to next number divisible by 5
	incrementChunkSize(){
		this.chunkSize++
		while((this.chunkSize % 5) != 0){
			this.chunkSize++
		}
	}
}

const marbles = [
	new Marble(true), 
	new Marble(false)
]

const grid = new Grid(CELLS_PER_ROW, CELLS_PER_COLUMN);

function setup() {
	createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
	background('white');
}

function draw() {	
	clear();
	grid.drawMarbles(marbles);
}

function mouseClicked() {
	iterate();
}

function keyPressed(){
  if (key == ' ') { //this means space bar, since it is a space inside of the single quotes 
    iterate();
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