import * as THREE from 'three'
import { FBXLoader } from "three/examples/jsm/Addons.js";
import { log } from "../public";

const fbxLoader = new FBXLoader()

export const loadFBX = (url: string): Promise<THREE.Group<THREE.Object3DEventMap>> => {
    return new Promise((resolve, reject) => {
        fbxLoader.load(url, (obj: THREE.Group<THREE.Object3DEventMap>) => {
            resolve(obj)
        }, (xhr: ProgressEvent) => {
            log((xhr.loaded / xhr.total * 100) + '% loaded')
        }, (error) => {
            reject(error)
        })
    })
}