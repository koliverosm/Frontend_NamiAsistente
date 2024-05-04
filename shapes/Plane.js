import * as THREE from 'three';

class Plane2 {
    constructor() {
        this.plane = new THREE.PolarGridHelper(30, 0);
        this.plane.position.y = - 10;
        this.plane.castShadow = false;
        this.plane.receiveShadow = true;

    }

}

export default Plane2;