import { PerspectiveCamera, Group, Vector3 } from 'three';

const createCamera = () => {
  const camera = new PerspectiveCamera( 35, window.innerWidth / window.innerHeight, 0.1, 200 );
  camera.position.x = 6;
  camera.position.z = 12;
  camera.position.y = 6;
  return camera;
}

const createDolly = (camera, scene) => {
  const dolly = new Group();
  dolly.name = "dolly";
  scene.add(dolly);
  dolly.add(camera);
  return dolly;
}

export { createCamera, createDolly };