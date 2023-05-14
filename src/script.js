import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as dat from "lil-gui";
import gsap from "gsap";

const canvas = document.querySelector("canvas.webgl");

// Debug

const gui = new dat.GUI();
const parameter = {
  spin: () => {
    gsap.to(mesh.rotation, { duration: 3, y: mesh.rotation.y + Math.PI * 2 });
  },
};

window.addEventListener("keydown", (event) => {
  if (event.key === "h") {
    if (gui._hidden) {
      gui.show();
    } else gui.hide();
  }
});
// scene
const scene = new THREE.Scene();

// THEM<E
//  What happens in BG
// const image  = new Image()
// const texture  = new THREE.Texture(image)

// image.onload = ()=>{
//   texture.needsUpdate= true

// }
// image.src="/textures/door/color.jpg"

const cubeTextureManager = new THREE.CubeTextureLoader();

const textureLoader = new THREE.TextureLoader();
const doorTexture = textureLoader.load("/textures/door/color.jpg"); // colorTexture
const alphaTexture = textureLoader.load("/textures/door/alpha.jpg");
const doorHeightTexture = textureLoader.load("/textures/door/height.jpg");
const normalTexture = textureLoader.load("/textures/door/normal.jpg");
const doorRoughnessTexture = textureLoader.load("/textures/door/roughness.jpg");
const doorMetalnessTexture = textureLoader.load("/textures/door/metalness.jpg");
const ambientOcclusionTexture = textureLoader.load(
  "/textures/door/ambientOcclusion.jpg"
);
const matCapTexture = textureLoader.load("/textures/matcaps/1.png");


const environmentMapTexture = cubeTextureManager.load([
  "/textures/environmentMaps/0/px.jpg",
  "/textures/environmentMaps/0/nx.jpg",
  "/textures/environmentMaps/0/py.jpg",
  "/textures/environmentMaps/0/ny.jpg",
  "/textures/environmentMaps/0/pz.jpg",
  "/textures/environmentMaps/0/nz.jpg"
]
);

// colorTexture.repeat.x=2
// colorTexture.repeat.y=3
// colorTexture.wrapS = THREE.RepeatWrapping
// colorTexture.wrapT = THREE.RepeatWrapping

// colorTexture.offset.x =0.5
// colorTexture.offset.y =0.5

// colorTexture.rotation =Math.PI/4
// colorTexture.center.x =0.5
// colorTexture.center.y =.5

// Object

// const material = new THREE.MeshMatcapMaterial();
// material.matcap= matCapTexture

// const material = new THREE.MeshDepthMaterial();

// const material = new THREE.MeshLambertMaterial();

// const material = new THREE.MeshPhongMaterial();
// material.shininess = 100
// material.specular = new THREE.Color(0x1188ff)

// const material = new THREE.MeshToonMaterial();

const material = new THREE.MeshStandardMaterial();

material.metalness = 0.7;
material.roughness = 0.2;
material.envMap =environmentMapTexture;
// material.map = doorTexture;
// material.aoMap = ambientOcclusionTexture;
// material.displacementMap = doorHeightTexture;
// material.displacementScale = 0.05;
// material.metalnessMap = doorMetalnessTexture;
// material.roughnessMap = doorRoughnessTexture
// material.transparent = true
// material.alphaMap = alphaTexture

const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.5, 64, 64), material);
sphere.geometry.setAttribute(
  "uv2",
  new THREE.BufferAttribute(sphere.geometry.attributes.uv.array, 2)
);

sphere.position.x = -1.5;

const plane = new THREE.Mesh(new THREE.PlaneGeometry(1, 1, 100, 100), material);
plane.geometry.setAttribute(
  "uv2",
  new THREE.BufferAttribute(plane.geometry.attributes.uv.array, 2)
);

const torus = new THREE.Mesh(
  new THREE.TorusGeometry(0.3, 0.2, 64, 138),
  material
);
torus.geometry.setAttribute(
  "uv2",
  new THREE.BufferAttribute(torus.geometry.attributes.uv.array, 2)
);

torus.position.x = 1.5;

scene.add(sphere, plane, torus);

// const geometry = new THREE.BoxGeometry(1, 1, 1);
// const mesh = new THREE.Mesh(geometry, material);

// scene.add(mesh);

// LIGHTS\
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 0.5);
pointLight.x = 2;
pointLight.y = 3;
pointLight.z = 4;
scene.add(pointLight);

// DEBug
// We can chain On Change here
gui.add(material, "metalness").min(0).max(1).step(0.001);
gui.add(material, "roughness").min(0).max(1).step(0.001);
gui.add(material, "aoMapIntensity").min(0).max(10).step(0.05);
gui.add(material, "displacementScale").min(0).max(1).step(0.01);

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

camera.position.z = 3;

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
