const W = 240;

function setup() {
  createARCanvas(W, W);
}

function draw() {
  clear();
  const props = p5SimpleARGetMarkerProperty();
  const cols = ['#437f97', '#849324', '#ffb30f', '#fd151b', 220];

  const posX = props.position.x;
  const posY = props.position.y;
  let index = 0;
  if (max(abs(posX), abs(posY)) < 1) {
    index = 4;
  } else {
    if (posX > 0) {
      index++;
    }
    if (posY > 0) {
      index += 2;
    }
  }
  fill(cols[index]);

  const rot = constrain(props.rotation.y, -PI/2, PI/2);
  const circleSize = map(rot, -PI/2, PI/2, W / 10, W);
  circle(W / 2, W / 2, circleSize);
}

function mouseClicked() {
  console.log(p5SimpleARGetMarkerProperty());
  // console.log(p5SimpleARGetMarkerProperty(1));
}
