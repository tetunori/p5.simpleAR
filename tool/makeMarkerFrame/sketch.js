const rawMakerSize = 226;
const W = rawMakerSize * 2;
const targetImages = [];

function setup() {
  pixelDensity(1);
  // createCanvas(W, W);

  for (let i = 0; i < 64; i++) {
    targetImages.push(String(i));
  }

  frameRate(3);
}

function draw() {
  targetImages.forEach((targetImage, index) => {
    if (index === frameCount - 1) {
      const dirName = 'rawMarkers/';
      const extension = '.png';
      const imageName = dirName + targetImage + extension;

      loadImage(imageName, (img) => {
        const gfx = createGraphics(W, W);
        gfx.background(255);
        gfx.image(img, rawMakerSize / 2, rawMakerSize / 2);

        save(gfx, targetImage + 'wFrame' + extension);
        gfx.remove();
      });
    }
  });
}
