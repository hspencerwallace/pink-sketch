let angle = 0;
let cameraAngle = 0.0;
let windowWidth = 1920;
let windowHeight = 1080;
let halfHeight = windowHeight/2;
let halfWidth = windowWidth/2;

let sky;
let hands = [];
let hand;

let sculpture1;
let sculpture2;
let sculpture3;
let sculpture11;
let lineup;
var duration;

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
 
  sky = loadImage('delightful-Sky.jpg');
  sculpture1 = loadImage('1.png');
  sculpture2 = loadImage('2.png');
  sculpture3 = loadImage('3.png');
  sculpture11 = loadImage('11.png');
  lineup = loadImage('placeholder.png');
  frameRate(fps);
  capturer = new CCapture({ format: 'png', framerate: fps });

  // Create objects
  for (let i = 0; i < 40; i++) {
    hands.push(new Hands());
  }
 
}

function draw() {

  //

   if (frameCount === 1) {
    // start the recording on the first frame
    capturer.start();
  }

  if (startMillis == null) {
    startMillis = millis();
  }

  // duration in milliseconds
  duration = 39000;

  // compute how far we are through the animation as a value 
  // between 0 and 1.
  var elapsed = millis() - startMillis;
  var t = map(elapsed, 0, duration, 0, 1);

  // if we have passed t=1 then end the animation.
  if (t > 1) {
    noLoop();
    console.log('finished recording.');
    capturer.stop();
    capturer.save();
    return;
  }
  //

  noStroke();
  background(150);


  // camera rotation 
// used to be sin 0.001
  camera(0, 20 + sin(frameCount * (0.05)) * 10, 200 + sin(frameCount * 0.0015) * 3000, 0, 0, 0, 0, 1, 0);

  // -(?)z pink sky, second one you see
  push();
  imageMode(CENTER);
  translate(0, 0, -halfHeight*3.01);
  image(sky, 0, 0, windowWidth*5, windowHeight*5);
  translate(0, 0, -300);

   push();
   rotateY(PI);
   translate(50, 0, 0);
   image(lineup, 0, 0);
   lineup.resize(0, halfHeight-100);
   pop();

   push();
   translate(halfWidth/2, 0, 0);
   image(sculpture1, 0, 0);
   sculpture1.resize(0, halfHeight * 1.5);
   pop();

   push();
   translate(-halfWidth/2 - 40, -100, 1);
   image(sculpture2, 0, 0);
   sculpture2.resize(0, halfHeight * 1.5);
   pop();

  pop();


  // +(?)z pink sky, first one you see
  push();
  imageMode(CENTER);
  translate(0, 0, halfHeight*4.01);
  image(sky, 0, 0, windowWidth*6, windowHeight*6);
  translate(0, 0, 300);

    push();
    translate(50, 0, 0);
    image(lineup, 0, 0);
    lineup.resize(0, halfHeight-100);
    pop();

    push();
    translate(-halfWidth/2, 0, 0);
    image(sculpture3, 0, 0);
    sculpture3.resize(0, halfHeight * 1.5);
    pop();

    push();
    translate(halfWidth/2, 0, 0);
    image(sculpture11, 0, 0);
    sculpture11.resize(0, halfHeight * 1.5);
    pop();

  pop();
  

  //rectangles
  rectMode(CENTER);
  fill(0,0,0);

  rotateX(angle);

  // white rectangle
    push();

    directionalLight(59, 196, 255, -0.5, -0.5, -1);
    directionalLight(255, 220, 94, 0.5, 0.5, 5);

    pointLight(59, 196, 255, -0.5, -0.5, -1);
    pointLight(255, 220, 94, 0.5, 0.5, 5);
  
    translate(0, -100, -100);
    specularMaterial(255);
    shininess(20);
    plane(windowWidth-10, windowHeight-80);

    pop();
 
  //black window
    push();
    rect(0, -halfHeight+50, windowWidth, 100);
  	rect(0, halfHeight-150, windowWidth, 300);
  	rect(halfWidth-50, 0, 100, windowHeight);
  	rect(-halfWidth +50, 0, 100, windowHeight);
  	pop();

  //angle += 0.0025 is old setting with sin 0.001 above
  angle += 0.0022;

  directionalLight(0, 0, 255, -1, 0, -.444);
  directionalLight(252, 48, 226, 1, 0, 0);
  directionalLight(229, 255, 41, 0, 0, -1);


  //
  push();
   translate(0, 0, -100);
  for (let i = 0; i < hands.length; i++) {
    hands[i].move();
    hands[i].display();
  }
  pop();

// handle saving the frame
  console.log('capturing frame');
  capturer.capture(canvas);

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
    //old setting is
    // rotateX(frameCount * 0.0055);
    // rotateY(frameCount * 0.0055);

    rotateX(frameCount * 0.0035);
    rotateY(frameCount * 0.0035);

  }

  display() {
  scale(1.101); 
  fill(252, 61, 192);
  model(hand);
  }
}

// slower_tar_30fps_30sec_sin0008_angle_0025_rotate_004.mp4  # hands still too fast

//slower_tar_30fps_60sec_sin0007_angle_0015_rotate_001.mp4   # hands too slow! try .0025, should make the angle a tiiiiny bit slower, try .0014, sin seems good!

//slower_tar_30fps_60sec_sin0007_angle_0014_rotate_0025.mp4   # make it 1/8 faster? thus make angle a tiny bit faster too?


//sin 0007 takes 1:15 or so to reach max dist.
//sin 001? takes :10(?), and full length of loop is 1:24, or 84 seconds. 84/10 = 8.4
// if we want a 5:30 length loop, or 330 seconds, that initial time to reach max length needs to be 330/8.4 = 39 seconds.
// 0010 is 10
// 0007 is 75
// 003/
//
// 0095 ishhh is 39 seconds

//med_tar_30fps_60sec_sin0095_angle_002_rotate_0032.mp4 # was a messup. Needed an extra 0 in sin

//med_tar_30fps_60sec_sin00095_angle_002_rotate_0032.mp4 # is too slow, the first full zoomout takes a minute. 

//med_tar_30fps_39sec_sin001_angle_0025_rotate_0032 # is still a little too long. take it to sin 0015, make rotate slightly faster? make angle slightly slower maybe 22

//fine_tar_30fps_39sec_sin0015_angle_0022_rotate_0035 # sin is perfect! make angle a little faster tho. 






// ffmpeg -r 30 -f image2 -s 1920x1080 -i "%07d.png" -vcodec libx264 -crf 17 -pix_fmt yuv420p output.mp4
