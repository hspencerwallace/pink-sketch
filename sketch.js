let angle = 0;
let cameraAngle = 0.0;
let windowWidth = 1920;
let windowHeight = 1080;
let halfHeight = windowHeight/2;
let halfWidth = windowWidth/2;
let leaves;
let sky;



function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  leaves = loadImage('GreenLeaves2.jpg');
  sky = loadImage('delightful-Sky.jpg');

 
}

function draw() {
  noStroke();
  background(150);

  // rotation stuff, rotate is below in the moons matrix
  cameraAngle = cameraAngle + (0.005);
  let c = tan(cameraAngle);
//camera rotation stuff
  camera(0, 20 + sin(frameCount * (0.05)) * 10, 200 + sin(frameCount * 0.005) * 
    3000, 0, 0, 0, 0, 1, 0);

  push();
  imageMode(CENTER);
  translate(0, 0, -halfHeight*2);
  image(sky, 0, 0, windowWidth*2, windowHeight*2);
  pop();

  rectMode(CENTER);
  fill(0,0,0);
  rotateX(angle);

    push();
    fill(255, 255, 255);
    translate(0, 0, -100);
    //white rectangle
    rect(0, -100, windowWidth-10, windowHeight-80);
      push();
      translate(0, 0, -1);
      imageMode(CENTER);
      image(leaves, 0, -100, windowWidth-10, windowHeight-80);
      pop();
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

//next thing is make fairy lights particle system, explore rotation speed, video?, color palette, 
