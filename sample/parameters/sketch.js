const W = 720;

function setup() {
  createARCanvas(W, W, P2D, { scale: 2, opacity: 0.7, markerId: 1 });
  fill('red');
}

function draw() {
  clear();
  translate(W / 2, W / 2);
  rotate(PI * sin(frameCount / 100));
  translate(-W / 4, -W / 4);
  square(0, 0, W / 2);
}
