import { Vector3 } from "three";
import { createColor } from "./utils/createColor.js";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { Loop } from './system/Loop.js';
import { createRenderer } from './system/renderer.js';
import { createScene } from './components/stage/scene.js';
import { createCamera, createDolly } from './components/stage/camera.js';
import { createLights } from './components/stage/lights.js';
import { VrControls } from './system/VrControls.js';
import { createHandsPhysicsController } from "./system/handsPhysicsController.js";
import { sphere } from './components/bodies/sphere.js';
import { cube } from "./components/bodies/cube";
import { compoundCubes } from "./components/bodies/compoundCubes.js";
import RAPIER from '@dimforge/rapier3d-compat';
import { World as RWorld } from '@dimforge/rapier3d-compat';
import { roomComposition } from './components/bodies/room.js';
import { createWalls } from './components/meshes/walls.js'
import { defaultColorMattPlastic } from "./components/materials/defaultColorMattPlastic.js";
import { defaultColorShinyPlastic } from "./components/materials/defaultColorShinyPlastic.js";
import { defaultColorWithNoise } from "./components/materials/defaultColorWithNoise.js";

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
    console.log('physicsStart.1');
    const gravity = new Vector3(0.0, -9.81, 0.0);
    this.physicsWorld = new RWorld(gravity);
    // console.log('RAPIER', RAPIER);
    // console.log('this.physicsWorld', this.physicsWorld);
    this.loop.setPhysics(this.physicsWorld);
    this.room = roomComposition(this.physicsWorld, this.floorSize, false);
    this.buildScene();
  }

  buildScene() {
    console.log('buildScene.1');
    this.walls = createWalls(this.scene, this.floorSize);
    // this.handsPhysicsController = createHandsPhysicsController(this.scene, this.physics, this.vrControls);
    const spreadWidth = 10;

    // spheres

    const colorMaterial = defaultColorShinyPlastic(
      createColor(0.6, 0.9, 0.1)
    );

    for (let i = 0; i < 20; i++) {
      const size = {
        radius: Math.random()/4 + 0.1
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
      this.loop.updatableBodies.push(sphereItem.rigidBody);
    }

    // blue cubes

    const blueMaterial = defaultColorWithNoise(
      createColor(0.6, 0.8, 0.3)
    );

    for (let i = 0; i < 2; i++) {
      const size = {
        width:  Math.random() * 1 + 0.2,
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

      const cubeItem = cube(blueMaterial, size, translation, rotation, this.physicsWorld);
      this.scene.add(cubeItem.mesh);
      this.loop.bodies.push(cubeItem);
    }


    // compound cubes

    const wMaterial = defaultColorWithNoise(
      createColor(0.2, 0, 1)
    );

    const bMaterial = defaultColorWithNoise(
      createColor(0.2, 0, 0)
    );

    for (let i = 0; i < 8; i++) {
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

      const cItem = compoundCubes([wMaterial, bMaterial], translation, rotation, this.physicsWorld);
      this.scene.add(cItem.mesh);
      this.loop.bodies.push(cItem);
    }

    // black cubes

    const blackMaterial = defaultColorMattPlastic(
      createColor(0.6, 0, 0.02)
    );

    for (let i = 0; i < 4; i++) {
      const size = {
        width:  Math.random() * 1 + 0.2,
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