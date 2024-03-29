import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import '/styles/style.css';

//create a 3d scene
const scene = new THREE.Scene();

//create a camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5; // Set initial camera position

controls = new OrbitControls(camera, renderer.domElement);
controls.zoomSpeed = 1.0; // Adjust zoom speed as needed
let object;

let controls;

let objToRender = 'eye';

//initiate a loader for .gltf files
const loader = new GLTFLoader();

//load the file
loader.load(
  '/assets/3d_model/scene.gltf ',
  function (gltf) {
    object = gltf.scene;
    scene.add(object);
  },
  undefined,
  function (xhr) {
    console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
  },
  function (error) {
    console.error(error);
  }
);

//instantiate a new renderer and set its size
const renderer = new THREE.WebGLRenderer({alpha: true}); //alpha true to make the background transparent
renderer.setSize(window.innerWidth, window.innerHeight)

// Create a camera and set its position
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// Create controls and attach them to the camera and renderer
controls = new OrbitControls(camera, renderer.domElement);
controls.zoomSpeed = 1.0;

//add the renderer to the dom
document.getElementById('container_id').appendChild(renderer.domElement)

//set how far camera will be from the 3d model
camera.position.z = objToRender === 'eye' ? 25 : 500;

//add light to the scene, so we can see the 3d model
const topLight = new THREE.DirectionalLight(0xffffff, 1);
topLight.position.set(500, 500, 500); //top-left-ish
topLight.castShadow = true;
scene.add(topLight);

const ambientLight = new THREE.AmbientLight(
  0x333333,
  objToRender === 'eye' ? 5 : 1
);
scene.add(ambientLight);

//this controls the camera, so we can move around the 3d model
controls = new OrbitControls(camera, renderer.domElement);
controls.enableZoom = true;
controls.zoomSpeed = 1.0; // Adjust this value to your liking

//render the scene 
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}

//now let add listener to the window, so we can resize the camera and the window
window.addEventListener('resize', function() {
  camera.aspect= window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
});

//start 3d rendering
animate()