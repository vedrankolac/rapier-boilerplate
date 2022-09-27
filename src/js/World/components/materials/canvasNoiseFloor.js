import { Vector2, MeshPhysicalMaterial, CanvasTexture, RepeatWrapping } from 'three';
import { NoiseFloor } from '../textures/NoiseFloor';

const canvasNoiseFloor = (envMapIntensity = 1) => {
  const repeatX = 8;
  const repeatY = 8;

  const maps = new NoiseFloor();
  const colorMap = new CanvasTexture(maps.colorMap);
  colorMap.repeat.x = repeatX;
  colorMap.repeat.y = repeatY;
  colorMap.wrapS = RepeatWrapping;
  colorMap.wrapT = RepeatWrapping;

  const roughnessMap = new CanvasTexture(maps.roughnessMap);
  roughnessMap.repeat.x = repeatX;
  roughnessMap.repeat.y = repeatY;
  roughnessMap.wrapS = RepeatWrapping;
  roughnessMap.wrapT = RepeatWrapping;

  const metalnessMap = new CanvasTexture(maps.metalnessMap);
  metalnessMap.repeat.x = repeatX;
  metalnessMap.repeat.y = repeatY;
  metalnessMap.wrapS = RepeatWrapping;
  metalnessMap.wrapT = RepeatWrapping;

  const parameters = {
    // STANDARD

    // envMap: envmap.texture,
    envMapIntensity: envMapIntensity,

    // color: color,
    map: colorMap,

    // roughness: 1,
    // roughnessMap: roughnessMap,

    // normalMap: normalMap,
		// normalScale: new Vector2(1, 1),

    // aoMap: aoMap,
    // aoMapIntensity:

    // bumpMap: bumpMap,
    // bumpScale:

    // emissive:
    // emissiveMap: emissiveMap,

    // displacementMap
    // displacementScale
    // displacementBias

    // metalness: 1,
    // metalnessMap: metalnessMap,

    // alphaMap: alphaMap,

    // PHYSICAL

    // clearcoat:
    // clearcoatMap: clearcoatMap,
    // clearcoatRoughness:
    // clearcoatRoughnessMap:
    // clearcoatNormalScale: 
    // clearcoatNormalMap:

    // reflectivity:
    // ior:

    // sheen:
    // sheenColor:
    // sheenRoughness:

    // transmission:
    // transmissionMap: transmissionMap,
    // attenuationDistance:
    // attenuationColor:

    // specularIntensity:
    // specularColor:
    // specularIntensityMap:
    // specularColorMap:
  } 

  const material = new MeshPhysicalMaterial(parameters);
  return material;
}

export {
  canvasNoiseFloor
};