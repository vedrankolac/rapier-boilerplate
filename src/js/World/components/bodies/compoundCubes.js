import { BoxGeometry, Mesh, Quaternion, Euler, Group } from 'three';
import {
  RigidBodyDesc,
  ColliderDesc
} from '@dimforge/rapier3d-compat';

const compoundCubes = (materials, translation, rotation, physicsWorld, widthSegments = 1, heightSegments = 1, depthSegments = 1) => {

  // meshes

  const objA = {
    size: {
      width: 1.2,
      height: 0.2,
      depth: 0.2
    },
    position : {
      x: 0,
      y: 0,
      z: 0
    }
  }

  const objB = {
    size: {
      width: 0.2,
      height: 1.2,
      depth: 0.2
    },
    position : {
      x: 0.6 - 0.1,
      y: 0.6 + 0.1,
      z: 0
    }
  }

  const objC = {
    size: {
      width: 0.2,
      height: 0.2,
      depth: 1.2
    },
    position : {
      x: 0.6 - 0.1,
      y: 1.2,
      z: -0.6 - 0.1
    }
  }

  const geometryA = new BoxGeometry(objA.size.width, objA.size.height, objA.size.depth, widthSegments, heightSegments, depthSegments);
  const meshA = new Mesh( geometryA, materials[0]);
  meshA.position.x = objA.position.x;
  meshA.position.y = objA.position.y;
  meshA.position.z = objA.position.z;
  meshA.castShadow = true;
  meshA.receiveShadow = true;

  const geometryB = new BoxGeometry(objB.size.width, objB.size.height, objB.size.depth, widthSegments, heightSegments, depthSegments);
  const meshB = new Mesh( geometryB, materials[1] );
  meshB.position.x = objB.position.x;
  meshB.position.y = objB.position.y;
  meshB.position.z = objB.position.z;
  meshB.castShadow = true;
  meshB.receiveShadow = true;
  
  const geometryC = new BoxGeometry(objC.size.width, objC.size.height, objC.size.depth, widthSegments, heightSegments, depthSegments);
  const meshC = new Mesh( geometryC, materials[0] );
  meshC.position.x = objC.position.x;
  meshC.position.y = objC.position.y;
  meshC.position.z = objC.position.z;
  meshC.castShadow = true;
  meshC.receiveShadow = true;

  const group = new Group();
  group.add(meshA);
  group.add(meshB);
  group.add(meshC);

  // rigid body

  const rigidBodyDesc = RigidBodyDesc.dynamic();
  rigidBodyDesc.setTranslation(translation.x, translation.y, translation.z);
  const q = new Quaternion().setFromEuler(
    new Euler( rotation.x, rotation.y, rotation.z, 'XYZ' )
  )
  rigidBodyDesc.setRotation({ x: q.x, y: q.y, z: q.z, w: q.w });
  const rigidBody = physicsWorld.createRigidBody(rigidBodyDesc);
  
  // colliders

  const colliderA = ColliderDesc.cuboid(
    objA.size.width/2,
    objA.size.height/2,
    objA.size.depth/2
    )
    .setTranslation(
      objA.position.x,
      objA.position.y,
      objA.position.z
    );

  const colliderB = ColliderDesc.cuboid(
    objB.size.width/2,
    objB.size.height/2,
    objB.size.depth/2
    )
    .setTranslation(
      objB.position.x,
      objB.position.y,
      objB.position.z
    );

  const colliderC = ColliderDesc.cuboid(
    objC.size.width/2,
    objC.size.height/2,
    objC.size.depth/2
    )
    .setTranslation(
      objC.position.x,
      objC.position.y,
      objC.position.z
  );

  physicsWorld.createCollider(colliderA, rigidBody);
  physicsWorld.createCollider(colliderB, rigidBody);
  physicsWorld.createCollider(colliderC, rigidBody);

  return {
    mesh: group,
    rigidBody: rigidBody
  };
}

export { compoundCubes };