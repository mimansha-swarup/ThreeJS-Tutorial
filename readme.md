# Three.js Journey

## Camera

Camera is an Abstract Class that means we can't use it directly

- Array Camera
- Stereo Camera
- Cube Camera
- Orthographic Camera
- Perspective Camera

### Array Camera
 render scene from multiple part  on specific area of the render 
 Array camera can be use to render old multiplayer game in which screens use to be split and w diffrent angle was shown 

### Stereo Camera
It render scene from two camera  that can create depth Effect for special devices like VR headset etc 

### Cube Camera
It can do 6 render it can be use tom make environment maps , reflection, refraction, shadows 

### Orthographic Camera
It can do  render scene without perspective, image is far and one image is close both have same height

#### Parameters
we need to provide `left` `right` `top` and `bottom`
and last 2 parameters are ``Near`` and `Far`

```javascript
const camera new THREE.pOrthoGraphicCamera(-1,1,1,-1,0.1,100)
```
### Perspective Camera
The one we are using 

#### Parameter
 ##### Field of view 
 with large value distortion come object being stretched
 - Vertical version angle
 - in degree
 - also called fov
 - recommended value b/w 45-75
 ##### Aspect Ratio
 it's width of render / height of render

 The last Two parameters are `Near` and `Far`
 it means how far and close camera can see

 > If we put extreme value It creates `z-Fighting`

 `z-Fighting` is basically glitch we see when some stuffs are appearing or disappearing   