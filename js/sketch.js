let capture;

let camArray = [];
let numCams;
let cam = [];

let widCam, heiCam;


function setup() {
  let maxWidth = 30;
  let scale = 1;
  if (windowWidth < maxWidth) {
      scale = window.innerWidth / maxWidth;
  }

  imageMode(CORNER);
  createCanvas(windowWidth*scale, windowHeight*scale);

  heiCam = windowHeight;
  widCam = windowWidth;
  numCams = windowWidth / widCam;
  

  capture = createCapture(VIDEO);
  capture.size(200, 100);
  

  for (let i = 0; i < numCams; i++) {
    cam[i] = new cameraVid(0, 0);
}

  capture.hide();
}

function draw() {
  for (let i = 0; i < cam.length; i++) {
    for (let j = 0; j < cam.length; j++) {
      
      cam[i].display(i, j);
      cam[i].updateCam();
    }
  }
  filter(POSTERIZE, 5);
  filter(GRAY);
}

class cameraVid {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.wid = widCam;
    this.hei = heiCam;
    
  }
   display(i, j) {
    image(capture, this.x + i*widCam, this.y + j*heiCam, this.wid, this.hei);
  }

  updateCam() {
    // if height or wwidth isnt = to windowheight or windowWidth, slowly increase it until it is
    if (this.wid < windowWidth) {
      this.wid += 2;
    }
      if (this.hei < windowHeight) {
        this.hei += 2;
      }
      
      if (this.wid >= windowWidth) {
        this.wid -= 2;
      }
      if (this.hei >= windowHeight) {  
        this.hei -= 2;
      }

    }

}

function keyReleased() {
  if (keyCode === UP_ARROW) {
    heiCam += 10;
    widCam += 10;
  }
  if (keyCode === DOWN_ARROW) {
    heiCam -= 10;
    widCam -= 10;
  }
}



function mouseReleased() {
  // randomize height and width of each cam
  
  for (let i = 0; i < numCams; i++) {
    for (let j = 0; j < numCams; j++) {
      cam[i].wid = random(90, widCam*2);
      cam[i].hei = random(90, heiCam*1.3);
    }
  } 
  
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}