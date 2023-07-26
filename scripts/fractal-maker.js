var refPoints = 3;
var canvas = ctx = false;
var height = 500;
var width = 800;

function increasePoints() { 
	refPoints++;
	document.getElementById("f-points-text").innerHTML = refPoints;
}

function decreasePoints() {
	if (refPoints <= 3) return;
	
	refPoints--;
	document.getElementById("f-points-text").innerHTML = refPoints;
}

function setup() {
	canvas = document.getElementById("canvas");
	ctx = canvas.getContext("2d");
	
	ctx.beginPath();
	ctx.arc(200,200,5,0,Math.PI*2);
	ctx.fillStyle = 'red';
	ctx.fill();
	ctx.closePath();
	
	ctx.save();
}

setup();