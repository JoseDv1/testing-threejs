import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

// Obtnener el elemento donde se renderizará el 3D
const $3d = document.getElementById("3d");

// Crear una escena
const scene = new THREE.Scene();

// Crear una cámara
const camera = new THREE.PerspectiveCamera(
	75,
	$3d.clientWidth / $3d.clientHeight,
	0.1,
	1000
);

// Crear una luz para ver el objeto
const light = new THREE.AmbientLight(0xffffff, 1);
scene.add(light);

// Crear un renderizador
const renderer = new THREE.WebGLRenderer();
// Ajustar el tamaño del renderizador al tamaño del contenedor
renderer.setSize($3d.clientWidth, $3d.clientHeight);
// Agregar el renderizador a la escena
$3d.appendChild(renderer.domElement);

// Cargar el modelo 3D
const LoadModel = (name) => {
	return new Promise((resolve, reject) => {
		const loader = new GLTFLoader();
		loader.load(
			name,
			(gltf) => {
				const model = gltf.scene;
				scene.add(model);
				resolve(model);
			},
			undefined,
			reject
		);
	});
};

let pizza = await LoadModel("pizza.glb");
let piña = await LoadModel("piña.glb");

// Posicionar la cámara
camera.position.z = 1.5;
camera.position.y = 1;
camera.position.x = 1;
camera.rotation.x = -0.5;

// Posicionar la piña
piña.position.x = 2;
piña.position.z = -0.5;
piña.scale.set(0.5, 0.5, 0.5);

// REnderizar la escena
const animate = function () {
	requestAnimationFrame(animate);
	renderer.render(scene, camera);

	if (pizza && piña) {
		pizza.rotation.y += 0.01;
		piña.rotation.y += 0.01;
	}
};

// Ajustar el tamaño del renderizador al tamaño del contenedor
window.addEventListener("resize", () => {
	camera.aspect = $3d.clientWidth / $3d.clientHeight;
	camera.updateProjectionMatrix();
	renderer.setSize($3d.clientWidth, $3d.clientHeight);
});

// Iniciar la animación
animate();
