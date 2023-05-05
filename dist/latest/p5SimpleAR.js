// Load scripts aframe and ar.js
const aFrameScript = document.createElement('script');
aFrameScript.src = 'https://aframe.io/releases/1.4.0/aframe.min.js';
aFrameScript.onload = () => {
  const arJSScript = document.createElement('script');
  arJSScript.src = 'https://raw.githack.com/AR-js-org/AR.js/master/aframe/build/aframe-ar.js';
  arJSScript.onload = () => {
    // touch gesture
    const gestureScript = document.createElement('script');
    gestureScript.src = 'https://raw.githack.com/fcor/arjs-gestures/master/dist/gestures.js';
    gestureScript.onload = () => {
      document.body.innerHTML += `
    <a-scene embedded vr-mode-ui="enabled: false;" arjs="debugUIEnabled: false; detectionMode: mono_and_matrix; matrixCodeType: 3x3;">
      <a-assets id="a-assets"></a-assets>
      <a-entity camera></a-entity>
    </a-scene>
      `;
    };
    document.head.appendChild(gestureScript);
  };
  document.head.appendChild(arJSScript);
};
document.head.appendChild(aFrameScript);

// API: createARCanvas
const createARCanvas = (w, h, renderer = P2D, params) => {
  const cvs = createCanvas(w, h, renderer);
  p5SimpleARCreateARCore(w, h, cvs, params);
  return cvs;
};

// API: createARGraphics
const createARGraphics = (w, h, renderer = P2D, params) => {
  const cvs = createGraphics(w, h, renderer);
  p5SimpleARCreateARCore(w, h, cvs, params);
  return cvs;
};

// Core implementation for createARCanvas and createARGraphics
const p5SimpleARCreateARCore = (w, h, cvs, params = { scale: 3, opacity: 1.0, markerId: 6 }) => {
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
      ['width', String(arW)],
      ['height', String(arH)],
      ['gesture-handler', 'minScale: 0.25; maxScale: 3'],
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
    plane.object3D.rotation.set(-PI / 2, 0, 0);

    const scene = document.querySelector('a-scene');
    const marker = document.createElement('a-marker');
    const markerAtts = [
      ['id', 'a-marker' + String(params.markerId)],
      ['type', 'barcode'],
      ['value', String(params.markerId)],
      ['emitevents', 'true'],
      ['registerevents', ''],
    ];
    markerAtts.forEach((markerAtt) => marker.setAttribute(markerAtt[0], markerAtt[1]));
    marker.appendChild(plane);
    scene.appendChild(marker);

    p5SimpleARMarkerVisible.push({ markerId: params.markerId, visible: false });
    marker.addEventListener('markerFound', function () {
      p5SimpleARMarkerVisible.forEach((v, i) => {
        if (v.markerId === params.markerId) {
          p5SimpleARMarkerVisible[i].visible = true;
          p5SimpleARMarkerFound(v.markerId);
        }
      });
    });
    marker.addEventListener('markerLost', function () {
      // console.log('markerLost!', marker);
      p5SimpleARMarkerVisible.forEach((v, i) => {
        if (v.markerId === params.markerId) {
          p5SimpleARMarkerVisible[i].visible = false;
          p5SimpleARMarkerLost(v.markerId);
        }
      });
    });

    p5SimpleARReplaceARDraw();
  }
};

const p5SimpleARMarkerVisible = [];

const p5SimpleARGetMarkerProperty = (markerId = 6) => {
  const returnObj = {
    markerId: markerId,
    markerVisible: false,
    rotation: undefined,
    position: undefined,
  };

  p5SimpleARMarkerVisible.forEach((v) => {
    if (v.markerId === markerId) {
      returnObj.markerVisible = v.visible;
    }
  });

  const rotObj = document.querySelector('#a-marker' + String(markerId)).getAttribute('rotation');
  returnObj.rotation = {
    x: angleMode() === RADIANS ? radians(rotObj.x) : rotObj.x,
    y: angleMode() === RADIANS ? radians(rotObj.y) : rotObj.y,
    z: angleMode() === RADIANS ? radians(rotObj.z) : rotObj.z,
  };

  const posObj = document.querySelector('#a-marker' + String(markerId)).getAttribute('position');
  returnObj.position = {
    x: posObj.x,
    y: posObj.y,
    z: posObj.z,
  };

  return returnObj;
};

const p5SimpleARSetARProperty = (prop, markerId = 6) => {
  const plane = document.querySelector('#p5SimpleAR-plane' + String(markerId));

  if (prop && prop.rotation) {
    const rot = prop.rotation;

    if (angleMode() === DEGREES) {
      rot.x = radians(rot.x);
      rot.y = radians(rot.y);
      rot.z = radians(rot.z);
    }
    if (!rot.order) {
      rot.order = 'XYZ';
    }
    plane.object3D.rotation.set(rot.x, rot.y, rot.z, rot.order);
  }

  if (prop && prop.position) {
    const pos = prop.position;
    plane.object3D.position.set(pos.x, pos.y, pos.z);
  }
};

// Set/Remove touch gesture function
const p5SimpleAREnableGesture = (bEnable = true) => {
  const scene = document.querySelector('a-scene');
  const gestureAtt = 'gesture-detector';

  if (!bEnable) {
    scene.removeAttribute(gestureAtt);
  } else {
    if (!scene.hasAttribute(gestureAtt)) {
      scene.setAttribute(gestureAtt, '');
    }
  }
};

// Replace draw function
let p5SimpleARDrawReplaced = false;
const p5SimpleARReplaceARDraw = () => {
  // Avoid double replacements
  if (p5SimpleARDrawReplaced) {
    return;
  }
  p5SimpleARDrawReplaced = true;

  // For Openprocessing
  const targetElm = document.body;
  if (targetElm.className.match(/hasFrameBorder/)) {
    targetElm.className = '';
  }

  const oldDraw = draw;
  draw = () => {
    oldDraw();

    const planes = document.querySelectorAll('a-plane');
    planes.forEach((plane) => {
      const material = plane.getObject3D('mesh').material;
      if (material.map) {
        material.map.needsUpdate = true;
      }
    });
  };
};

// For overwrite
function p5SimpleARMarkerFound(markerId) {
  // no op
}

// For overwrite
function p5SimpleARMarkerLost(markerId) {
  // no op
}
