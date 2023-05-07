import "./style.css";
import * as THREE from "three";
import gsap from "gsap";

const canvas = document.querySelector("canvas.webgl");

// scene
const scene = new THREE.Scene();

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: "red" });
const mesh = new THREE.Mesh(geometry, material);

scene.add(mesh);
const size = {
  width: 800,
  height: 600,
};

// Camera
const camera = new THREE.PerspectiveCamera(45, size.width / size.height);
camera.position.z = 5;

camera.lookAt(mesh.position);

scene.add(camera);

// Render

const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
//

renderer.setSize(size.width, size.height);
// renderer.render(scene,camera)

// // Time
//  let time= Date.now()
// // Clock
// const clock= new THREE.Clock()

gsap.to(mesh.position, { duration: 1, delay: 2, x: 1 });
// gsap has it's own tick so no need to do it inside tick func but we need to re render scene and camera
const tick = () => {
  //   // one revolution per sec
  // const currTime= Date.now()
  // const deltaTime= currTime -time
  // time= currTime

  // // Update Object
  // mesh.rotation.y +=0.01*deltaTime
  // mesh.rotation.y = clock.getElapsedTime()*Math.PI*2

  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};
tick();
