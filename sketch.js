let angle = 0;
let windowWidth = 1920;
let windowHeight = 1080;
let halfHeight = windowHeight/2;
let halfWidth = windowWidth/2;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
 
}

function draw() {
  noStroke();
  background(150);
  rectMode(CENTER);
  fill(0,0,0);
  rotateX(angle);

  push();
  fill(255, 255, 255);
  translate(0, 0, -100);
  //white rectangle
  rect(0, -100, windowWidth-10, windowHeight-80);
  pop();

  push();
 
  //black window
  rect(0, -halfHeight+50, windowWidth, 100);
	rect(0, halfHeight-150, windowWidth, 300);
	rect(halfWidth-50, 0, 100, windowHeight);
	rect(-halfWidth +50, 0, 100, windowHeight);
	pop();
  angle += 0.0025;
}

//next thing is find a tree and make fairy lights particle system
