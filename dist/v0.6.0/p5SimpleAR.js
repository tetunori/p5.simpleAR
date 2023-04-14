
const aFrameScript = document.createElement('script');
aFrameScript.src = 'https://aframe.io/releases/1.4.0/aframe.min.js';
aFrameScript.onload = (() => {
    const arJSScript = document.createElement('script');
    arJSScript.src = 'https://raw.githack.com/AR-js-org/AR.js/master/aframe/build/aframe-ar.js';
    arJSScript.onload = ( () => {
      document.body.innerHTML += `
    <a-scene embedded vr-mode-ui="enabled: false;" arjs="debugUIEnabled: false; detectionMode: mono_and_matrix; matrixCodeType: 3x3;">
      <a-assets id="a-assets"></a-assets>
      <a-marker id="a-marker" type="barcode" value="6" registerevents></a-marker>
      <a-entity camera></a-entity>
    </a-scene>
      `
    })
    document.head.appendChild(arJSScript);
  });
document.head.appendChild(aFrameScript);

const createARCanvas = (w, h, renderer = P2D, params = {scale:3, opacity:1.0, markerId:6 }) => {
  // console.log('createARCanvas');
  const cvs = createCanvas(w, h, renderer);

  if(!params.hasOwnProperty('scale')){
    params.scale = 3;
  }

  if(!params.hasOwnProperty('opacity')){
    params.opacity = 1.0;
  }
  params.markerId = constrain(params.markerId, 0.0, 1.0);

  if(!params.hasOwnProperty('markerId')){
    params.markerId = 6;
  }
  params.markerId = constrain(params.markerId, 0, 63);

  cvs.id('p5Canvas');
  cvs.parent('a-assets');

  if( document.querySelector('#p5SimpleAR-plane') === null ){
    let arW, arH; 
    const scaleUnit = params.scale;
    if( arW < arH ){
      arW = scaleUnit * w / h;
      arH = scaleUnit;
    }else{
      arW = scaleUnit;
      arH = scaleUnit * h / w;
    }
    const atts = [
      ['position', '0 0 0'],
      ['rotation', '-90 0 0'],
      ['width', String(arW)],
      ['height', String(arH)],
      ['material', 'src: #p5Canvas; transparent: true; opacity: ' + String(params.opacity) + ';'],
    ];
    const plane = document.createElement('a-plane');
    plane.id = 'p5SimpleAR-plane';
    atts.forEach((att) => plane.setAttribute(att[0], att[1]));
    const markerElm = document.querySelector('a-marker');
    markerElm.appendChild(plane);

    markerElm.setAttribute('value', String(params.markerId));

    replaceARDraw();
  }

  return cvs;
};

const replaceARDraw = () => {
  const oldDraw  = draw;
  draw = ( () => {
    oldDraw();

    // console.log(document.querySelector('a-marker'))
    // console.log(document.querySelector('a-marker').getAttribute("rotation"))
    // console.log(document.querySelector('a-marker').getAttribute("material"))
    // console.log(document.querySelector('a-marker').getAttribute("position"))

    const plane = document.querySelector('a-plane');
    const material = plane.getObject3D('mesh').material;
    if (material.map) {
      material.map.needsUpdate = true;
    }

  });
}

