var canvas = document.getElementById("canvas");
var c = canvas.getContext("2d");
var out = document.getElementById("out");
window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

var init = requestAnimationFrame(start);
var pelaaja1 = new Pelaaja(875, canvas.height / 2);
var pelaaja2 = new Pelaaja(canvas.width - 875, canvas.height / 2);
var pallo = new Pallo(canvas.width / 2, canvas.height / 2);
var wDown = false;
var sDown = false;
var aDown = false;
var dDown = false;
var upDown = false;
var downDown = false;
var leftDown = false;
var rightDown = false;
var isMuted = false;
function start() {
    clear();
    renderBackground();
	renderLine();
    renderGates();
    checkKeyboardStatus();
    checkPlayersBounds();
    checkBallBounds();
    checkPlayers_BallCollision();
    movePlayers();
    moveBall();
    renderPlayers();
    renderBall();

    out.innerHTML = "<span style='color: red;'>Red: " + pelaaja1.score + "</span><br><span style='color: blue;'>Blue: " + pelaaja2.score + "</span>";
    requestAnimationFrame(start);
}

function toggleMute() {
    isMuted = !isMuted;
    var muteIcon = document.getElementById('muteIcon');
    var scoreSound = document.getElementById('scoreSound');

    if (isMuted) {
        muteIcon.src = '../kuvat/mute.png';
        scoreSound.muted = false;
    } else {
        muteIcon.src = '../kuvat/volume.png';
        scoreSound.muted = true;
    }
}

function playScoreSound() {
    var scoreSound = document.getElementById('scoreSound');
    scoreSound.currentTime = 0;
    scoreSound.play();
}

function Pallo(x,y){
	this.x = x;
	this.y = y;
	this.xVel = 1;
	this.yVel = 1;
	this.decel = 0.1;
	this.size = 5;
}

function Pelaaja(x,y){
	this.x = x;
	this.y = y;
	this.size = 20;
	this.xVel = 0;
	this.yVel = 0;
	this.score = 0;
	this.accel = 0.55;
	this.decel = 0.55;
	this.maxSpeed = 3;
}

function reset() {
    var score1 = pelaaja1.score;
    var score2 = pelaaja2.score;
    pelaaja1 = new Pelaaja(875, canvas.height / 2);
    pelaaja1.score = score1;
    pelaaja2 = new Pelaaja(canvas.width - 875, canvas.height / 2);
    pelaaja2.score = score2;
    pallo = new Pallo(canvas.width / 2, canvas.height / 2);
    wDown = false;
    sDown = false;
    aDown = false;
    dDown = false;
    upDown = false;
    downDown = false;
    leftDown = false;
    rightDown = false;
}

function movePlayers(){
	pelaaja1.x += pelaaja1.xVel;
	pelaaja1.y += pelaaja1.yVel;
	pelaaja2.x += pelaaja2.xVel;
	pelaaja2.y += pelaaja2.yVel;
}

function checkPlayers_BallCollision(){
	var p1_ball_distance = getDistance(pelaaja1.x,pelaaja1.y,pallo.x,pallo.y) - pelaaja1.size - pallo.size;
	if(p1_ball_distance < 0){
		collide(pallo,pelaaja1);
	}
	var p2_ball_distance = getDistance(pelaaja2.x,pelaaja2.y,pallo.x,pallo.y) - pelaaja2.size - pallo.size;
	if(p2_ball_distance < 0){
		collide(pallo,pelaaja2);
	}
}

function collide(cir1,cir2){
	var dx = (cir1.x - cir2.x) / (cir1.size);
	var dy = (cir1.y - cir2.y) / (cir1.size);
	cir2.xVel = -dx;
	cir2.yVel = -dy;
	cir1.xVel = dx;
	cir1.yVel = dy;
}

function getDistance(x1,y1,x2,y2){
	return Math.sqrt(Math.pow(x1-x2,2)+Math.pow(y1-y2,2));
}

function moveBall(){
	if(pallo.xVel !== 0){
		if(pallo.xVel > 0){
			pallo.xVel -= pallo.decel;
			if(pallo.xVel < 0) pallo.xVel = 0;
		} else {
			pallo.xVel += pallo.decel;
			if(pallo.xVel > 0) pallo.xVel = 0;
		}
	}
	if(pallo.yVel !== 0){
		if(pallo.yVel > 0){
			pallo.yVel -= pallo.decel;
			if(pallo.yVel < 0) pallo.yVel = 0;
		} else {
			pallo.yVel += pallo.decel;
			if(pallo.yVel > 0) pallo.yVel = 0;
		}
	}
	pallo.x += pallo.xVel;
	pallo.y += pallo.yVel;
}

