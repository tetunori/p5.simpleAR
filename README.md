# Overview 👓

**p5.simpleAR** is a simple JavaScript supplement(mini-library) file to easily convert existing sketches into AR for PCs and smart devices.  
<a href="https://youtu.be/I2mgpdLRX3g"><img src="./images/keyvisual.png" alt="KeyVisual" width="640px"></a>  
[Concept movie.](https://youtu.be/I2mgpdLRX3g)

Now, the latest version is `0.5.0`(prototype release).  

## Demos
First, Please print the marker below(or just view it on the phone).  
<img src="./images/6wFrame.png" alt="Maker" width="226px"> 

[Marker](https://tetunori.github.io/p5.simpleAR/images/6wFrame.png)

### Basic Demo

https://user-images.githubusercontent.com/14086390/230766242-8c15c1ae-b734-4790-9f74-b3de3d875d8f.mp4

- [Basic Demo On GitHub](https://tetunori.github.io/p5.simpleAR/sample/basic/index.html), [Source code On GitHub](https://github.com/tetunori/p5.simpleAR/tree/main/sample/basic/)
- [Basic Demo On OpenProcessing](https://openprocessing.org/sketch/1891727)

### Other demos
<details><summary>CLICK ME to show other demos</summary>

#### Standard samples
##### [Garg with frame on WebAR](https://openprocessing.org/sketch/1891866)  

https://user-images.githubusercontent.com/14086390/230773531-c551cde0-014b-4e03-b839-120e3dd1594f.mp4

[Garg library](https://jp.deconbatch.com/2021/10/garg.html) by [@deconbatch](https://twitter.com/deconbatch)

##### [221105a on WebAR](https://openprocessing.org/sketch/1891678)  

https://user-images.githubusercontent.com/14086390/230766268-0836fc4d-a050-4c94-8485-4c8a0a1a8cb2.mp4

Original sketch by [@takawo](https://twitter.com/takawo)  

##### [Nagumo on WebAR](https://openprocessing.org/sketch/1891684)  

https://user-images.githubusercontent.com/14086390/230766284-756c01a2-37f0-4f53-955d-d511d16ac827.mp4

Original sketch by [@deconbatch](https://twitter.com/deconbatch)  

#### Transparent background
##### [Generativemasks on WebAR](https://openprocessing.org/sketch/1891862)

<img src="./images/Generativemasks.png" alt="Transparent background Demo" width="640px"><br>
[Generativemasks](https://generativemasks.io/) by [@takawo](https://twitter.com/takawo), [Garg library](https://jp.deconbatch.com/2021/10/garg.html) by [@deconbatch](https://twitter.com/deconbatch)

#### Non-square canvas(800*80)
##### [Game of Life on WebAR](https://openprocessing.org/sketch/1891716)  

https://user-images.githubusercontent.com/14086390/230766289-28826124-1bbd-400a-bdb7-07e176d5e0d0.mp4

</details>

# Usage
## Import
```html 
<script src="https://tetunori.github.io/p5.simpleAR/dist/v0.5.0/p5SimpleAR.js"></script>
```
<details><summary>In case of OpenProcessing</summary>
<img src="./images/openprocessing-addlib.png" alt="Add library in OpenProcessing" width="480px"> 
</details>

## Basic Usage
Just replace `createCanvas` with `createARCanvas`.

```javascript
createCanvas(100, 100);
->
createARCanvas(100, 100);
```
OK, done.  
Then, your sketch will be shown on the [AR Marker](https://tetunori.github.io/p5.simpleAR/images/6wFrame.png).

## Environment 
This function deeply depends on **AR.js**. Please see the [requirement](https://ar-js-org.github.io/AR.js-Docs/#requirements) of the library. 

# API Specification
<details><summary>CLICK ME</summary>
<p>

## Markers
We can choose markers from the 64 images below.  
[AR Markers](https://github.com/tetunori/p5.simpleAR/tree/main/markers/) 

|  0  |  1  |  ...  |  63  |
| ---- | ---- | ---- | ---- |
|  <img src="./images/0wFrame.png" alt="Maker" width="113px"> | <img src="./images/1wFrame.png" alt="Maker" width="113px"> |  ...  |  <img src="./images/63wFrame.png" alt="Maker" width="113px">  |

## createARCanvas
```javascript
createARCanvas(w, h, [renderer], [params])
```
Replace `createCanvas` with this function.  
So, basically, this API has same parameters as `createCanvas`.  
> **Warning**  
> AR function does not work well in `WEBGL` mode...

`params` is original `Object` parameters for `p5.simpleAR`.  
### Properties:
|  name  |  note  |
| ---- | ---- |
|  `scale`   | `Number`: Scale of the sketch. Marker(3x3 dots) size is defined as `1`. Default value is `3`. |
|  `opacity`   | `Number`: Opacity of the sketch. Input a value between `0.0` and `1.0`.Default value is `1.0`. |
|  `markerId`   | `Number`: Id of the marker data. Input a integer value between `0` and `63`.Default value is `6`. |

```javascript
// Call like this
// createCanvas(100, 200);
createARCanvas(100, 200, P2D, { scale: 5, opacity: 0.7, markerId: 1 });
```

### Sample
- [createARCanvas Demo On GitHub](https://tetunori.github.io/p5.simpleAR/sample/parameters/index.html), [Source code On GitHub](https://github.com/tetunori/p5.simpleAR/tree/main/sample/parameters/)
- [createARCanvas Demo On OpenProcessing](https://openprocessing.org/sketch/1898838)

## createARGraphics
```javascript
createARGraphics(w, h, [renderer], [params])
```
Replace `createGraphics` with this function.  
So, basically, this API has same parameters as `createGraphics`.  
By using this API, You can handle multiple markers. 
> **Warning**  
> AR function does not work well in `WEBGL` mode...

> **Warning**  
> `createARGraphics` and `createARCanvas` cannot coexist.

`params` is original `Object` parameters for `p5.simpleAR`.  
### Properties:
|  name  |  note  |
| ---- | ---- |
|  `scale`   | `Number`: Scale of the sketch. Marker(3x3 dots) size is defined as `1`. Default value is `3`. |
|  `opacity`   | `Number`: Opacity of the sketch. Input a value between `0.0` and `1.0`.Default value is `1.0`. |
|  `markerId`   | `Number`: Id of the marker data. Input a integer value between `0` and `63`.Default value is `6`. Be sure to set unique id for each graphics. |

```javascript
// Call like this
// createGraphics(100, 200);
createARGraphics(100, 200, P2D, { scale: 5, opacity: 0.7, markerId: 1 });
```

### Sample
- [createARGraphics Demo On GitHub](https://tetunori.github.io/p5.simpleAR/sample/createARGraphics/index.html), [Source code On GitHub](https://github.com/tetunori/p5.simpleAR/tree/main/sample/createARGraphics/)
- [createARGraphics Demo On OpenProcessing](https://openprocessing.org/sketch/1898840)

</p>
</details>

# ToDo
- Specify some parameters on AR setting
- Pinch to zoom in and out
- Support multiple types of markers
- Use specified image as a marker (possible?)
- Improve Performance 

# License
MIT license  
Copyright (c) 2023 [Tetsunori Nakayama](https://twitter.com/tetunori_lego).

# Author
Tetsunori Nakayama.

# References
- [AR.js](https://ar-js-org.github.io/AR.js-Docs/) by [AR-js-org](https://github.com/AR-js-org)
- [AR Maker](https://github.com/nicolocarpignoli/artoolkit-barcode-markers-collection) by [nicolocarpignoli](https://github.com/nicolocarpignoli)

