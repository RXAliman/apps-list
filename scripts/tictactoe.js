var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var height = 500;
var width = 800;
var pieceSize = 100;

function spawnGrid() {
	// Computation
	let gridPos = {
		x: width/2 - pieceSize*3/2,
		y: height/2 - pieceSize*3/2
	};

	for (let a=0; a<3; a++) {
		for (let b=0; b<3; b++) {
			ctx.beginPath();
			ctx.fillStyle = 'white';
			ctx.strokeStyle = 'black';
			ctx.lineWidth = 3;
			ctx.fillRect(b*pieceSize+gridPos.x,a*pieceSize+gridPos.y,pieceSize,pieceSize);
			ctx.strokeRect(b*pieceSize+gridPos.x,a*pieceSize+gridPos.y,pieceSize,pieceSize);
			ctx.fill();
			ctx.stroke();
			ctx.closePath();
		}
	}
}

spawnGrid();