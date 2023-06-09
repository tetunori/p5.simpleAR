const W = 240;

function setup() {
  createARCanvas(W, W);

  // Prepare GUI
  prepareDatGUI();
}

function draw() {
  const arProps = {
    rotation: {
      x: rotationSettings.xAxis,
      y: rotationSettings.yAxis,
      z: rotationSettings.zAxis,
      order: rotationSettings.order,
    },
    position: {
      x: positionSettings.x,
      y: positionSettings.y,
      z: positionSettings.z,
    },
  };
  p5SimpleARSetARProperty(arProps);

  clear();
  if (canvasSettings.background) {
    // For debug usage
    background(255, 220);
  }
  square(width / 2 - 35, height / 2 - 35, 70);
}
