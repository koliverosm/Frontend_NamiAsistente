import * as THREE from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
import { AnimationMixer } from 'three';

class Nami extends THREE.Object3D {
    constructor(url) {
        super()

        this.loader = new FBXLoader()
        this.mixer = null;
        this.modelNami = null;
        this.mthA = false;
        this.mthI = false;
        this.mthU = false;
        this.run = false;
        this.init(url);
        //this.loadAnimation(urlAnimation);
    }
    speakAnimation(runFn = Boolean) {
        // Buscar la instancia de SkinnedMesh dentro del objeto cargado
        this.run = runFn;
        const skinnedMesh = this.modelNami.children.find(child => child.type === 'SkinnedMesh');
        const fclMthAIndex = skinnedMesh.morphTargetDictionary['Fcl_MTH_A'];
        const fclMthUIndex = skinnedMesh.morphTargetDictionary['Fcl_MTH_U'];
        if (this.run) {
            //console.log(skinnedMesh)
            //console.log('Diccionario de formas clave:', skinnedMesh.morphTargetDictionary);
            // Comprobar si el shape key 'Fcl_MTH_A' está presente en el diccionario
            if (fclMthAIndex !== undefined) {
                //console.log('Shape key "Fcl_MTH_A" encontrado en el índice', fclMthAIndex);
                this.mthA = !this.mthA;
                if (this.mthA) {
                    skinnedMesh.morphTargetInfluences[fclMthAIndex] = 0.5;
                } else {
                    skinnedMesh.morphTargetInfluences[fclMthAIndex] = 0;
                    this.mthU = !this.mthU;

                    if (this.mthU) {
                        skinnedMesh.morphTargetInfluences[fclMthUIndex] = 0.2;
                    } else {
                        skinnedMesh.morphTargetInfluences[fclMthUIndex] = 0;
                    }
                }

                setTimeout(() => {
                    requestAnimationFrame(() => this.speakAnimation(this.run));
                }, 100);
            } else {
                console.error('Shape key "Fcl_MTH_A" no encontrado en el diccionario de formas clave');
            }
        } else {
            skinnedMesh.morphTargetInfluences[fclMthUIndex] = 0;
            skinnedMesh.morphTargetInfluences[fclMthAIndex] = 0;
        }

    }

    init(url) {
        this.loader.load(url, (object) => {
            this.add(object);
            this.modelNami = object;
            this.scale.set(13, 13, 13);
            this.position.y = -10;
            //this.rotation.y += THREE.MathUtils.degToRad(180);
            this.mixer = new AnimationMixer(object);
            this.loadAnimation(object);

            // Recorremos los materiales del modelo para ajustar las propiedades de transparencia
            this.traverse((child) => {
                child.castShadow = true;
                child.receiveShadow = true;
                if (child.isMesh) {
                    const materials = Array.isArray(child.material) ? child.material : [child.material];
                    materials.forEach((material) => {
                        // Habilitamos la transparencia y configuramos el blending apropiado
                        if (material.name === "N00_000_00_EyeHighlight_00_EYE (Instance)") {
                            material.transparent = true;
                            material.alphaTest = 0.1;
                        } else if (material.name === "N00_000_00_EyeIris_00_EYE (Instance)") {
                            material.alphaMap = false
                            material.transparent = false;
                            material.alphaTest = 0.9;
                        } else {
                            // Para otros materiales, aplicamos la configuración predeterminada
                            material.transparent = false;
                            material.alphaMap = false
                            material.alphaTest = 0.4; // Ajusta este valor según tus necesidades
                            material.depthWrite = true; // Habilitamos la escritura en el búfer de profundidad
                            material.depthTest = true; // Habilitamos la prueba de profundidad
                        }
                        /*material.transparent = true;
                        material.alphaMap = false
                        material.alphaTest = 0.1; // Ajusta este valor según tus necesidades
                        material.depthWrite = true; // Habilitamos la escritura en el búfer de profundidad
                        material.depthTest = true; // Habilitamos la prueba de profundidad*/

                        // Podemos ajustar otras propiedades del material aquí según sea necesario
                    });
                }
            });

        }, undefined, (error) => {
            console.error(error);
        });
    }

    loadAnimation(fbxModel) {
        const animationClip = fbxModel.animations[0];
        const action = this.mixer.clipAction(animationClip);
        action.play();
    }

    update(deltaTime) {
        if (this.mixer) {
            this.mixer.update(deltaTime);
        }
    }

    /*loadAnimation(url) {
        const loader = new FBXLoader();

        loader.load(url, (object) => {
            const animacion = object.animations[0];
            console.log(animacion)
            console.log(this)
            this.mixer = new AnimationMixer(this);
            const action = this.mixer.clipAction(animacion);
            action.play();
        }
        );
    }

    update(deltaTime) {
        if (this.mixer) {
            this.mixer.update(deltaTime);
        }
    }

    /*animate() {
        const delta = this.clock.getDelta();
        this.mixer.update(delta);

        requestAnimationFrame(() => this.animate());
        this.renderer.render(this.scene, this.camera);
    }*/


}

export default Nami;
