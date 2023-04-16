function setup() {
  createARCanvas(240, 240);
}

function draw() {
  background(220);
  fill(0);
  circle(cos(frameCount * 0.02) * 83 + width / 2, sin(frameCount * 0.02) * 83 + height / 2, 33);
}
