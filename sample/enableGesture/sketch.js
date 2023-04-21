
const W = 240;

function setup() {
  createARCanvas(W, W);
  textAlign(CENTER, CENTER);
  p5SimpleAREnableGesture(true);
  // p5SimpleAREnableGesture(false);
}

function draw() {
  clear();
  fill('#264653');
  translate(W / 4, W / 4);
  square(0, 0, W / 2);
  fill('#e9c46a');
  text('Flick or Pinch.', W/4, W/4);

}

function mouseClicked() {
  console.log(p5SimpleARGetMarkerProperty());
  // console.log(p5SimpleARGetMarkerProperty(1));
}
