import * as THREE from 'three';

class Plane {
    constructor() {
        const planeGeometry = new THREE.PlaneGeometry(200, 200, 32, 32); // Ancho, altura, segmentos en x, segmentos en y
        const planeMaterial = new THREE.MeshStandardMaterial({color: 0xffffff,})
        this.plane = new THREE.Mesh(planeGeometry, planeMaterial);

        // Rotamos el plano para que esté horizontal
        this.plane.rotation.x = -Math.PI / 2;

        // Posicionamos el plano en la escena
        this.plane.position.y = -10;

        this.plane.receiveShadow = true;

    }

}

export default Plane;