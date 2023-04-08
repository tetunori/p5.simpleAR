# p5.simpleAR
Simple AR supplement for p5.js 

# Description 👓

**p5.simpleAR** is a simple JavaScript file(mini-library) to easily convert existing sketches into AR.
mp4埋め込みたい
[HQ movie.](https://www.youtube.com/watch?v=?????)

Now, the latest version is `0.5.0`(prototype release).  

## Demos
Please print the marker below(or just view it on the phone).  
[Marker](https://github.com/nicolocarpignoli/artoolkit-barcode-markers-collection/blob/master/3x3/6.png)

### Simple Demo
<img src="./images/simpledemo.png" alt="Simple demo" width="640px"> 

- [Full function Demo On GitHub](https://tetunori.github.io/BMWalker.js/sample/fullFunction/index.html), [Source code On GitHub](https://github.com/tetunori/BMWalker.js/tree/main/sample/fullFunction)
- [Full function Demo On OpenProcessing](https://openprocessing.org/sketch/1543496)

### Other demos
<details><summary>CLICK ME to show other demos</summary>
<p>

</p>
</details>

# Usage
## Import
```html 
<script src="https://tetunori.github.io/p5.simpleAR/dist/v0.5.0/p5SimpleAR.js"></script>
```
## Basic Usage
Just replace `createCanvas` in `setup` with `createARCanvas`.

```javascript
createCanvas(100, 100);
->
createARCanvas(100, 100);
```

Then, your sketch will be shown on the AR marker.

# API Specification
<details><summary>CLICK ME</summary>
<p>

## createARCanvas
```javascript
createARCanvas(w, h, [renderer])
```
Same as `createCanvas`. But AR function does not work well in `WEBGL` mode...

</p>
</details>

# License
MIT license 
Copyright (c) 2023 [Tetsunori Nakayama](https://twitter.com/tetunori_lego).

# Author
Tetsunori Nakayama.

# References
- [AR.js](https://ar-js-org.github.io/AR.js-Docs/) by [AR-js-org](https://github.com/AR-js-org)
- [AR Maker](https://github.com/nicolocarpignoli/artoolkit-barcode-markers-collection) by [nicolocarpignoli](https://github.com/nicolocarpignoli)

