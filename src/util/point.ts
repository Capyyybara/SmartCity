import * as THREE from 'three';
import { log } from '../public';


export class Point {
    size: number
    opacity: number
    range: number
    count: number
    setAnimation: Function
    setPosition: any
    url: string
    material!: THREE.PointsMaterial
    pointList: Array<THREE.Vector3> = []
    point!: THREE.Points

    constructor({
        size,
        opacity,
        range,
        count,
        setAnimation,
        setPosition,
        url,
    }: {
        size: number
        opacity: number
        range: number
        count: number
        setAnimation: Function
        setPosition: any
        url: string
    }) {
        this.size = size
        this.opacity = opacity
        this.range = range
        this.count = count
        this.setAnimation = setAnimation
        this.setPosition = setPosition
        this.url = url

        this.init()
    }
    init() {
        this.material = new THREE.PointsMaterial({
            size: this.size,
            map: new THREE.TextureLoader().load(this.url),
            transparent: true,
            opacity: this.opacity,
            depthTest: false,
        })

        const geometry = new THREE.BufferGeometry()
        for (let i = 0; i < this.count; i++) {
            const position = new THREE.Vector3(
                Math.random() * this.range - this.range / 2,//x
                Math.random() * this.range,//y
                Math.random() * this.range - this.range / 2 //z
            )

            this.setPosition(position)
            this.pointList.push(position)
        }
        geometry.setFromPoints(this.pointList)
        this.point = new THREE.Points(geometry, this.material)
    }
    getPoint() {
        return this.point;
    }
    animation() {
        this.pointList.forEach((position) => {
            this.setAnimation(position)
        })

        this.point.geometry.setFromPoints(this.pointList)
    }
}
