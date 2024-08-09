import * as THREE from 'three';
import { ValueData } from '../../config/type';
import { color } from '../../config';
import { log } from '../../public';
import mesh_vert from './mesh.vert';
import mesh_frag from './mesh.frag';
import line_vert from './line.vert';
import line_frag from './line.frag';


// 加载城市模型,包括城市轮廓的一些shader特效
export class SurroundLines {
    scene: THREE.Scene
    child: THREE.Mesh
    time: ValueData
    height: ValueData
    constructor(scene: THREE.Scene, child: THREE.Mesh, time: ValueData, height: ValueData) {
        this.scene = scene
        this.child = child
        this.time = time
        this.height = height
        this.crateMesh();
        this.createLine();
    }
    computeMesh() {
        this.child.geometry.computeBoundingBox();
        this.child.geometry.computeBoundingSphere();
    }
    crateMesh() {
        this.computeMesh();
        const { max, min } = this.child.geometry.boundingBox as THREE.Box3;

        const size = max.z - min.z;
        const material = new THREE.ShaderMaterial({
            uniforms: {
                u_time: this.time,
                u_height: this.height,
                // 线条颜色
                u_up_color: { value: new THREE.Color(color.risingColor) },
                // 模型颜色
                u_city_color: { value: new THREE.Color(color.mesh) },
                // 顶部颜色
                u_head_color: { value: new THREE.Color(color.head) },
                u_size: { value: size }
            },
            vertexShader: mesh_vert,
            fragmentShader: mesh_frag
        })

        const mesh = new THREE.Mesh(this.child.geometry, material)
        mesh.position.copy(this.child.position)
        mesh.rotation.copy(this.child.rotation)
        mesh.scale.copy(this.child.scale)
        this.scene.add(mesh)
    }

    createLine() {
        // 创建线条几何体
        const geometry = new THREE.EdgesGeometry(this.child.geometry);
        const { max, min } = this.child.geometry.boundingBox as THREE.Box3;
        const material = new THREE.ShaderMaterial({
            uniforms: {
                u_time: this.time,
                live_color: {
                    value: new THREE.Color(color.liveColor)
                },
                line_color: {
                    value: new THREE.Color(color.soundLine)
                },
                u_max: {
                    value: max
                },
                u_min: {
                    value: min
                },
            },
            vertexShader: line_vert,
            fragmentShader: line_frag
        })

        const line = new THREE.LineSegments(geometry, material);
        line.scale.copy(this.child.scale)
        line.position.copy(this.child.position)
        line.rotation.copy(this.child.rotation)
        this.scene.add(line);
    }
}