function checkBallBounds(){
	if(pallo.x + pallo.size > canvas.width){
		if(pallo.y > 150 && pallo.y < 350){
			pelaaja1.score++;
			playScoreSound();
			reset();
			return;
		}
		pallo.x = canvas.width - pallo.size;
		pallo.xVel *= -1.5;
	}
	if(pallo.x - pallo.size < 0){
		if(pallo.y > 150 && pallo.y < 350){
			pelaaja2.score++;
			playScoreSound();
			reset();
			return;
		}
		pallo.x = 0 + pallo.size;
		pallo.xVel *= -1.5;
	}
	if(pallo.y + pallo.size > canvas.height){
		pallo.y = canvas.height - pallo.size;
		pallo.yVel *= -1.5;
	}
	if(pallo.y - pallo.size < 0){
		pallo.y = 0 + pallo.size;
		pallo.yVel *= -1.5;
	}
}

function checkPlayersBounds(){
	if(pelaaja1.x + pelaaja1.size > canvas.width){
		pelaaja1.x = canvas.width - pelaaja1.size;
		pelaaja1.xVel *= -0.5;
	}
	if(pelaaja1.x - pelaaja1.size < 0){
		pelaaja1.x = 0 + pelaaja1.size;
		pelaaja1.xVel *= -0.5;
	}
	if(pelaaja1.y + pelaaja1.size > canvas.height){
		pelaaja1.y = canvas.height - pelaaja1.size;
		pelaaja1.yVel *= -0.5;
	}
	if(pelaaja1.y - pelaaja1.size < 0){
		pelaaja1.y = 0 + pelaaja1.size;
		pelaaja1.yVel *= -0.5;
	}
	if(pelaaja2.x + pelaaja2.size > canvas.width){
		pelaaja2.x = canvas.width - pelaaja2.size;
		pelaaja2.xVel *= -0.5;
	}
	if(pelaaja2.x - pelaaja2.size < 0){
		pelaaja2.x = 0 + pelaaja2.size;
		pelaaja2.xVel *= -0.5;
	}
	if(pelaaja2.y + pelaaja2.size > canvas.height){
		pelaaja2.y = canvas.height - pelaaja2.size;
		pelaaja2.yVel *= -0.5;
	}
	if(pelaaja2.y - pelaaja2.size < 0){
		pelaaja2.y = 0 + pelaaja2.size;
		pelaaja2.yVel *= -0.5;
	}
}

function checkKeyboardStatus(){
	if(wDown){
		if(pelaaja1.yVel > -pelaaja1.maxSpeed){
			pelaaja1.yVel -= pelaaja1.accel;	
		} else {
			pelaaja1.yVel = -pelaaja1.maxSpeed;
		}
	} else {
		if(pelaaja1.yVel < 0){
			pelaaja1.yVel += pelaaja1.decel;
			if(pelaaja1.yVel > 0) pelaaja1.yVel = 0;	
		}
	}
	if(sDown){
		if(pelaaja1.yVel < pelaaja1.maxSpeed){
			pelaaja1.yVel += pelaaja1.accel;	
		} else {
			pelaaja1.yVel = pelaaja1.maxSpeed;
		}
	} else {
		if(pelaaja1.yVel > 0){
			pelaaja1.yVel -= pelaaja1.decel;
			if(pelaaja1.yVel < 0) pelaaja1.yVel = 0;
		}
	}
	if(aDown){
		if(pelaaja1.xVel > -pelaaja1.maxSpeed){
			pelaaja1.xVel -= pelaaja1.accel;	
		} else {
			pelaaja1.xVel = -pelaaja1.maxSpeed;
		}
	} else {
		if(pelaaja1.xVel < 0){
			pelaaja1.xVel += pelaaja1.decel;
			if(pelaaja1.xVel > 0) pelaaja1.xVel = 0;	
		}
	}
	if(dDown){
		if(pelaaja1.xVel < pelaaja1.maxSpeed){
			pelaaja1.xVel += pelaaja1.accel;	
		} else {
			pelaaja1.xVel = pelaaja1.maxSpeed;
		}
	} else {
		if(pelaaja1.xVel > 0){
			pelaaja1.xVel -= pelaaja1.decel;
			if(pelaaja1.xVel < 0) pelaaja1.xVel = 0;
		}
	}

	//PLAYER 2

	if(upDown){
		if(pelaaja2.yVel > -pelaaja2.maxSpeed){
			pelaaja2.yVel -= pelaaja2.accel;	
		} else {
			pelaaja2.yVel = -pelaaja2.maxSpeed;
		}
	} else {
		if(pelaaja2.yVel < 0){
			pelaaja2.yVel += pelaaja2.decel;
			if(pelaaja2.yVel > 0) pelaaja2.yVel = 0;	
		}
	}
	if(downDown){
		if(pelaaja2.yVel < pelaaja2.maxSpeed){
			pelaaja2.yVel += pelaaja2.accel;	
		} else {
			pelaaja2.yVel = pelaaja2.maxSpeed;
		}
	} else {
		if(pelaaja2.yVel > 0){
			pelaaja2.yVel -= pelaaja2.decel;
			if(pelaaja2.yVel < 0) pelaaja2.yVel = 0;
		}
	}
	if(leftDown){
		if(pelaaja2.xVel > -pelaaja2.maxSpeed){
			pelaaja2.xVel -= pelaaja2.accel;	
		} else {
			pelaaja2.xVel = -pelaaja2.maxSpeed;
		}
	} else {
		if(pelaaja2.xVel < 0){
			pelaaja2.xVel += pelaaja2.decel;
			if(pelaaja2.xVel > 0) pelaaja2.xVel = 0;	
		}
	}
	if(rightDown){
		if(pelaaja2.xVel < pelaaja2.maxSpeed){
			pelaaja2.xVel += pelaaja2.accel;	
		} else {
			pelaaja2.xVel = pelaaja2.maxSpeed;
		}
	} else {
		if(pelaaja2.xVel > 0){
			pelaaja2.xVel -= pelaaja2.decel;
			if(pelaaja2.xVel < 0) pelaaja2.xVel = 0;
		}
	}
}

