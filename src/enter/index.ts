import * as THREE from 'three'
// 摄像头,可以帮忙旋转画面
import { OrbitControls } from 'three/examples/jsm/Addons.js'
import l from 'lodash'
import { log } from '../public';
import { City } from './city';

export const initCity = (canvas: HTMLCanvasElement) => {
    // 创建场景
    const scene = new THREE.Scene();
    // 创建相机
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 100000)
    camera.position.set(1000, 500, 100)
    scene.add(camera)

    // 相机控件,轨道控件
    const controls = new OrbitControls(camera, canvas)
    // 是否有惯性
    controls.enableDamping = false;
    // 最近和最远距离
    controls.minDistance = 100;
    controls.maxDistance = 2000;
    // 关闭右键拖动
    controls.enablePan = false;

    // 添加灯光
    scene.add(new THREE.AmbientLight(0xadadad))

    // 方向光
    const directionalLight = new THREE.DirectionalLight(0xfff)
    directionalLight.position.set(0, 0, 0)
    scene.add(directionalLight)

    // 创建渲染器
    const renderer = new THREE.WebGLRenderer({
        // 传递画布
        canvas,
        // 是否启用抗锯齿
        antialias: true
    })

    renderer.setSize(window.innerWidth, window.innerHeight)
    // 设置像素比,最大2
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000, 1.0)


    // 可以获取每一帧的间隔
    const clock = new THREE.Clock();

    const city = new City(scene, camera, controls)

    const start = () => {
        controls.update();

        const delta = clock.getDelta();
        city.start(delta)
        renderer.render(scene, camera)
        requestAnimationFrame(start)
    }

    start();



    window.addEventListener('resize', l.debounce(() => {
        // 更新宽高比
        camera.aspect = window.innerWidth / window.innerHeight
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight)
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    }, 300))
}
