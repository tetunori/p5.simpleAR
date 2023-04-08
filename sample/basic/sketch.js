function setup() {
  createARCanvas(720, 720);
}

function draw() {
  background(220);
  fill(0);
  circle(cos(frameCount * 0.02) * 250 + width / 2, sin(frameCount * 0.02) * 250 + height / 2, 100);
}
