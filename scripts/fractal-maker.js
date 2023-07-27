var points = 3;
var N = 0;
var canvas = ctx = false;
var height = 500;
var width = 800;
var radius = 240;
var dotSize = 2;
var max_dots = 100000;
var center = {x: width/2, y: height/2};
var refPoints = [];

function increasePoints() { 
	points++;
	document.getElementById("f-points-text").innerHTML = points;
	update();
}

function decreasePoints() {
	if (points <= 3) return;
	
	points--;
	if (N >= points) decreaseN();
	document.getElementById("f-points-text").innerHTML = points;
	update();
}

function increaseN() {
	if (N >= points) return;
	
	N++;
	document.getElementById("f-consec-text").innerHTML = N;
	update();
}

function decreaseN() {
	if (N <= 0) return;
	
	N--;
	document.getElementById("f-consec-text").innerHTML = N;
	update();
}

function toGraph(posX,posY) { return {x: posX+center.x, y: -posY+center.y}; }

function setup() {
	canvas = document.getElementById("canvas");
	ctx = canvas.getContext("2d");
	
	document.getElementById("apply").addEventListener("click",apply);
}

function update() {
	ctx.clearRect(0,0,width,height);
	refPoints = [];
	
	ctx.beginPath();
	ctx.arc(center.x,center.y,2,0,Math.PI*2);
	ctx.fillStyle = 'red';
	ctx.fill();
	ctx.closePath();

	for (let j=0; j<points; j++) {
		// computation
		let intAngle = 360/points;
		let graph = toGraph(radius*Math.cos(j*intAngle*Math.PI/180),radius*Math.sin(j*intAngle*Math.PI/180));
		
		refPoints.push({x: graph.x, y: graph.y, canBeRef: true});
		
		ctx.beginPath();
		ctx.arc(graph.x,graph.y,2,0,Math.PI*2);
		ctx.fillStyle = 'blue';
		ctx.fill();
		ctx.closePath();
	}
}

function apply() {
	document.getElementById("f-points-dec").disabled = true;
	document.getElementById("f-points-inc").disabled = true;
	document.getElementById("f-consec-dec").disabled = true;
	document.getElementById("f-consec-inc").disabled = true;
	document.getElementById("apply").innerHTML = "Clear Fractal";
	
	document.getElementById("apply").removeEventListener("click", apply);
	document.getElementById("apply").addEventListener("click", deapply);
	
	let focalPoint = {x: center.x, y: center.y};
	let counter = 0;
	
	for (let p=0; p<max_dots; p++) {
		while (true) {
			r = Math.floor(Math.random() * points);
			if (refPoints[r].canBeRef) {
				counter++;
				refPoints[r].canBeRef = false;
				break;
			}
		}
		if (counter >= N-1) {
			for (point of refPoints) point.canBeRef = true;
			counter = 0;
		}
		let midpoint = {x: (focalPoint.x+refPoints[r].x)/2,
						y: (focalPoint.y+refPoints[r].y)/2};
		
		ctx.beginPath();
		ctx.fillStyle = 'black';
		ctx.fillRect(midpoint.x-dotSize/2,midpoint.y-dotSize/2,dotSize,dotSize);
		ctx.fill();
		ctx.closePath();
		
		focalPoint = midpoint;
	}
}

function deapply() {
	document.getElementById("f-points-dec").disabled = false;
	document.getElementById("f-points-inc").disabled = false;
	document.getElementById("f-consec-dec").disabled = false;
	document.getElementById("f-consec-inc").disabled = false;
	document.getElementById("apply").innerHTML = "Make Fractal";
	
	document.getElementById("apply").removeEventListener("click", deapply);
	document.getElementById("apply").addEventListener("click",apply);
	
	update();
}

setup();
update();