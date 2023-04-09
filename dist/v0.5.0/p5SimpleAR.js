
const script = document.createElement('script');
script.src = 'https://aframe.io/releases/1.4.0/aframe.min.js';
script.onload = (() => {
    const script2 = document.createElement('script');
    script2.src = 'https://raw.githack.com/AR-js-org/AR.js/master/aframe/build/aframe-ar.js';
    script2.onload = ( () => {
      document.body.innerHTML += `
    <a-scene embedded vr-mode-ui="enabled: false;" arjs="debugUIEnabled: false; detectionMode: mono_and_matrix; matrixCodeType: 3x3;">
      <a-assets id="a-assets"></a-assets>
      <a-marker type="barcode" value="6" registerevents></a-marker>
      <a-entity camera></a-entity>
    </a-scene>
      `
    })
    document.head.appendChild(script2);
  });
document.head.appendChild(script);

const createARCanvas = (w, h, renderer = P2D, params = {scale:3, opacity:1.0}) => {
  console.log('createARCanvas');
  const cvs = createCanvas(w, h, renderer);

  cvs.id('p5Canvas');
  cvs.parent('a-assets');

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
  atts.forEach((att) => plane.setAttribute(att[0], att[1]));
  document.querySelector('a-marker').appendChild(plane);

  replaceARDraw();

  return cvs;
};

const replaceARDraw = () => {
  const oldDraw  = draw;
  draw = ( () => {
    oldDraw();
    
    const plane = document.querySelector('a-plane');
    const material = plane.getObject3D('mesh').material;
    if (material.map) {
      material.map.needsUpdate = true;
    }

  });
}

