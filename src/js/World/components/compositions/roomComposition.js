import { Quaternion, Euler } from "three";
import {
  RigidBodyDesc,
  ColliderDesc
} from '@dimforge/rapier3d-compat';

const roomComposition = (physicsWorld, floorSize, isVisible = false) => {
  // const wallSize = 1;
  // const collisionFlag = 2;
  const wallTickness = 1;

  const size = {
    width:  floorSize/2,
    height: wallTickness,
    depth:  floorSize/2,
  }
  const translation = {
    x: 0,
    y: -1,
    z: 0
  }
  const rotation = {
    x: 0,
    y: 0,
    z: 0
  }

  const rigidBodyDesc = RigidBodyDesc.fixed();
  rigidBodyDesc.setTranslation(translation.x, translation.y, translation.z);
  const q = new Quaternion().setFromEuler(
    new Euler( rotation.x, rotation.y, rotation.z, 'XYZ' )
  )
  rigidBodyDesc.setRotation({ x: q.x, y: q.y, z: q.z, w: q.w });
  const floor = physicsWorld.createRigidBody(rigidBodyDesc);
  let collider = ColliderDesc.cuboid(size.width, size.height, size.depth);
  physicsWorld.createCollider(collider, floor);






  // const floor = physics.add.ground({
  //   width: floorSize + wallSize * 2,
  //   height: floorSize + wallSize * 2,
  //   depth: wallSize,
  //   y: -wallSize/2
  // });
  // floor.visible = isVisible;
  // floor.body.setCollisionFlags(collisionFlag);

  // const ceeling = physics.add.ground({
  //   width: floorSize + wallSize * 2,
  //   depth: wallSize,
  //   height: floorSize + wallSize * 2,
  //   y: floorSize + wallSize/2
  // });
  // ceeling.visible = isVisible;
  // ceeling.body.setCollisionFlags(collisionFlag);
  // // ceeling.body.mass = 0;

  // const wallLeft = physics.add.ground({
  //   width: wallSize,
  //   depth: floorSize + wallSize * 2,
  //   height: floorSize + wallSize * 2,
  //   x: -floorSize/2 - wallSize/2,
  //   y: floorSize/2,
  //   z: 0,
  // });
  // wallLeft.visible = isVisible;
  // wallLeft.body.setCollisionFlags(collisionFlag);
  // // wallLeft.body.mass = 0;

  // const wallRight = physics.add.ground({
  //   width: wallSize,
  //   depth: floorSize + wallSize * 2,
  //   height: floorSize + wallSize * 2,
  //   x: floorSize/2 + wallSize/2,
  //   y: floorSize/2,
  //   z: 0,
  // });
  // wallRight.visible = isVisible;
  // wallRight.body.setCollisionFlags(collisionFlag);
  // // wallRight.body.mass = 0;

  // const wallFront = physics.add.ground({
  //   width: floorSize + wallSize * 2,
  //   depth: floorSize + wallSize * 2,
  //   height: wallSize,
  //   x: 0,
  //   y: floorSize/2,
  //   z: floorSize/2 + wallSize/2,
  // });
  // wallFront.visible = isVisible;
  // wallFront.body.setCollisionFlags(collisionFlag);
  // // wallFront.body.mass = 0;

  // const wallBack = physics.add.ground({
  //   width: floorSize + wallSize * 2,
  //   depth: floorSize + wallSize * 2,
  //   height: wallSize,
  //   x: 0,
  //   y: floorSize/2,
  //   z: -floorSize/2 - wallSize/2,
  // });
  // wallBack.visible = isVisible;
  // wallBack.body.setCollisionFlags(collisionFlag);
  // // wallBack.body.mass = 0;

  // const bounciness = 0.7;
  // floor.body.setBounciness(bounciness);
  // ceeling.body.setBounciness(bounciness);
  // wallLeft.body.setBounciness(bounciness);
  // wallRight.body.setBounciness(bounciness);
  // wallFront.body.setBounciness(bounciness);
  // wallBack.body.setBounciness(bounciness);

  return {
    floor,
    // ceeling,
    // wallLeft,
    // wallRight,
    // wallFront,
    // wallBack
  };
}

export { roomComposition };