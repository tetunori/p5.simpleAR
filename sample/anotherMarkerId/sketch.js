function setup() {
  createARCanvas(720, 720, P2D, params = {scale:3, opacity:1.0, markerId:3 });
}

function draw() {
  background(220);
  fill(0);
  circle(cos(frameCount * 0.02) * 250 + width / 2, sin(frameCount * 0.02) * 250 + height / 2, 100);
}
