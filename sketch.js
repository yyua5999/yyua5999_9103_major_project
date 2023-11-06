

let img;
let numSegments = 80;
let segments;

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
      this.noiseOffset = random(1000); // A unique noise offset for color transition
    }
  
    draw() {
      // Calculate a noise-based 'lerp' factor for color transition
      let n = noise(this.noiseOffset);
      let transitionColor = lerpColor(this.srcImgSegColour, color(255, 204, 0), n); // Example target color
  
      // Draw the segment with the interpolated color
      fill(transitionColor);
      noStroke();
      rect(this.srcImgSegXPos, this.srcImgSegYPos, this.srcImgSegWidth, this.srcImgSegHeight);
  
      // Increment the noise offset for the next frame to change the 'lerp' factor over time
      this.noiseOffset += 0.01; // Adjust this value for faster or slower transitions
  
      // Draw the rest of the segment details (shadows, highlights, etc.)
      let depth = 3;
      let shadowColor = color(red(transitionColor) * 0.8, green(transitionColor) * 0.8, blue(transitionColor) * 0.8);
      let highlightColor = color(red(transitionColor) * 1.2, green(transitionColor) * 1.2, blue(transitionColor) * 1.2);
  
      // Top highlight
      fill(highlightColor);
      beginShape();
      vertex(this.srcImgSegXPos, this.srcImgSegYPos);
      vertex(this.srcImgSegXPos + this.srcImgSegWidth, this.srcImgSegYPos);
      vertex(this.srcImgSegXPos + this.srcImgSegWidth - depth, this.srcImgSegYPos - depth);
      vertex(this.srcImgSegXPos - depth, this.srcImgSegYPos - depth);
      endShape(CLOSE);
  
      // Shadow for bump
      fill(shadowColor);
      ellipse(this.srcImgSegXPos + this.srcImgSegWidth * 0.5 + 2, this.srcImgSegYPos + this.srcImgSegHeight * 0.5 - 0.5, this.srcImgSegWidth * 0.4, this.srcImgSegHeight * 0.4);
  
      // Lego bump
      fill(220);
      ellipse(this.srcImgSegXPos + this.srcImgSegWidth * 0.5, this.srcImgSegYPos + this.srcImgSegHeight * 0.5 - 2, this.srcImgSegWidth * 0.4, this.srcImgSegHeight * 0.4);
    }
  }
  

function make2Darray(cols, rows) {
  var arr = new Array(cols);
  for (var i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }
  return arr;

}
