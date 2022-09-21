import { Color, Group, PlaneGeometry, Mesh, Vector3 } from "three";
import { Math as TMath } from "three";
import { createColor } from "./utils/createColor.js";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { Loop } from './system/Loop.js';
import { createRenderer } from './system/renderer.js';
import { createScene } from './components/stage/scene.js';
import { createCamera, createDolly } from './components/stage/camera.js';
import { createLights } from './components/stage/lights.js';
import { VrControls } from './system/VrControls.js';
import { createHandsPhysicsController } from "./system/handsPhysicsController.js";
import { sphere } from './components/meshes/sphere.js';
import { cube } from "./components/meshes/cube";
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import RAPIER from '@dimforge/rapier3d-compat';
import { World as RWorld } from '@dimforge/rapier3d-compat';
import { PMREMGenerator } from 'three';
import { roomComposition } from './components/compositions/roomComposition.js';
import { createWalls } from './components/meshes/walls.js'
import { defaultColorMattPlastic } from "./components/materials/defaultColorMattPlastic.js";
import { defaultColorShinyPlastic } from "./components/materials/defaultColorShinyPlastic.js";
import { defaultColorWithNoise } from "./components/materials/defaultColorWithNoise.js";
import { scaleTest } from "./components/materials/scaleTest.js";

const hdrURL = new URL('/assets/copyrighted/hdr/studio_small_08_1k.hdr', import.meta.url);

class World {
  constructor() {
    this.renderer = createRenderer();
    this.scene = createScene(this.renderer);
    this.camera = createCamera();
    this.lights = createLights(this.scene);
    this.loop = new Loop(this.camera, this.scene, this.renderer);
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    const dolly = createDolly(this.camera, this.scene);
    dolly.position.set(0, 0, 0);
    this.vrControls = new VrControls(this.renderer, dolly, this.camera);
    this.loop.updatableBodies.push(this.vrControls);
    this.floorSize = 12;
    RAPIER.init().then(() => this.physicsStart());
  }

  physicsStart() {
    console.log('physicsStart.3');

    const gravity = new Vector3(0.0, -9.81, 0.0);
    this.physicsWorld = new RWorld(gravity);
    // console.log('RAPIER', RAPIER);
    // console.log('this.physicsWorld', this.physicsWorld);
    this.loop.setPhysics(this.physicsWorld);
    const room = roomComposition(this.physicsWorld, this.floorSize, false);
    new RGBELoader().load(hdrURL, (hdrmap) => this.buildScene(hdrmap));
  }

  buildScene(hdrmap) {
    console.log('buildScene.3');
    const envmaploader = new PMREMGenerator(this.renderer);
    const envmap = envmaploader.fromCubemap(hdrmap);
    this.walls = createWalls(this.scene, this.floorSize, envmap);
    // this.handsPhysicsController = createHandsPhysicsController(this.scene, this.physics, this.vrControls, envmap);
    const spreadWidth = 10;

    // plane

    // const planeMaterial = scaleTest(0x000000, envmap, 0.84);
    // const planeGeom = new PlaneGeometry(2, 2, 4, 4);
    // const plane = new Mesh( planeGeom, planeMaterial );
    // plane.rotation.y = TMath.degToRad(45);
    // plane.rotation.x = TMath.degToRad(-30);
    // plane.position.x = -2;
    // plane.position.y = 2;
    // plane.position.z = -2;
    // this.scene.add(plane);

    // spheres

    const colorMaterial = defaultColorShinyPlastic(
      createColor(0.02, 1, 0.5),
      envmap
    );

    for (let i = 0; i < 40; i++) {
      const size = {
        radius: Math.random()/4 + 0.2
      }
      const translation = {
        x: Math.random() * spreadWidth - spreadWidth/2,
        y: Math.random() * 6 + 3,
        z: Math.random() * spreadWidth - spreadWidth/2
      }
      const rotation = {
        x: Math.random(),
        y: Math.random(),
        z: Math.random()
      }

      const sphereItem = sphere(colorMaterial, size, translation, rotation, this.physicsWorld);
      this.scene.add(sphereItem.mesh);
      this.loop.bodies.push(sphereItem);
    }

    // white cubes

    const whiteMaterial = defaultColorWithNoise(
      createColor(0.6, 0.8, 0.5),
      envmap
    );

    for (let i = 0; i < 8; i++) {
      const size = {
        widht:  Math.random() * 1 + 0.2,
        height: Math.random() * 1.6 + 0.2,
        depth:  Math.random() * 1 + 0.2
      }
      const translation = {
        x: Math.random() * spreadWidth - spreadWidth/2,
        y: Math.random() * 6 + 3,
        z: Math.random() * spreadWidth - spreadWidth/2
      }
      const rotation = {
        x: Math.random(),
        y: Math.random(),
        z: Math.random()
      }

      const cubeItem = cube(whiteMaterial, size, translation, rotation, this.physicsWorld);
      this.scene.add(cubeItem.mesh);
      this.loop.bodies.push(cubeItem);
    }

    // black cubes

    const blackMaterial = defaultColorMattPlastic(
      createColor(0.6, 0, 0.02),
      envmap
    );

    for (let i = 0; i < 8; i++) {
      const size = {
        widht:  Math.random() * 1 + 0.2,
        height: Math.random() * 1.6 + 0.2,
        depth:  Math.random() * 1 + 0.2
      }
      const translation = {
        x: Math.random() * spreadWidth - spreadWidth/2,
        y: Math.random() * 6 + 3,
        z: Math.random() * spreadWidth - spreadWidth/2
      }
      const rotation = {
        x: Math.random(),
        y: Math.random(),
        z: Math.random()
      }

      const cubeItem = cube(blackMaterial, size, translation, rotation, this.physicsWorld);
      this.scene.add(cubeItem.mesh);
      this.loop.bodies.push(cubeItem);
    }

  }

  start() {
    this.loop.start();
  }

  stop() {
    this.loop.stop();
  }
}

export { World };