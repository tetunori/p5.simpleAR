const W = 240;
let easePos = 0;

function setup() {
  createARCanvas(W, W, WEBGL);
  normalMaterial();
}

function draw() {
  // Get current marker poperty
  const markerProps = p5SimpleARGetMarkerProperty();
  // console.log(markerProps.rotation);

  // Prepare AR properties
  const arProps = {
    // Rotate canvas so that it always faces the camera.
    // Default rotation order is 'XYZ' so we should use 'ZYX' to get back.
    rotation: {
      x: -markerProps.rotation.x,
      y: -markerProps.rotation.y,
      z: -markerProps.rotation.z,
      order: 'ZYX',
    },
    position: {
      x: 0,
      y: 2 * easeFunc(easePos) + sin(frameCount / 10) / 10,
      z: 0,
    },
  };
  p5SimpleARSetARProperty(arProps);

  clear();
  if (mouseIsPressed) {
    // For debug usage
    background(255, 220);
  }
  // I don't understand rotation logic completely but it works!
  rotateX(PI - markerProps.rotation.x);
  rotateY(PI - markerProps.rotation.y);
  rotateZ(PI - markerProps.rotation.z);
  box(70);

  // Calc ease position
  if (markerProps.markerVisible) {
    easePos += 0.02;
  } else {
    easePos = 0;
  }
}

// For calc ease
const easeFunc = (val) => {
  return val >= 1 ? 1 : 1 - pow(2, -10 * val);
};
