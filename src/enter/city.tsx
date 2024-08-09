import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import { loadFBX } from '../util';
import { log } from '../public';
import { useRef } from 'react';
import { SurroundLines } from '../effect/surroundLines';
import { Snow } from '../effect/snow';

export class City {
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    controls: OrbitControls
    height: { value: number; };
    time: { value: number; };
    effect: any
    constructor(scene: THREE.Scene, camera: THREE.PerspectiveCamera, controls: OrbitControls) {
        this.scene = scene
        this.camera = camera;
        this.controls = controls
        this.height = {
            value: 5,
        }

        this.time = {
            value: 0,
        }

        this.effect = {}

        // 加载模型
        this.loadCity();
    }
    loadCity() {
        loadFBX('/src/model/beijing.fbx').then((object: THREE.Group) => {
            object.traverse((child: any) => {
                if (child.isMesh) {
                    new SurroundLines(this.scene, child, this.time, this.height)
                }
            })
        })
        this.initEffect();
    }

    initEffect() {
        this.effect.snow = new Snow(this.scene);
    }

    start(detal: number) {
        for (const key in this.effect) {
            this.effect[key] && this.effect[key].animation();
        }
        this.time.value += detal;
        this.height.value += 0.4;
    }
}
