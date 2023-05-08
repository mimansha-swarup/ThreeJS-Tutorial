# Three.js Journey

We will fit canvas in viewPort

Easiest way is to  give `width` and `height`  `c` and `window.innerHeight`
```javascript 
const size = {
  width: window.innerWidth,
  height: window.innerHeight,
};

```
and we can see there is soe padding and margin for that we can set margin and padding 0 of body
```css 
body{
  margin:0;
  padding:0;
}
.webgl{
  position:fixed;
  left:0;
  right:0;
  outline:0;
}

```

There is one more issue that if animation is disabled then we can scroll past the canvas using track pad

## Pixel Ratio

earlier monitors were having 1 pixel ratio

Companies made it pixel ratio of 2  and now a days it's being more and more. One doesn't need high pixel ration
Pixel ratio of 2 means 4 times more to render
Pixel ratio of 3 means 9 times more to render


But we need to handle it for all the System


Highest Pixel ratio is in Mobile device 

```javascript 
renderer.setPixelRatio(window.devicePixelRatio);
```
Three.JS will take care of this but with high pixel ratio Render will be more costly so we need to limit it
and will cause Performance issue

```javascript 

renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
```
we can also put it inside event Listener window's resize

## Full Screen
```javascript 

window.addEventListener("dblclick", () => {
  if(!document.fullscreenElement){
    canvas.requestFullscreen()
  }else{
    document.exitFullscreen()
  }
});
```
above code will not work  in safari browser