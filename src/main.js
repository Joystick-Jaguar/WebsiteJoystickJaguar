// const menu = document.querySelector("#mobile-menu");
// const menuLinks = document.querySelector(".navbar-menu");

// menu.addEventListener("click", function () {
//   menu.classList.toggle("is-active");
//   menuLinks.classList.toggle("active");
// });

// menuLinks.addEventListener("click", function () {
//   menu.classList.toggle("is-active");
//   menuLinks.classList.toggle("active");
// });

// const tween = KUTE.fromTo(
//   "#blob1",
//   { path: "#blob1" },
//   { path: "#blob2" },
//   { repeat: 999, duration: 3000, yoyo: true }
// ).start();


// // Create a scene
// const scene = new THREE.Scene();

// // Create a camera
// const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
// camera.position.z = 5;

// // Create a renderer and attach it to the DOM
// const renderer = new THREE.WebGLRenderer();
// renderer.setSize(window.innerWidth, window.innerHeight);
// document.body.appendChild(renderer.domElement);

// // Create a geometry
// const geometry = new THREE.BoxGeometry();

// // Create a material
// const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

// // Create a mesh
// const cube = new THREE.Mesh(geometry, material);

// // Add the mesh to the scene
// scene.add(cube);

// // Render loop
// function animate() {
//   requestAnimationFrame(animate);

//   // Rotate the cube for some basic animation
//   cube.rotation.x += 0.01;
//   cube.rotation.y += 0.01;

//   // Render the scene from the perspective of the camera
//   renderer.render(scene, camera);
// }

// animate();

// // Handle window resize
// window.addEventListener('resize', () => {
//   camera.aspect = window.innerWidth / window.innerHeight;
//   camera.updateProjectionMatrix();
//   renderer.setSize(window.innerWidth, window.innerHeight);
// });



//--------------------------------------------//

// Create a scene
const scene = new THREE.Scene();

// Create a camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// Create a renderer and attach it to the DOM
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create a light
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 5, 5).normalize();
scene.add(light);

// Load the FBX model
const loader = new THREE.FBXLoader();
loader.load(
  'assets/models/blockout.fbx', // Path to the .fbx file
  function (object) {
    // Add the loaded model to the scene
    scene.add(object);
    animate();
  },
  undefined,
  function (error) {
    console.error(error);
  }
);

// Render loop
function animate() {
  requestAnimationFrame(animate);

  // Optional: Add rotation to the loaded model for better visualization
  scene.traverse(function (object) {
    if (object.isMesh) {
      object.rotation.y += 0.01;
    }
  });

  // Render the scene from the perspective of the camera
  renderer.render(scene, camera);
}

// Handle window resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
