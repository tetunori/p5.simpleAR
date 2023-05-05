const W = 240;

function setup() {
  createARCanvas(W, W);
  textAlign(CENTER, CENTER);
}

function draw() {
  const gotProps = p5SimpleARGetMarkerProperty();
  // console.log(gotProps.rotation);
  const props = {
    rotation: {
      x: -gotProps.rotation.x,
      y: -gotProps.rotation.y,
      z: -gotProps.rotation.z,
      order: 'ZYX',
    },
    position: {
      x: 0,
      y: 0,
      z: 0,
    },
  };

  p5SimpleARSetARProperty(props);

  clear();
  fill('white');
  translate(W / 2, W / 2);
  circle(0, 0, W / 2);
  fill('purple');
  text('TEST', 0, 0);
}
