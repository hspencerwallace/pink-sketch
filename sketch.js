let angle = 0;

function setup() {
  createCanvas(800, 800, WEBGL);
 
}

function draw() {
  background(150);
  rectMode(CENTER);
  fill(0,0,0);
  rotateX(angle);

  push();
  fill(255, 255, 255);
  translate(0, 0, -100);
  //white rectangle
  rect(0, -100, 700, 600);
  pop();

  push();
 
  //black window
  rect(0, -350, 800, 100);
	rect(0, 300, 800, 300);
	rect(350, 0, 100, 800);
	rect(-350, 0, 100, 800);
	pop();
  angle += 0.0025;
}

//next thing is find a tree and make fairy lights particle system
