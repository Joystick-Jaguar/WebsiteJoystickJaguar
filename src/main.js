import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";

import { fetchShader } from "./shader.js";
import { DeltaTime } from "./deltaTime.js";
import { Settings } from "./settings.js";

export class Main {
  static async init() {
    this.mouseWheelDelta = 0;

    this.moveVelocity = {x: 0, y: 0, z: 0};
    this.rotateVelocity = {x: 0, y: 0, z: 0};

    DeltaTime.init();

    // Fetch a shader
    const vertexShaderSource = await fetchShader('assets/shaders/color/vertexShader.glsl');
    const fragmentShaderSource = await fetchShader('assets/shaders/color/fragmentShader.glsl');

    // Create a scene
    this.scene = new THREE.Scene();

    // Create a camera
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.position.z = 2.5;

    // load 3D model
    this.loadModel("assets/models/SM_Blockout.glb");

    //Instantiate a new renderer and set its size
    this.renderer = new THREE.WebGLRenderer({ alpha: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    //Add the renderer to the DOM
    document.body.appendChild(this.renderer.domElement);

    //Add lights to the scene
    const topLight = new THREE.DirectionalLight(0xffffff, 2.5); // (color, intensity)
    topLight.position.set(0, 0, 2.5) //top-left-ish
    topLight.castShadow = true;
    this.scene.add(topLight);

    const ambientLight = new THREE.AmbientLight(0x333333, 1);
    this.scene.add(ambientLight);

    // binding resize event
    window.addEventListener("resize", this.resize.bind(this));

    window.addEventListener('wheel', (event) => {
      this.mouseWheelDelta = event.deltaY;
    });
  }

  static run() {
    requestAnimationFrame(this.run.bind(this));

    this.update();
    this.draw();
  }

  static update() {
    DeltaTime.update();

    this.moveVelocity

    if (this.object) {
      // this.object.rotation.y += 0.01;
      this.moveVelocity.y += this.mouseWheelDelta * DeltaTime.dt * Settings.moveSpeed; // apll input

      this.moveVelocity.y = Math.max(
        -Settings.moveSpeed * DeltaTime.dt,
        Math.min(Settings.moveSpeed * DeltaTime.dt, this.moveVelocity.y)
      ); // clamp
      
      this.moveVelocity.y *= Settings.drag; // apply drag

      this.object.position.y += this.moveVelocity.y * DeltaTime.dt;
    }

    this.mouseWheelDelta = 0;
  }

  static draw() {
    this.renderer.render(this.scene, this.camera);
  }

  static resize() {
    // Update the camera aspect ratio and the renderer size
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  static async loadModel(path) {
    const loader = new GLTFLoader();
    loader.load(path, (gltf) => {
      this.object = gltf.scene;
      this.scene.add(this.object);
    });
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  await Main.init();
  Main.run();
});
