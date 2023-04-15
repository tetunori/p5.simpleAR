
let gfx1, gfx2;

function setup() {
  createCanvas(720, 720);
  gfx1 = createARGraphics(720, 720, P2D, params = {scale:3, opacity:1.0, markerId:1 });
  gfx2 = createARGraphics(720, 720, P2D, params = {scale:3, opacity:1.0, markerId:6 });
}

function draw() {
  gfx1.background(220);
  gfx1.fill(0);
  gfx1.circle(cos(frameCount * 0.02) * 250 + width / 2, sin(frameCount * 0.02) * 250 + height / 2, 100);
  gfx2.background('red');
  gfx2.fill('blue');
  gfx2.circle(cos(frameCount * 0.02) * 250 + width / 2, sin(frameCount * 0.02) * 250 + height / 2, 100);
}
