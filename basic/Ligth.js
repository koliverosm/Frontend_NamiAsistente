import * as THREE from 'three';

class Ligth {
    constructor() {
        this.light = new THREE.DirectionalLight(0xF9D7ED, 1.2);
        this.light.position.set(-100, 100, 100);
        this.light.target.position.set(0, 0, 0);
        this.light.castShadow = true;
        this.light.shadow.bias = -0.001;
        this.light.shadow.mapSize.width = 4096;
        this.light.shadow.mapSize.height = 4096;
        this.light.shadow.camera.far = 500;
        this.light.shadow.camera.near = 0.1;
        this.light.shadow.camera.left = 50;
        this.light.shadow.camera.right = -50;
        this.light.shadow.camera.top = 50;
        this.light.shadow.camera.bottom = -50;

        this.light2 = new THREE.DirectionalLight(0xD9EAFF, 1.5);
        this.light2.position.set(-.5, 1, 0);
        this.light2.target.position.set(0, 0, 0);
        this.light2.castShadow = true;
        this.light2.shadow.bias = -6e-4;
        this.light2.shadow.mapSize.width = 1024;
        this.light2.shadow.mapSize.height = 1024;
        this.light2.shadow.camera.far = 30;
        this.light2.shadow.camera.near = 1;
        this.light2.shadow.camera.left = -3;
        this.light2.shadow.camera.right = 3;
        this.light2.shadow.camera.top = 3;
        this.light2.shadow.camera.bottom = -3;
        this.light.add(this.light2);

        this.light3 = new THREE.DirectionalLight(0xBEC8E5, 1);
        this.light3.position.set(-.5, 1, 0);
        this.light3.target.position.set(0, 0, 0);
        this.light3.castShadow = true;
        this.light3.shadow.bias = -6e-4;
        this.light3.shadow.mapSize.width = 1024;
        this.light3.shadow.mapSize.height = 1024;
        this.light3.shadow.camera.far = 30;
        this.light3.shadow.camera.near = 1;
        this.light3.shadow.camera.left = -3;
        this.light3.shadow.camera.right = 3;
        this.light3.shadow.camera.top = 3;
        this.light3.shadow.camera.bottom = -3;
        this.light.add(this.light3);

        this.AmbientLight = new THREE.AmbientLight(0xffffff, 2);
        this.light.add(this.AmbientLight);
    }
}

export default Ligth;