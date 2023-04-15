const aFrameScript = document.createElement('script');
aFrameScript.src = 'https://aframe.io/releases/1.4.0/aframe.min.js';
aFrameScript.onload = () => {
  const arJSScript = document.createElement('script');
  arJSScript.src = 'https://raw.githack.com/AR-js-org/AR.js/master/aframe/build/aframe-ar.js';
  arJSScript.onload = () => {
    document.body.innerHTML += `
    <a-scene embedded vr-mode-ui="enabled: false;" arjs="debugUIEnabled: false; detectionMode: mono_and_matrix; matrixCodeType: 3x3;">
      <a-assets id="a-assets"></a-assets>
      <a-entity camera></a-entity>
    </a-scene>
      `;
  };
  document.head.appendChild(arJSScript);
};
document.head.appendChild(aFrameScript);

const createARCanvas = (w, h, renderer = P2D, params = { scale: 3, opacity: 1.0, markerId: 6 }) => {
  // console.log('createARCanvas');
  const cvs = createCanvas(w, h, renderer);

  if (!params.hasOwnProperty('scale')) {
    params.scale = 3;
  }

  if (!params.hasOwnProperty('opacity')) {
    params.opacity = 1.0;
  }
  params.opacity = constrain(params.opacity, 0.0, 1.0);

  if (!params.hasOwnProperty('markerId')) {
    params.markerId = 6;
  }
  params.markerId = constrain(params.markerId, 0, 63);

  cvs.id('p5Canvas' + String(params.markerId));
  cvs.parent('a-assets');

  if (document.querySelector('#p5SimpleAR-plane' + String(params.markerId)) === null) {
    let arW, arH;
    const scaleUnit = params.scale;
    if (arW < arH) {
      arW = (scaleUnit * w) / h;
      arH = scaleUnit;
    } else {
      arW = scaleUnit;
      arH = (scaleUnit * h) / w;
    }
    const atts = [
      ['position', '0 0 0'],
      ['rotation', '-90 0 0'],
      ['width', String(arW)],
      ['height', String(arH)],
      [
        'material',
        'src: #p5Canvas' +
          String(params.markerId) +
          '; transparent: true; opacity: ' +
          String(params.opacity) +
          ';',
      ],
    ];
    const plane = document.createElement('a-plane');
    plane.id = 'p5SimpleAR-plane' + String(params.markerId);
    atts.forEach((att) => plane.setAttribute(att[0], att[1]));

    const scene = document.querySelector('a-scene');
    const marker = document.createElement('a-marker');
    const markerAtts = [
      ['id', 'a-marker' + String(params.markerId)],
      ['type', 'barcode'],
      ['value', String(params.markerId)],
      ['registerevents', ''],
    ];
    markerAtts.forEach((markerAtt) => marker.setAttribute(markerAtt[0], markerAtt[1]));
    marker.appendChild(plane);
    scene.appendChild(marker);

    replaceARDraw();
  }

  return cvs;
};

const createARGraphics = (
  w,
  h,
  renderer = P2D,
  params = { scale: 3, opacity: 1.0, markerId: 6 }
) => {
  // console.log('createARCanvas');
  const cvs = createGraphics(w, h, renderer);

  if (!params.hasOwnProperty('scale')) {
    params.scale = 3;
  }

  if (!params.hasOwnProperty('opacity')) {
    params.opacity = 1.0;
  }
  params.opacity = constrain(params.opacity, 0.0, 1.0);

  if (!params.hasOwnProperty('markerId')) {
    params.markerId = 6;
  }
  params.markerId = constrain(params.markerId, 0, 63);

  cvs.id('p5Canvas' + String(params.markerId));
  cvs.parent('a-assets');

  if (document.querySelector('#p5SimpleAR-plane' + String(params.markerId)) === null) {
    let arW, arH;
    const scaleUnit = params.scale;
    if (arW < arH) {
      arW = (scaleUnit * w) / h;
      arH = scaleUnit;
    } else {
      arW = scaleUnit;
      arH = (scaleUnit * h) / w;
    }
    const atts = [
      ['position', '0 0 0'],
      ['rotation', '-90 0 0'],
      ['width', String(arW)],
      ['height', String(arH)],
      [
        'material',
        'src: #p5Canvas' +
          String(params.markerId) +
          '; transparent: true; opacity: ' +
          String(params.opacity) +
          ';',
      ],
    ];
    const plane = document.createElement('a-plane');
    plane.id = 'p5SimpleAR-plane' + String(params.markerId);
    atts.forEach((att) => plane.setAttribute(att[0], att[1]));

    const scene = document.querySelector('a-scene');
    const marker = document.createElement('a-marker');
    const markerAtts = [
      ['id', 'a-marker' + String(params.markerId)],
      ['type', 'barcode'],
      ['value', String(params.markerId)],
      ['registerevents', ''],
    ];
    markerAtts.forEach((markerAtt) => marker.setAttribute(markerAtt[0], markerAtt[1]));
    marker.appendChild(plane);
    scene.appendChild(marker);

    replaceARDraw();
  }

  return cvs;

};

let p5SimpleARDrawReplaced = false;
const replaceARDraw = () => {
  if (p5SimpleARDrawReplaced) {
    return;
  }
  p5SimpleARDrawReplaced = true;

  const oldDraw = draw;
  draw = () => {
    oldDraw();
    // console.log(document.querySelector('a-marker'))
    // console.log(document.querySelector('a-marker').getAttribute("rotation"))
    // console.log(document.querySelector('a-marker').getAttribute("material"))
    // console.log(document.querySelector('a-marker').getAttribute("position"))

    const planes = document.querySelectorAll('a-plane');
    // const plane = document.querySelector('a-plane');
    planes.forEach((plane) => {
      const material = plane.getObject3D('mesh').material;
      if (material.map) {
        material.map.needsUpdate = true;
      }
    });
  };
};
