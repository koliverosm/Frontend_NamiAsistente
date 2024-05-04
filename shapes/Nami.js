import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

class Nami {
    constructor(scene, renderer, camera) {
        this.scene = scene;
        this.renderer = renderer;
        this.camera = camera;
        this.model = null;
        this.mixer = null;
        this.curve = null;
        this.clock = new THREE.Clock();

        this.init();
    }

    init() {
        const loader = new GLTFLoader();
        loader.load('models/nami_angry.glb', (gltf) => {
            this.model = gltf.scene;
            this.model.scale.set(13, 13, 13);
            this.model.position.y = - 10;


            this.mixer = new THREE.AnimationMixer(this.model);
            const animationClip = gltf.animations[0];
            const action = this.mixer.clipAction(animationClip);
            action.play();

            this.scene.add(this.model);

            this.animate(); // Comienza la animación
        }, undefined, (error) => {
            console.error(error);
        });
    }

    animate() {
        const delta = this.clock.getDelta();
        this.mixer.update(delta);

        requestAnimationFrame(() => this.animate());
        this.renderer.render(this.scene, this.camera);
    }
}

export default Nami;