document.onkeyup = function(e){
	if(e.keyCode === 87){
		wDown = false;
	}
	if(e.keyCode === 65){
		aDown = false;
	}
	if(e.keyCode === 68){
		dDown = false;
	}
	if(e.keyCode === 83){
		sDown = false;
	}
	if(e.keyCode === 38){
		upDown = false;
	}
	if(e.keyCode === 37){
		leftDown = false;
	}
	if(e.keyCode === 40){
		downDown = false;
	}
	if(e.keyCode === 39){
		rightDown = false;
	}
}

document.onkeydown = function(e){
	if(e.keyCode === 87){
		wDown = true;
	}
	if(e.keyCode === 65){
		aDown = true;
	}
	if(e.keyCode === 68){
		dDown = true;
	}
	if(e.keyCode === 83){
		sDown = true;
	}
	if(e.keyCode === 38){
		upDown = true;
	}
	if(e.keyCode === 37){
		leftDown = true;
	}
	if(e.keyCode === 40){
		downDown = true;
	}
	if(e.keyCode === 39){
		rightDown = true;
	}
}

function renderBall(){
	c.save();
	c.beginPath();
	c.fillStyle = "black";
	c.arc(pallo.x,pallo.y,pallo.size,0,Math.PI*2);
	c.fill();
	c.closePath();
	c.restore();
}

function renderPlayers(){
	c.save();
	c.fillStyle = "red";
	c.beginPath();
	c.arc(pelaaja1.x,pelaaja1.y,pelaaja1.size,0,Math.PI*2);
	c.fill();
	c.closePath();
	c.beginPath();
	c.fillStyle = "blue";
	c.arc(pelaaja2.x,pelaaja2.y,pelaaja2.size,0,Math.PI*2);
	c.fill();
	c.closePath();
	c.restore();
}

function renderGates(){
	c.save();
	c.beginPath();
	c.moveTo(0,150);
	c.lineTo(0,350);
	c.strokeStyle = "red";
	c.lineWidth = 20;
	c.stroke();
	c.closePath();
	c.beginPath();
	c.moveTo(canvas.width,150);
	c.lineTo(canvas.width,350);
	c.strokeStyle = "blue";
	c.lineWidth = 20;
	c.stroke();
	c.closePath();
	c.restore();
}

function renderBackground(){
	c.save();
	c.fillStyle = "#66aa66";
	c.fillRect(0,0,canvas.width,canvas.height);
	c.strokeStyle = "rgba(255,255,255,0.6)";
	c.beginPath();
	c.arc(canvas.width/2,canvas.height/2,150,0,Math.PI*2);
	c.closePath();
	c.lineWidth = 10;
	c.stroke();
	c.restore();
}

function renderLine() {
    c.save();
    c.beginPath();
    c.moveTo(0, 500);
    c.lineTo(canvas.width, 500);
    c.strokeStyle = "black";
    c.lineWidth = 4;
    c.stroke();
    c.closePath();

    c.restore();
}

function clear(){
	c.clearRect(0,0,canvas.width,canvas.height);
}