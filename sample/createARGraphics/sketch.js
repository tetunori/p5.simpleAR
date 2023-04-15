const gfxs = [];
const W = 240;

let t = 0;
const cols = ['#01295f', '#437f97', '#849324', '#ffb30f', '#fd151b', 120];

function setup() {
  for (let i = 0; i < 6; i++) {
    const gfx = createARGraphics(W, W, P2D, { scale: 1, markerId: i });
    gfx.noStroke();
    gfxs.push(gfx);
  }
}

function draw() {
  gfxs.forEach((gfx, index) => {
    gfx.clear();
    gfx.fill(cols[index]);
    gfx.circle(W / 2, W / 2, W);
    gfx.fill(255);
    const n = index + 1;
    for (let i = 0; i < n; i++) {
      const a = (i * PI) / n;
      v = createVector(cos(a), sin(a)).mult((W / 3) * sin(t + a));
      gfx.circle(v.x + W / 2, v.y + W / 2, W / 15);
    }
  });
  t += 0.04;
}
