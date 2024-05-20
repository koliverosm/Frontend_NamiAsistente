import WebGL from 'three/addons/capabilities/WebGL.js';
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass.js';
import { OutlineEffect } from 'three/examples/jsm/effects/OutlineEffect.js';
// Import our custom CSS
import '../scss/main.scss'

// Import all of Bootstrap's JS
//
import Modal from 'bootstrap/js/dist/modal.js';
import Plane from '../../shapes/Plane.js';
import Plane2 from '../../shapes/Plane2.js';
import Nami from '../../shapes/NamiF.js';
import Camera from '../../basic/Camera.js';
import Renders from '../../basic/Renders.js';
import Scene from '../../basic/Scene.js';
import Ligth from '../../basic/Ligth.js';
import resize from '../../basic/Resize.js';
import Controls from '../../basic/Controls.js';

const plane = new Plane().plane;
const plane2 = new Plane2().plane;
const camera = new Camera().camera;
const renderer = new Renders().renderer;
const scene = new Scene().scene;
const light = new Ligth().light;
//const nami = new Nami(scene, renderer, camera);
const nami = new Nami('../models/modelIdle.fbx');
const clock = new THREE.Clock();

scene.add(light);
scene.add(plane);
scene.add(plane2);
scene.add(nami);
new Controls(camera, renderer);




addEventListener('mousemove', (event) => {
	// Obtén la posición del cursor en el canvas
	const mousePosition = new THREE.Vector2();
	mousePosition.x = (event.clientX / window.innerWidth) * 2 - 1;
	mousePosition.y = -(event.clientY / window.innerHeight) * 2 + 1;

	// Calcula la dirección del cursor del mouse
	const direction = new THREE.Vector3();
	direction.set(mousePosition.x, mousePosition.y, 0.5).unproject(camera);
	direction.sub(camera.position).normalize();


	const maxRotationX = Math.PI / 10; // Límite máximo de rotación en el eje X (en radianes)
	const minRotationX = -Math.PI / 10; // Límite mínimo de rotación en el eje X (en radianes)
	const maxRotationY = Math.PI / 20; // Límite máximo de rotación en el eje Y (en radianes)
	const minRotationY = -Math.PI / 20; // Límite mínimo de rotación en el eje Y (en radianes)

	// Calcula los ángulos de rotación limitados
	const limitedRotationX = Math.max(Math.min(direction.y, maxRotationX), minRotationX);
	const limitedRotationY = Math.max(Math.min(direction.x, maxRotationY), minRotationY);

	const eyeR = nami.getObjectByName('Eye_R');
	const eyeL = nami.getObjectByName('Eye_L');
	if (eyeL && eyeR) {
		eyeL.rotation.set(-limitedRotationX, limitedRotationY, 0);
		eyeR.rotation.set(-limitedRotationX, limitedRotationY, 0);
	}


});

document.getElementById('input-button').onclick = function () { sendInput() }

let input_text = document.getElementById('input-field');
const sendInput = async () => {
	let text_input = input_text.value;
	input_text.value = "";
	console.log(text_input);
	await sendText(text_input);
}

const sendText = async (text) => {

	try {
		const data = { text: text };
		const response = await fetch('http://127.0.0.1:5000/recognition/text', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data)
		});

		const res = await response.json();
		console.log(res)


		// console.log('Respuesta recibida:', data);
		if (res.response) {
			console.log('Contenido de response:', res.response);

			if (res.response == "abrir_identificador") {

				speakText("acontinuacion se abrira una ventana donde podre verte , escribe tu numero de indetificacion  y luego enviar, si eres usuario de la universidad, se habilitara el boton, azul , luego presionalo para ver si eres tu quien esta solicitando iniciar sesion")
				await esperar(15000)
				openModal();


			} else {
				const textonor = await normalizarTexto(res.response)
				//const textnorm = await quitarAcentos(res.response)
				//const remove = await removeAccents(res.response)

				speakText(textonor);
			}
			

		}
	} catch (error) {
		console.error('Error en la solicitud:', error);
	}
}
/**
 * Devuelve un texto sin acentos
 * @param {string} text - Texto con acentos.
 * @return {string}
 */
const removeAccents = async (text) => {
	const sustitutions = {
		àáâãäå: "a",
		ÀÁÂÃÄÅ: "A",
		èéêë: "e",
		ÈÉÊË: "E",
		ìíîïí: "i",
		ÌÍÎÏ: "I",
		òóôõö: "o",
		ÒÓÔÕÖ: "O",
		ùúûü: "u",
		ÙÚÛÜ: "U",
		ýÿ: "y",
		ÝŸ: "Y",
		ß: "ss",
		ñ: "n",
		Ñ: "N"
	};
	// Devuelve un valor si 'letter' esta incluido en la clave
	function getLetterReplacement(letter, replacements) {
		const findKey = Object.keys(replacements).reduce(
			(origin, item, index) => (item.includes(letter) ? item : origin),
			false
		);
		return findKey !== false ? replacements[findKey] : letter;
	}
	// Recorre letra por letra en busca de una sustitución
	return text
		.split("")
		.map((letter) => getLetterReplacement(letter, sustitutions))
		.join("");
}

async function normalizarTexto(texto) {
	return texto.normalize("NFD")
		.replace(/[\u0300-\u036f]/g, "")  // Remueve tildes
		.replace(/[^a-zA-Z0-9 ]/g, "")  // Remueve caracteres especiales, mantiene espacios
		.toLowerCase();  // Convierte todo el texto a minúsculas
}
const quitarAcentos = async (cadena) => {
	const acentos = { 'á': 'a', 'é': 'e', 'í': 'i', 'ó': 'o', 'ú': 'u', 'Á': 'A', 'É': 'E', 'Í': 'I', 'Ó': 'O', 'Ú': 'U' };
	return cadena.split('').map(letra => acentos[letra] || letra).join('').toString();
}

setTimeout(welcome, 3000);
function welcome() {
	speakText("Hola, soy Nami. Soy tu aliada en tu camino hacia la CUL. Estoy aquí para ayudarte en cualquier tarea que necesites. ¿En qué puedo asistirte hoy?")
	//openModal();
}


const openModal = () => {
	const modal = new Modal(document.getElementById('Namitequierever'));
	modal.show();
};


const esperar = (ms) => new Promise(resolve => setTimeout(resolve, ms));



function speakText(texto) {
	const synth = window.speechSynthesis;
	const utterThis = new SpeechSynthesisUtterance(texto);
	utterThis.lang = 'es-ES';

	if (!synth.speaking) {
		synth.speak(utterThis);

		utterThis.onstart = () => nami.speakAnimation(true);
		utterThis.onend = () => nami.speakAnimation(false);
	}
}





function animate() {
	requestAnimationFrame(animate);

	nami.update(clock.getDelta());

	renderer.render(scene, camera);
	//composer.render();
}

if (WebGL.isWebGLAvailable()) {

	animate();
	resize.start(renderer);

} else {
	const warning = WebGL.getWebGLErrorMessage();
	document.getElementById('container').appendChild(warning);
}

export {speakText}
