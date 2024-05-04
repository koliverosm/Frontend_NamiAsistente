import * as THREE from 'three';

class Renders {
    constructor(canvas) {
        this.renderer = new THREE.WebGLRenderer({canvas, alpha: true, antialias: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio( window.devicePixelRatio );
        //this.renderer.outputEncoding = THREE.sRGBEncoding;
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        //this.renderer.setClearColor(0xffffff);

        document.body.appendChild(this.renderer.domElement);

    }

    render(scene, camera) {

        this.renderer.render(scene, camera);

    }
}

export default Renders;