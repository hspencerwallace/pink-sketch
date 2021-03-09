let angle = 0;
let cameraAngle = 0.0;
let windowWidth = 1920;
let windowHeight = 1080;
let halfHeight = windowHeight/2;
let halfWidth = windowWidth/2;
// let leaves;
let sky;
let hands = [];
let hand;
let slower = 0.2;

// the frame rate (frames per second)
var fps = 30;
// the canvas capturer instance
var capturer;
var startMillis; 

function preload() {
  // female_leg = loadModel('femaleleg/femaleleg.obj');
  hand = loadModel('hand/hand.obj');
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  leaves = loadImage('GreenLeaves2.jpg');
  sky = loadImage('delightful-Sky.jpg');
  frameRate(fps);
  // capturer = new CCapture({ format: 'png', framerate: fps });

  // Create objects
  for (let i = 0; i < 40; i++) {
    hands.push(new Hands());
  }
 
}

function draw() {

  //

  //  if (frameCount === 1) {
  //   // start the recording on the first frame
  //   // this avoids the code freeze which occurs if capturer.start is called
  //   // in the setup, since v0.9 of p5.js
  //   capturer.start();
  // }

  // if (startMillis == null) {
  //   startMillis = millis();
  // }

  // duration in milliseconds
  var duration = 10000;

  // compute how far we are through the animation as a value 
  // between 0 and 1.
  var elapsed = millis() - startMillis;
  var t = map(elapsed, 0, duration, 0, 1);

  // if we have passed t=1 then end the animation.
  // if (t > 1) {
  //   noLoop();
  //   console.log('finished recording.');
  //   capturer.stop();
  //   capturer.save();
  //   return;
  // }
  //

  noStroke();
  background(150);


  // camera rotation 

  camera(0, 20 + sin(frameCount * (0.05)) * 10, 200 + sin(frameCount * 0.001) * 3000, 0, 0, 0, 0, 1, 0);

  // -z pink sky
  push();
  imageMode(CENTER);
  translate(0, 0, -halfHeight*3.01);
  image(sky, 0, 0, windowWidth*5, windowHeight*5);
  pop();

  // +z pink sky
  push();
  imageMode(CENTER);
  translate(0, 0, halfHeight*4.01);
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
// handle saving the frame
  // console.log('capturing frame');
  // capturer.capture(canvas);

}

// Hand class
class Hands {
  constructor() {

    this.x = random(windowWidth);
    this.y = random(windowHeight);
    this.z - random(windowWidth);
    this.random = random(1, 5);
  }

  move() {
    rotateX(frameCount * 0.0055);
    rotateY(frameCount * 0.0055);

  }

  display() {
  scale(1.101); 
  fill(250, 175, 230);
  model(hand);
  }
}

// ffmpeg -r 30 -f image2 -s 1920x1080 -i "%07d.png" -vcodec libx264 -crf 17 -pix_fmt yuv420p output.mp4
