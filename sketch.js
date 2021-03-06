let angle = 0;
let cameraAngle = 0.0;
let windowWidth = 1920;
let windowHeight = 1080;
let halfHeight = windowHeight/2;
let halfWidth = windowWidth/2;
let leaves;
let sky;
let legs = []; 
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
  for (let i = 0; i < 40; i++) {
    legs.push(new Leg());
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

  // rotateX(angle);

  //white rectangle
    // push();
    // fill(255, 255, 255);
    // translate(0, 0, -100);
    // rect(0, -100, windowWidth-10, windowHeight-80);
    //   push();
    //   translate(0, 0, -1);
    //   imageMode(CENTER);
    //   image(leaves, 0, -100, windowWidth-10, windowHeight-80);
    //   pop();
    // pop();
 
  //black window
 //  push();
 //  rect(0, -halfHeight+50, windowWidth, 100);
	// rect(0, halfHeight-150, windowWidth, 300);
	// rect(halfWidth-50, 0, 100, windowHeight);
	// rect(-halfWidth +50, 0, 100, windowHeight);
	// pop();

  angle += 0.0025;

  //
  push();
   translate(0, 0, -100);
  for (let i = 0; i < legs.length; i++) {
    legs[i].move();
    legs[i].display();
  pop();
  }

}

// Leg class
class Leg {
  constructor() {

    this.x = random(windowWidth);
    this.y = random(windowHeight);
    this.z - random(windowWidth);
  }

  move() {
    rotateX(frameCount * 0.01);
    rotateY(frameCount * 0.01);
  }

  display() {
  scale(1.08); 
  model(female_leg);
  }
}

//next thing is make fairy lights particle system, explore rotation speed, video?, color palette, 
