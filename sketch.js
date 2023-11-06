

let img;
let numSegments = 80;
let segments;
// Add a global variable for noise offset
let noiseOffsetIncrement = 0.01;
let maxDisplacement = 10; // Maximum displacement for noise

function preload() {
  img = loadImage('assets/Edvard_Munch_The_Scream.jpg');
}

function setup() {
  createCanvas(img.width, img.height);
  let segmentWidth = img.width / numSegments;
  let segmentHeight = img.height / numSegments;

  segments = make2Darray(numSegments, numSegments); // Initialize the 2D array
  
  for (let y = 0; y < numSegments; y++) {
    for (let x = 0; x < numSegments; x++) {
      let segXPos = x * segmentWidth;
      let segYPos = y * segmentHeight;
      let segmentColour = img.get(segXPos + segmentWidth / 2, segYPos + segmentHeight / 2);
      segments[y][x] = new ImageSegment(segXPos, segYPos, segmentWidth, segmentHeight, segmentColour);
    }
  }
}

function draw() {
  background(0);
  for (let y = 0; y < segments.length; y++) {
    for (let x = 0; x < segments[y].length; x++) {
      segments[y][x].draw();
    }
  }
  console.log(segments)
  console.log(segments[1][2])
}

function keyPressed() {
  if (key == " ") {
    drawSegments = !drawSegments;
  }
}

class ImageSegment {
  constructor(srcImgSegXPosInPrm, srcImgSegYPosInPrm, srcImgSegWidthInPrm, srcImgSegHeightInPrm, srcImgSegColourInPrm) {
    this.srcImgSegXPos = srcImgSegXPosInPrm;
    this.srcImgSegYPos = srcImgSegYPosInPrm;
    this.srcImgSegWidth = srcImgSegWidthInPrm;
    this.srcImgSegHeight = srcImgSegHeightInPrm;
    this.srcImgSegColour = srcImgSegColourInPrm;

    // Initialize noise offsets for each segment
    this.noiseOffsetX = random(1000);
    this.noiseOffsetY = random(1000);
  }

  // Modify the draw function to use noise for animation
  draw() {
    // Calculate noise-based displacement
    let noiseX = noise(this.noiseOffsetX) * maxDisplacement - maxDisplacement / 2;
    let noiseY = noise(this.noiseOffsetY) * maxDisplacement - maxDisplacement / 2;

    // Apply the noise displacement to the position
    let x = this.srcImgSegXPos + noiseX;
    let y = this.srcImgSegYPos + noiseY;

    // Draw the segment with the new position
    fill(this.srcImgSegColour);
    noStroke();
    rect(x, y, this.srcImgSegWidth, this.srcImgSegHeight);

    // Increment the noise offset for the next frame
    this.noiseOffsetX += noiseOffsetIncrement;
    this.noiseOffsetY += noiseOffsetIncrement;
  }
}

function make2Darray(cols, rows) {
  var arr = new Array(cols);
  for (var i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }
  return arr;

}
