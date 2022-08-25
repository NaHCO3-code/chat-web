import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
export default class ThreeJs {
    constructor(state) {
        this.state = {
            speed: 0.1,
            moveForward: false, moveBackward: false, moveLeft: false, moveRight: false
        }
        this.init();
    }

    init() {
        // 第一步新建一个场景
        this.scene = new THREE.Scene();
        this.setCamera();
        this.setRenderer();
        this.setCube();
        this.animate();
        // this.setPlay();
    }

    // 新建透视相机
    setCamera() {
        // 第二参数就是 长度和宽度比 默认采用浏览器  返回以像素为单位的窗口的内部宽度和高度
        this.camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / 300,
            0.1,
            1000
        );
        this.camera.position.z = 5;
    }

    // 设置渲染器
    setRenderer() {
        this.renderer = new THREE.WebGLRenderer({
            canvas: document.getElementById('space')
        });
        // 设置画布的大小
        this.renderer.setSize(window.innerWidth, 300);
        //这里 其实就是canvas 画布  renderer.domElement
        // document.body.appendChild(this.renderer.domElement);
    }

    // 设置环境光
    setLight() {
        if (this.scene) {
            this.ambientLight = new THREE.AmbientLight(0xffffff); // 环境光
            this.scene.add(this.ambientLight);
        }
    }

    // 创建网格模型
    setCube() {
        if (this.scene) {
            const geometry = new THREE.BoxGeometry(); //创建一个立方体几何对象Geometry
            const material = new THREE.MeshBasicMaterial({ color: 0xff7728 }); //材质对象Material
            // const texture = new THREE.TextureLoader().load('../../public/s.png'); //首先，获取到纹理
            // const material = new THREE.MeshBasicMaterial({ map: texture }); //然后创建一个phong材质来处理着色，并传递给纹理映射
            this.mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
            this.mesh.position.x = 3
            this.scene.add(this.mesh); //网格模型添加到场景中

            this.mesh2 = new THREE.Mesh(geometry, material); //网格模型对象Mesh
            this.scene.add(this.mesh2); //网格模型添加到场景中
            this.render();
        }
    }

    // 渲染
    render() {
        if (this.renderer && this.scene && this.camera) {
            this.renderer.render(this.scene, this.camera);
        }
    }

    // 动画
    animate() {
        if (this.mesh) {
            // 使用自带的摄像机控制器
            const cameraControls = new OrbitControls(this.camera, this.renderer.domElement);
            cameraControls.enablePan = false; //禁止右键拖拽
            cameraControls.enableDamping = true; // 开启阻尼惯性
            cameraControls.dampingFactor = 0.1; // 设置阻尼惯性的值
            cameraControls.rotateSpeed = 0.5; // 设置旋转速度
            cameraControls.enableZoom=false;
            cameraControls.minZoom = 0.5;
            cameraControls.maxZoom = 1.5;
            const mainLoop = () => {
                cameraControls.update();//更新控制器
                this.mesh.rotation.x += 0.01;
                this.mesh.rotation.y += 0.01;
                /**if (this.state.moveForward) this.camera.translateZ(-this.state.speed);
                if (this.state.moveBackward) this.camera.translateZ(this.state.speed);
                if (this.state.moveLeft) this.camera.translateX(-this.state.speed);
                if (this.state.moveRight) this.camera.translateX(this.state.speed); */
                this.render();// 重新渲染
                requestAnimationFrame(mainLoop);
            }
            requestAnimationFrame(mainLoop);
        }
    }

    // 设置键盘操作
    /**setPlay() {
        window.onkeydown = (e) => {
            switch (e.key) {
                case 'ArrowUp':
                    this.state.moveForward = true;
                    break;
                case 'ArrowDown':
                    this.state.moveBackward = true;
                    break;
                case 'ArrowLeft':
                    this.state.moveLeft = true;
                    break;
                case 'ArrowRight':
                    this.state.moveRight = true;
                    break;
            }
        }
        window.onkeyup = (e) => {
            switch (e.key) {
                case 'ArrowUp':
                    this.state.moveForward = false;
                    break;
                case 'ArrowDown':
                    this.state.moveBackward = false;
                    break;
                case 'ArrowLeft':
                    this.state.moveLeft = false;
                    break;
                case 'ArrowRight':
                    this.state.moveRight = false;
                    break;
            }
        }
    }*/
}
