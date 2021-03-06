let angle = 0;
let cameraAngle = 0.0;
let windowWidth = 1920;
let windowHeight = 1080;
let halfHeight = windowHeight/2;
let halfWidth = windowWidth/2;
let leaves;
let sky;
let bugs = []; 
let female_leg;
let holdinghands;

function preload() {
  female_leg = loadModel('femaleleg/femaleleg.obj');
  //holdinghands = loadModel('holdinghands/holding_hands.obj');

}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  leaves = loadImage('GreenLeaves2.jpg');
  sky = loadImage('delightful-Sky.jpg');

  // Create objects
  for (let i = 0; i < 500; i++) {
    bugs.push(new Jitter());
  }
 
}

function draw() {
  noStroke();
  background(150);

  // camera rotation 
  cameraAngle = cameraAngle + (0.005);
  let c = tan(cameraAngle);
  camera(0, 20 + sin(frameCount * (0.05)) * 10, 200 + sin(frameCount * 0.005) * 
    3000, 0, 0, 0, 0, 1, 0);

  //pink sky
  push();
  imageMode(CENTER);
  translate(0, 0, -halfHeight*2);
  image(sky, 0, 0, windowWidth*2, windowHeight*2);
  pop();

  //rectangles
  rectMode(CENTER);
  fill(0,0,0);

  rotateX(angle);

  //white rectangle
    push();
    fill(255, 255, 255);
    translate(0, 0, -100);
    rect(0, -100, windowWidth-10, windowHeight-80);
      push();
      translate(0, 0, -1);
      imageMode(CENTER);
      image(leaves, 0, -100, windowWidth-10, windowHeight-80);
      pop();
    pop();
 
  //black window
  push();
  rect(0, -halfHeight+50, windowWidth, 100);
	rect(0, halfHeight-150, windowWidth, 300);
	rect(halfWidth-50, 0, 100, windowHeight);
	rect(-halfWidth +50, 0, 100, windowHeight);
	pop();

  angle += 0.0025;

  //
  for (let i = 0; i < bugs.length; i++) {
    bugs[i].move();
    bugs[i].display();
  }

  //obj 
  push();
  rotateX(frameCount * 0.01);
  rotateY(frameCount * 0.01);
  scale(50); 
  model(female_leg);
  //model(holidinghands);
  pop();
}

// Jitter class
class Jitter {
  constructor() {

    this.x = random(windowWidth);
    this.y = random(windowHeight);
    // this.z - random(windowWidth);
    this.diameter = random(30, 60);
    this.speed = 1;
  }

  move() {
    this.x += random(-this.speed, this.speed);
    this.y += random(-this.speed, this.speed);
    // this.z += random(-this.speed, this.speed);
  }

  display() {
    translate(-4, -3, random(-5, -4));
    ellipse(this.x, this.y, this.diameter, this.diameter);
  }
}

//next thing is make fairy lights particle system, explore rotation speed, video?, color palette, 
