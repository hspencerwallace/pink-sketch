let angle = 0;

function setup() {
  createCanvas(800, 800, WEBGL);
 
}

function draw() {
  background(255);
  rectMode(CENTER);
  fill(0,0,0);
  // rotateX(angle);
  rect(0, -350, 800, 100);
	rect(0, 300, 800, 300);
	rect(350, 0, 100, 800);
	rect(-350, 0, 100, 800);
  angle += 0.025;
}