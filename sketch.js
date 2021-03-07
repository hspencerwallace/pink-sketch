let angle = 0;
let cameraAngle = 0.0;
let windowWidth = 1920;
let windowHeight = 1080;
let halfHeight = windowHeight/2;
let halfWidth = windowWidth/2;
let leaves;
let sky;
// let legs = []; 
let hands = [];
// let female_leg;
let hand;

function preload() {
  // female_leg = loadModel('femaleleg/femaleleg.obj');
  hand = loadModel('hand/hand.obj');
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  leaves = loadImage('GreenLeaves2.jpg');
  sky = loadImage('delightful-Sky.jpg');

  // Create objects
  for (let i = 0; i < 20; i++) {
    hands.push(new Hands());
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

  // -z pink sky
  push();
  imageMode(CENTER);
  translate(0, 0, -halfHeight*3);
  image(sky, 0, 0, windowWidth*5, windowHeight*5);
  pop();

  // +z pink sky
  push();
  imageMode(CENTER);
  translate(0, 0, halfHeight*4);
  image(sky, 0, 0, windowWidth*6, windowHeight*6);
  pop();

  //rectangles
  rectMode(CENTER);
  fill(0,0,0);

  rotateX(angle);

  // white rectangle
    push();
    // fill(255, 255, 255);
    directionalLight(59, 196, 255, -0.5, -0.5, -1);
    directionalLight(255, 220, 94, 0.5, 0.5, 5);

     pointLight(59, 196, 255, -0.5, -0.5, -1);
     pointLight(255, 220, 94, 0.5, 0.5, 5);
  
    translate(0, -100, -100);
    specularMaterial(255);
    shininess(20);
    plane(windowWidth-10, windowHeight-80);

    // rect(0, -100, windowWidth-10, windowHeight-80);
      //leaves
      // push();
      // translate(0, 0, -1);
      // imageMode(CENTER);
      // // image(leaves, 0, -100, windowWidth-10, windowHeight-80);
      // pop();

    pop();
 
  //black window
  push();
  rect(0, -halfHeight+50, windowWidth, 100);
	rect(0, halfHeight-150, windowWidth, 300);
	rect(halfWidth-50, 0, 100, windowHeight);
	rect(-halfWidth +50, 0, 100, windowHeight);
	pop();

  angle += 0.0025;

  directionalLight(0, 0, 255, -1, 0, -.444);
  directionalLight(252, 48, 226, 1, 0, 0);
  directionalLight(229, 255, 41, 0, 0, -1);


  //
  push();
   translate(0, 0, -100);
  for (let i = 0; i < hands.length; i++) {
    hands[i].move();
    hands[i].display();
  pop();
  }

}

// Hand class
class Hands {
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
  scale(1.25); 
  fill(250, 175, 230);
  model(hand);
  }
}

//make array of lights to make shininess pop and glittery vibez
