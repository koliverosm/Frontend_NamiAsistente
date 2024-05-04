import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'; // Importa OrbitControls

class Controls {
    constructor(camera, renderer) {
        // Agrega controles de órbita si los necesitas
        this.control = new OrbitControls(camera, renderer.domElement);
        
        // Configuración
        //this.control.enableZoom = false;
        //this.control.minDistance = 1;
        //this.control.maxDistance = 15;
        //this.control.enablePan = false;
        
        this.control.update();
    }
}

export default Controls;