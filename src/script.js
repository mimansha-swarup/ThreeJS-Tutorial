import './style.css'
import * as THREE from "three"

const canvas = document.querySelector("canvas.webgl")

// scene
const scene = new THREE.Scene()

// Object
const geometry  = new THREE.BoxGeometry(1,1,1)
const material = new THREE.MeshBasicMaterial({color: "red"})
const mesh = new THREE.Mesh(geometry,material)

// mesh.position.x=0.7
// mesh.position.y=-0.6
// mesh.position.z=-1
mesh.position.set(0.7,0.6,1)

// Similarly we can use mes.scale.set(x,y,z)
mesh.scale.set(2,0.5,0.5)

mesh.rotation.y= Math.PI*1
mesh.rotation.x= Math.PI*.9 

scene.add(mesh)
const size = {
  width:800*2,
  height:600*2,
}

// axes helper
const axesHelper = new THREE.AxesHelper()
scene.add(axesHelper)

// Camera
const camera =  new THREE.PerspectiveCamera(45, size.width/size.height )
camera.position.z=5 

camera.lookAt(mesh.position)

scene.add(camera)

// Render

const renderer =  new THREE.WebGLRenderer({
  canvas:canvas
})

renderer.render(scene,camera)