var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
const height = 500;
const width = 800;
const pieceSize = 100;
const framerate = 1/60;
const framedelay = framerate * 1000;
var mouse = {x: 0, y: 0, isDown: false};

class Gamepiece {
	constructor(position,fillColor = "white",type = "None",isDraggable = false) {
		this.position = {
			x: position.x,
			y: position.y,
		};
		this.type = type;
		this.fillColor = fillColor;
		this.isDraggable = isDraggable;
	}
	// Getters
	get getPosition() {
		return position;
	}
	get getCenter() {
		return {
			x: pieceSize/2+this.position.x,
			y: pieceSize/2+this.position.y
		};
	}
	// Methods
	isMouseOver(mousePos) {
		if (mousePos.x >= this.position.x &&
			mousePos.x < this.position.x+pieceSize &&
			mousePos.y >= this.position.y &&
			mousePos.y < this.position.y+pieceSize) return true;
		else
			return false;
	}
	changeColor(color) {
		this.fillColor = color;
	}
	move(mousePos) {
		this.position.x = mousePos.x - pieceSize/2;
		this.position.y = mousePos.y - pieceSize/2;
	}
	render() {
		ctx.beginPath();
		ctx.fillStyle = this.fillColor;
		ctx.strokeStyle = 'black';
		ctx.lineWidth = 3;
		ctx.fillRect(this.position.x,this.position.y,pieceSize,pieceSize);
		ctx.strokeRect(this.position.x,this.position.y,pieceSize,pieceSize);
		ctx.fill();
		ctx.stroke();
		ctx.closePath();
		
		ctx.beginPath();
		ctx.fillStyle = 'black';
		if (this.type != "None") {
			ctx.font = "80px Arial";
			ctx.textAlign = "center";
			ctx.textBaseline = "middle";
			
			if (this.type === "X")
				ctx.fillText("X",this.getCenter.x,this.getCenter.y);
			else
				ctx.fillText("O",this.getCenter.x,this.getCenter.y);
		}
		ctx.closePath();
	}
}

function setup() {
	// Setup event handlers
	canvas.addEventListener("mousemove", (e) => {
	    mouse.x = e.pageX - canvas.offsetLeft;
		mouse.y = e.pageY - canvas.offsetTop;
	});
	document.addEventListener("mousedown", (e) => {
		mouse.isDown = true;
	});
	document.addEventListener("mouseup", (e) => {
		mouse.isDown = false;
	});
	
	// Setup Grid
	Grid = [];
	let gridPos = {
		x: width/2 - pieceSize*3/2,
		y: height/2 - pieceSize*3/2
	}
	for (let y=0; y<3; y++) {
		for (let x=0; x<3; x++) {
			let obj = new Gamepiece({x: pieceSize*x+gridPos.x, y: pieceSize*y+gridPos.y},"white","None");
			Grid.unshift(obj);
		}
	}
	// Setup Playerpieces
	Playerpieces = [
		new Gamepiece({x: 75, y: 200},"white","X",true),
		new Gamepiece({x: 625, y: 200},"white","O",true)
	];
}

function updatePieces() {
	// Update grid
	Grid.forEach(gridBox => {
		if (gridBox.isMouseOver(mouse) && mouse.isDown)
			gridBox.changeColor("#aaa");
		else
			gridBox.changeColor("white");
	});
	
	// Update player pieces
	Playerpieces.forEach(pp => {
		if (pp.isDraggable && pp.isMouseOver(mouse) && mouse.isDown) {
			pp.move(mouse);
		}
	});
}

function renderPieces() {	
	// Render grid
	Grid.forEach(gridBox => {
		gridBox.render();
	});
	
	// Render player pieces
	Playerpieces.forEach(pp => {
		pp.render();
	});
}

function gameLoop() {
	ctx.clearRect(0,0,width,height);
	renderPieces();
	updatePieces();
}

setup();
var loopTimer = setInterval(gameLoop, framedelay);