import 'babel-polyfill'
import * as faceapi from 'face-api.js'
import { FaceDetector, getImg, search_x_identy } from './uploader.js'
import Toast from 'bootstrap/js/dist/toast.js';

const loadModels = async () => {
    await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri('../models/faceapi'),
        faceapi.nets.faceExpressionNet.loadFromUri('../models/faceapi'),
        faceapi.nets.faceLandmark68Net.loadFromUri('../models/faceapi'),
        faceapi.nets.faceRecognitionNet.loadFromUri('../models/faceapi')
    ]);
};

const DenegarCamara = document.querySelector('#DenegarAccesoCamara')
const CerrarModal = document.querySelector('#CerrarModal');
const DetectarUsuario = async () => {
    //--- Cargo Los Modelos De FaceAPi
    await loadModels();

    // -- ñ. La Clase De FaceDetector -- (desface , syncImages)
    const detector = FaceDetector('.images-list');
    // -- Identifico Los Elementos Del Modal Con Jquery
    const videoContainer = document.querySelector('.js-video');
    const canvas = document.querySelector('.js-canvas');

    const context = canvas.getContext('2d');
    const video = await navigator.mediaDevices.getUserMedia({ video: true });
    videoContainer.srcObject = video;
    const reDraw = async () => {
        context.drawImage(videoContainer, 0, 0, 640, 480);
        requestAnimationFrame(reDraw);
    };
    const match = detector.desface
    const process_face_online = async () => {
        const detection = await faceapi.detectSingleFace(canvas, new faceapi.TinyFaceDetectorOptions())
            .withFaceLandmarks()
            .withFaceDescriptor();

        if (typeof detection === 'undefined') return;
        match(detection.descriptor);
    };

    const fps = 2; // Detección cada 0.5 segundos
    setInterval(process_face_online, 1000 / fps);
    requestAnimationFrame(reDraw);

    // -- Acciones Para Cerrar La Transmicion De Video --
    const stopVideoStream = () => {
        if (video) {
            video.getTracks().forEach(track => track.stop());
        }
    };


    DenegarCamara.addEventListener('click', stopVideoStream)
    CerrarModal.addEventListener('click', stopVideoStream)

};




//-------------------------------------------------------------
// -------  Permitir Que Nami Vea Al Usuario  Para Procesar La Solicitud ----
const AbrirCamara = document.querySelector('#AccesoCamara')
const status = document.querySelector('#spinner-cargando')
AbrirCamara.onclick = async () => {
    status.style.visibility= 'visible';
    await DetectarUsuario();
    abrirnotificacion()
    // appendAlert('Excelente , Ahora ya tengo vista para reconocerte !', 'success')
}
//--------------------------------------------------

//----Traer La Imagen De La base De Datos


const search = document.querySelector('#btnidenty')
search.addEventListener('click', async e => {

    const selector_id_image = document.querySelector('#input-identy');

    console.log(selector_id_image)
    await search_x_identy(selector_id_image, AbrirCamara, search)

    if (search.disableb) {
        abrirnotificacion2()

    }

});


const consultar = document.querySelector('#btnbuscarimg');

consultar.addEventListener('click', async e => {

    const selector_id_image = document.querySelector('#id_imagen');
    console.log(id_imagen);
    getImg(selector_id_image)
});

//-------------------------------------------------


///--  Notificacion despues de que nami comienza a ver el usuario
const toastLiveExample = document.getElementById('liveToast')
const toastLiveExample2 = document.getElementById('liveToast2')
const abrirnotificacion = () => {
    const toastBootstrap = Toast.getOrCreateInstance(toastLiveExample)
    toastBootstrap.show();
}
const abrirnotificacion2 = () => {
    const toastBootstrap = Toast.getOrCreateInstance(toastLiveExample2)
    toastBootstrap.show();
}

const alertPlaceholder = document.getElementById('AlertMessageView')
const appendAlert = (message, type) => {
    const wrapper = document.createElement('div')
    wrapper.innerHTML = [
        `<div class="alert alert-${type} alert-dismissible" role="alert">`,
        `   <div>${message}</div>`,
        '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
        '</div>'
    ].join('')

    alertPlaceholder.append(wrapper)
}


