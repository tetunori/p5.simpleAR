// dat GUI instance
let gui;

// Setting values for dat GUI
const rotationSettingsDefault = {
  xAxis: -Math.PI / 2,
  yAxis: 0.0,
  zAxis: 0.0,
  order: 'XYZ',
};
const rotationSettings = new Object();

const positionSettingsDefault = {
  x: 0.0,
  y: 0.0,
  z: 0.0,
};
const positionSettings = new Object();

const utilities = {
  reset: () => {
    initializeSettings();
  },
};

const canvasSettingsDefault = {
  background: true,
};
const canvasSettings = new Object();

const prepareDatGUI = () => {
  const step = 0.1;

  gui = new dat.GUI({ closeOnTop: true });
  const rotationFolder = gui.addFolder('Rotation');
  const positionFolder = gui.addFolder('Position');
  const canvasFolder = gui.addFolder('Canvas');

  // Set initial values
  initializeSettings();

  //  -- rotation
  rotationFolder.add(rotationSettings, 'xAxis', -PI, PI, step);
  rotationFolder.add(rotationSettings, 'yAxis', -PI, PI, step);
  rotationFolder.add(rotationSettings, 'zAxis', -PI, PI, step);
  rotationFolder.add(rotationSettings, 'order', {
    XYZ: 'XYZ',
    XZY: 'XZY',
    YXZ: 'YXZ',
    YZX: 'YZX',
    ZXY: 'ZXY',
    ZYX: 'ZYX',
  });
  rotationFolder.open();

  //  -- position
  positionFolder.add(positionSettings, 'x', 0, 10, step);
  positionFolder.add(positionSettings, 'y', 0, 10, step);
  positionFolder.add(positionSettings, 'z', 0, 10, step);
  positionFolder.open();

  //  -- position
  canvasFolder.add(canvasSettings, 'background');
  canvasFolder.open();

  //  -- Utilities
  gui.add(utilities, 'reset');
};

// Initialize with default values
const initializeSettings = () => {
  rotationSettings.xAxis = rotationSettingsDefault.xAxis;
  rotationSettings.yAxis = rotationSettingsDefault.yAxis;
  rotationSettings.zAxis = rotationSettingsDefault.zAxis;
  rotationSettings.order = rotationSettingsDefault.order;
  positionSettings.x = positionSettingsDefault.x;
  positionSettings.y = positionSettingsDefault.y;
  positionSettings.z = positionSettingsDefault.z;
  canvasSettings.background = canvasSettingsDefault.background;
  gui.updateDisplay();
};
