const W = 240;
const bmw = new BMWalker();

function setup() {
  createARCanvas(W, W, WEBGL);
}

function draw() {
  // Get current marker poperty
  const markerProps = p5SimpleARGetMarkerProperty();

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
      y: 1,
      z: 0,
    },
  };
  p5SimpleARSetARProperty(arProps);

  clear();

  // I don't understand rotation logic completely but it works!
  rotateX(PI - markerProps.rotation.x);
  rotateY(PI - markerProps.rotation.y);
  rotateZ(PI - markerProps.rotation.z);

  // Get current markers
  const walkerHeight = 200;
  bmw.setCameraParam(0, PI / 4, 0);
  const markers = bmw.getMarkers(walkerHeight);
  stroke('#00bbf9');

  // Draw markers
  markers.forEach((m) => {
    push();
    {
      translate(m.x, m.y, m.z);
      sphere(2);
    }
    pop();
  });

  const lineMarkers = bmw.getLineMarkers(walkerHeight);

  // Draw lines
  strokeWeight(3);
  stroke('#f15bb5');

  lineMarkers.forEach((m) => {
    line(m[0].x, m[0].y, m[0].z, m[1].x, m[1].y, m[1].z);
  });
}
