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
const matCapTexture1 = textureLoader.load("textures/matcaps/1.png");
const matCapTexture2 = textureLoader.load("textures/matcaps/2.png");
const matCapTexture3 = textureLoader.load("textures/matcaps/3.png");
const matCapTexture4 = textureLoader.load("textures/matcaps/4.png");
const matCapTexture5 = textureLoader.load("textures/matcaps/5.png");
const matCapTexture6 = textureLoader.load("textures/matcaps/6.png");
const matCapTexture7 = textureLoader.load("textures/matcaps/7.png");
const matCapTexture8 = textureLoader.load("textures/matcaps/8.png");

const matCapTexture = [
  matCapTexture1,
  matCapTexture2,
  matCapTexture3,
  matCapTexture4,
  matCapTexture5,
  matCapTexture6,
  matCapTexture7,
  matCapTexture8,
];

// FONTS

const fontLoader = new FontLoader();


const donutGeometry = new THREE.TorusGeometry(0.3, 0.2, 20, 45);
const boxGeometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
const sphereGeometry = new THREE.SphereGeometry(0.4, 32, 16);
const geometryArray = [donutGeometry, boxGeometry, sphereGeometry];

fontLoader.load("fonts/helvetiker_regular.typeface.json", (font) => {
  const textGeometry = new TextGeometry(
    "I'm \nMimansha Swarup \nFrontend-Developer",
    {
      font,
      size: 0.5,
      height: 0.2,
      curveSegments: 12,
      bevelEnabled: true,
      bevelThickness: 0.03,
      bevelSize: 0.02,
      bevelOffset: 0,
      bevelSegments: 4,
    }
  );
  /**HARD WAY TO CENTER**/

  // textGeometry.computeBoundingBox();
  // textGeometry.translate(
  //   -(textGeometry.boundingBox.max.x - 0.02) * 0.5, //same as divide by 2
  //   -(textGeometry.boundingBox.max.y - 0.02) * 0.5, //same as divide by 2
  //   -(textGeometry.boundingBox.max.z - 0.03) * 0.5 //same as divide by 2
  // );
  textGeometry.center();
  const material =(matcap)=> new THREE.MeshMatcapMaterial({ matcap });
  const text = new THREE.Mesh(textGeometry, material(matCapTexture8));
  scene.add(text);


  for (let i = 0; i < 150; i++) {
    const geometryArrIndex = Math.floor(Math.random() * geometryArray.length);
    const textureArrIndex = Math.floor(Math.random() * matCapTexture.length);

    const meshElement = new THREE.Mesh(
      geometryArray[geometryArrIndex],
      material(matCapTexture[textureArrIndex])
    );
    meshElement.position.x = (Math.random() - 0.5) * 10;
    meshElement.position.y = (Math.random() - 0.5) * 10;
    meshElement.position.z = (Math.random() - 0.5) * 10;

    meshElement.rotation.x = Math.random() * Math.PI;
    meshElement.rotation.y = Math.random() * Math.PI;

    const scale = Math.random();
    meshElement.scale.set(scale, scale, scale);

    scene.add(meshElement);
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

camera.position.z = 10;

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
