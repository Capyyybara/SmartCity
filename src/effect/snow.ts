import * as THREE from 'three'
import { Point } from '../util/point';
import snow from "../assets/snow.png"
import { log } from '../public';

export class Snow {
    point: THREE.Points
    scene: THREE.Scene
    point_instance: Point
    constructor(scene: THREE.Scene) {
        this.scene = scene;
        const point_instance = new Point({
            size: 30,
            opacity: 0.8,
            range: 1000,
            count: 600,
            url: snow,
            setAnimation(position: any) {     // 动起来
                position.x -= position.speedX;
                position.y -= position.speedY;
                position.z -= position.speedZ;

                if (position.y <= 0) {
                    position.y = 500
                }
            },
            setPosition(position: any) {      // 运动的速度和方向
                position.speedX = Math.random() - 0.5
                position.speedY = Math.random() + 2.0
                position.speedZ = Math.random() - 0.5


            }
        });
        this.point = point_instance.getPoint();
        this.point_instance = point_instance
        this.init()
    }

    init() {
        this.scene.add(this.point);
    }
    animation() {
        this.point_instance.animation();
    }
}