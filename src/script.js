import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// import {FontLoader} from "three/examples/jsm/loaders/FontLoader.js";
// import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";

const canvas = document.querySelector("canvas.webgl");

// Debug

window.addEventListener("keydown", (event) => {
  if (event.key === "h") {
    if (gui._hidden) {
      gui.show();
    } else gui.hide();
  }
});
// scene
const scene = new THREE.Scene();

// TEXTURE
const textureLoader = new THREE.TextureLoader();
console.log("textureLoader", textureLoader);

// FONTS

const fontLoader = new FontLoader();
const loader = new FontLoader();

console.log("fontLoader", fontLoader);
fontLoader.load("fonts/helvetiker_regular.typeface.json", (font) => {
  const matCapTexture = textureLoader.load("textures/matcaps/3.png");
  const textGeometry = new TextGeometry("Hello THREE.js", {
    font,
    size: 0.5,
    height: 0.2,
    curveSegments: 12,
    bevelEnabled: true,
    bevelThickness: 0.03,
    bevelSize: 0.02,
    bevelOffset: 0,
    bevelSegments: 4,
  });
  /**HARD WAY TO CENTER**/

  // textGeometry.computeBoundingBox();
  // textGeometry.translate(
  //   -(textGeometry.boundingBox.max.x - 0.02) * 0.5, //same as divide by 2
  //   -(textGeometry.boundingBox.max.y - 0.02) * 0.5, //same as divide by 2
  //   -(textGeometry.boundingBox.max.z - 0.03) * 0.5 //same as divide by 2
  // );
  textGeometry.center();
  const material = new THREE.MeshMatcapMaterial({ matcap: matCapTexture });
  const text = new THREE.Mesh(textGeometry, material);
  scene.add(text);

  const donutGeometry = new THREE.TorusGeometry(0.3, 0.2, 20, 45);
  for (let i = 0; i < 100; i++) {
    const donut  = new THREE.Mesh(donutGeometry, material)
    donut.position.x= (Math.random()-0.5)*10
    donut.position.y= (Math.random()-0.5)*10
    donut.position.z= (Math.random()-0.5)*10

    donut.rotation.x = Math.random() * Math.PI
    donut.rotation.y = Math.random() * Math.PI

    const scale =  Math.random()
    donut.scale.set(scale, scale , scale,)

    scene.add(donut)
  }
});
// const axesHelper = new THREE.AxesHelper();
// scene.add(axesHelper);

// console.log("font",font)

// LIGHTS\
// const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
// scene.add(ambientLight);

// const pointLight = new THREE.PointLight(0xffffff, 0.5);
// pointLight.x = 2;
// pointLight.y = 3;
// pointLight.z = 4;
// scene.add(pointLight);

const size = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update Size
  size.width = window.innerWidth;
  size.height = window.innerHeight;

  //update camera Aspect
  camera.aspect = size.width / size.height;
  camera.updateProjectionMatrix();

  renderer.setSize(size.width, size.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

window.addEventListener("dblclick", () => {
  if (!document.fullscreenElement) {
    canvas.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
});

// Camera
const camera = new THREE.PerspectiveCamera(45, size.width / size.height);

camera.position.z = 30;

scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

// Render

const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
//

renderer.setSize(size.width, size.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const tick = () => {
  // Update Controls
  controls.update();

  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};
tick();
