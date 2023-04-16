const W = 240;

let se1, se2;
function setup() {
  createARCanvas(W, W);
  textAlign(CENTER, CENTER);
  se1 = new Audio(
    'data:audio/wav;base64,UklGRl9vT19XQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YU' +
      Array(120).join(10)
  );
  se2 = new Audio(
    'data:audio/wav;base64,UklGRl9vT19XQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YU' +
      Array(120).join(123)
  );
}

function draw() {
  clear();
  fill('#93f331');
  translate(W / 2, W / 2);
  rotate(PI * sin(frameCount / 100));
  translate(-W / 4, -W / 4);
  square(0, 0, W / 2);
  fill(0);
  text('Check sound & log.', W / 4, W / 4);
}

function p5SimpleARMarkerFound(markerId) {
  console.log('p5SimpleARMarkerFound. markerID: ' + markerId);
  se1.play();
}

function p5SimpleARMarkerLost(markerId) {
  console.log('p5SimpleARMarkerLost. markerID: ' + markerId);
  se2.play();
}
