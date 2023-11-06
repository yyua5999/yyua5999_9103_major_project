

let img;
let numSegments = 80;
let segments;
// Add a global variable for noise offset
let noiseOffsetIncrement = 0.01;
let maxDisplacement = 10; // Maximum displacement for noise
let originalWidth, originalHeight; // Original image dimensions

function preload() {
  
  img = loadImage('assets/Edvard_Munch_The_Scream.jpg', img => {
    originalWidth = img.width;
    originalHeight = img.height;
  });
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  resizeSegments(); // Call a function to resize and initialize segments
}

function draw() {
  background(0);
  for (let y = 0; y < segments.length; y++) {
    for (let x = 0; x < segments[y].length; x++) {
      segments[y][x].draw();
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  resizeSegments(); // Recalculate segment sizes and positions
}

function resizeSegments() {
  let segmentWidth = width / numSegments;
  let segmentHeight = height / numSegments;
  segments = make2Darray(numSegments, numSegments); // Initialize the 2D array with new sizes
  
  for (let y = 0; y < numSegments; y++) {
    for (let x = 0; x < numSegments; x++) {
      let segXPos = x * segmentWidth;
      let segYPos = y * segmentHeight;
      let segmentColour = img.get(segXPos * originalWidth / width, segYPos * originalHeight / height);
      segments[y][x] = new ImageSegment(segXPos, segYPos, segmentWidth, segmentHeight, segmentColour);
    }
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

// In the draw function, update and draw each segment
function draw() {
  background(0);

  // Loop through and draw segments with updated noise positions
  for (let y = 0; y < segments.length; y++) {
    for (let x = 0; x < segments[y].length; x++) {
      segments[y][x].draw();
    }
  }
}