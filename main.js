import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

let scene, camera, renderer, controls;
let cubos = [];
let lineas = [];
const numCubos = 10; // Número de cubos

// Velocidades aleatorias para cada cubo
let velocidades = Array.from({ length: numCubos }, () => ({
  x: Math.random() * 0.2 - 0.05,
  y: Math.random() * 0.2 - 0.05,
}));

let ultimaActualizacion = 0; // Tiempo de la última actualización
const intervalo = 1000; // Intervalo de 1 segundo (1000ms)

function init() {
  // Inicializar escena
  scene = new THREE.Scene();
  
  // Cámara
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.set(0, 0, 20);

  // Renderizador
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // Controles de órbita
  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;

  // Crear cubos y agregarlos a la escena
  for (let i = 0; i < numCubos; i++) {
    const cubo = crearCubo();
    cubo.position.set(Math.random() * 10 - 5, Math.random() * 10 - 5, 0);
    scene.add(cubo);
    cubos.push(cubo);
  }

  // Crear líneas que conectan los cubos
  crearLineas();

  // Agregar helper de ejes
  scene.add(new THREE.AxesHelper(10));
}

function crearCubo() {
  const geometria = new THREE.BoxGeometry(2, 2, 2);
  const material = new THREE.MeshBasicMaterial({ color: Math.random() * 0x1fffff }); // Color aleatorio para los cubos
  return new THREE.Mesh(geometria, material);
}

function crearLineas() {
  // Crear líneas entre cada par de cubos
  for (let i = 0; i < numCubos; i++) {
    for (let j = i + 1; j < numCubos; j++) {
      const material = new THREE.LineBasicMaterial({ color: 0xff0000 }); // Líneas rojas
      const puntos = new THREE.BufferGeometry().setFromPoints([
        cubos[i].position,
        cubos[j].position,
      ]);
      const linea = new THREE.Line(puntos, material);
      scene.add(linea);
      lineas.push(linea);
    }
  }
}

function actualizarLineas() {
  let index = 0;
  for (let i = 0; i < numCubos; i++) {
    for (let j = i + 1; j < numCubos; j++) {
      lineas[index].geometry.setFromPoints([
        cubos[i].position,
        cubos[j].position,
      ]);
      index++;
    }
  }
}

function imprimirDistancias() {
    const distanciasDiv = document.getElementById('distancias');
    distanciasDiv.innerHTML = ''; // Limpiar contenido previo
    for (let i = 0; i < numCubos; i++) {
      for (let j = i + 1; j < numCubos; j++) {
        const distancia = cubos[i].position.distanceTo(cubos[j].position);
        distanciasDiv.innerHTML += `Distancia entre Cubo ${i + 1} y Cubo ${j + 1}: ${distancia.toFixed(2)}<br>`;
      }
    }
  }
  
function moverCubosAleatoriamente() {
  cubos.forEach((cubo, index) => {
    // Actualizar posición según velocidad aleatoria
    cubo.position.x += velocidades[index].x;
    cubo.position.y += velocidades[index].y;

    // Verificar límites y revertir dirección si es necesario
    if (cubo.position.x > 10 || cubo.position.x < -10) {
      velocidades[index].x *= -1;
    }
    if (cubo.position.y > 10 || cubo.position.y < -10) {
      velocidades[index].y *= -1;
    }
  });
}

function animate() {
  requestAnimationFrame(animate);

  // Mover cubos y actualizar líneas
  moverCubosAleatoriamente();
  actualizarLineas();

  // Verificar si ha pasado el intervalo para imprimir las distancias
  const tiempoActual = Date.now();
  if (tiempoActual - ultimaActualizacion >= intervalo) {
    imprimirDistancias();
    ultimaActualizacion = tiempoActual; // Actualizar tiempo de la última impresión
  }

  controls.update();
  renderer.render(scene, camera);
}

// Ajustar renderizador al cambiar el tamaño de la ventana
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Inicializar y animar escena
window.addEventListener('DOMContentLoaded', () => {
  init();
  animate();
});
