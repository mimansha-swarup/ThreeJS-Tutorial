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
const loadingManager = new THREE.LoadingManager();

const textureLoader = new THREE.TextureLoader(loadingManager);
const colorTexture = textureLoader.load("/textures/door/color.jpg");
const alphaTexture = textureLoader.load("/textures/door/alpha.jpg");
const heightTexture = textureLoader.load("/textures/door/height.jpg");
const normalTexture = textureLoader.load("/textures/door/normal.jpg");
const roughnessTexture = textureLoader.load("/textures/door/roughness.jpg");
const ambientOcclusionTexture = textureLoader.load("/textures/door/ambientOcclusion.jpg");
const matCapTexture = textureLoader.load("/textures/matcaps/1.png");

// colorTexture.repeat.x=2
// colorTexture.repeat.y=3
// colorTexture.wrapS = THREE.RepeatWrapping
// colorTexture.wrapT = THREE.RepeatWrapping

// colorTexture.offset.x =0.5
// colorTexture.offset.y =0.5

colorTexture.rotation =Math.PI/4
colorTexture.center.x =0.5
colorTexture.center.y =.5

// Object
const material = new THREE.MeshMatcapMaterial();
material.matcap= matCapTexture

const sphere = new THREE.Mesh(
 new THREE.SphereGeometry(.5,16,16),
 material
)

sphere.position.x= -1.5

const plane = new THREE.Mesh(
 new THREE.PlaneGeometry(1,1),
 material
)
const torus = new THREE.Mesh(
 new THREE.TorusGeometry(.3,.2,16 ,32),
 material
)

torus.position.x= 1.5

scene.add(sphere, plane, torus);

// const geometry = new THREE.BoxGeometry(1, 1, 1);
// const mesh = new THREE.Mesh(geometry, material);

// scene.add(mesh);

// DEBug
// We can chain On Change here
gui.add(parameter, "spin").name("Spin");

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
