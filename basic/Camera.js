import * as THREE from 'three';

class Camera {
    constructor() {
        this.camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 2000);
        //this.camera.position.z = 30;
        this.camera.position.set(0, 10, 30);
        //this.camera.lookAt(0, 0, 0);
    }
}

export default Camera;