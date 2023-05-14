# Three.js Journey

Earlier we were doing 
```javascript
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ map: colorTexture });
const mesh = new THREE.Mesh(geometry, material);

scene.add(mesh);
```

but now instead of creating multiple geometry var and mesh for respective geometry  we will create meshes instance and initialize geometry inside that

```javascript
 const sphere = new THREE.Mesh(
  new THREE.SphereGeometry(.5,16,16),
  material
 )

 scene.add(sphere);
```