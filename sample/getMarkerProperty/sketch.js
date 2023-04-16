const W = 240;

function setup() {
  createARCanvas(W, W);
  textAlign(CENTER, CENTER);
}

function draw() {
  clear();
  fill('blue');
  translate(W / 2, W / 2);
  rotate(PI * sin(frameCount / 100));
  translate(-W / 4, -W / 4);
  square(0, 0, W / 2);
  fill(255);
  text('Click & Check log.', W/4, W/4)
}

function mouseClicked() {
  console.log(p5SimpleARGetMarkerProperty());
  // console.log(p5SimpleARGetMarkerProperty(1));
}
