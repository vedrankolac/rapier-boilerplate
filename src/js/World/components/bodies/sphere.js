import { SphereGeometry, Mesh, Quaternion, Euler } from 'three';
import {
  RigidBodyDesc,
  ColliderDesc
} from '@dimforge/rapier3d-compat';

const sphere = (material, size, translation, rotation, physicsWorld) => {
  const geometry = new SphereGeometry(size.radius, 64, 64);
  const mesh = new Mesh( geometry, material );
  mesh.castShadow = true;
  mesh.receiveShadow = true;

  const rigidBodyDesc = RigidBodyDesc.dynamic();
  rigidBodyDesc.setTranslation(translation.x, translation.y, translation.z);
  const q = new Quaternion().setFromEuler(
    new Euler( rotation.x, rotation.y, rotation.z, 'XYZ' )
  )
  rigidBodyDesc.setRotation({ x: q.x, y: q.y, z: q.z, w: q.w });

  const rigidBody = physicsWorld.createRigidBody(rigidBodyDesc);
  const collider = ColliderDesc.ball(size.radius);

  physicsWorld.createCollider(collider, rigidBody);

  return {
    mesh: mesh,
    collider: collider,
    rigidBody: rigidBody
  };
}

export { sphere };