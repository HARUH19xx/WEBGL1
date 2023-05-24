// index.js
import init from './init.js';
import calculateTargetPositions from './calculateTargetPositions.js';
import animate from './animate.js';
import handleScroll from './handleScroll.js';
import calculateSpherePositions from './calculateSpherePositions.js';
import calculateTetrahedronPositions from './calculateTetrahedronPositions.js';

let scene, camera, renderer, spheres, initialPositions;
let startAnimation = false;
let disassembleAnimation = false;
let sphereAnimation = false;
let tetrahedronAnimation = false;
let rot = 0;

// init 関数を実行し、必要な変数を初期化
scene = new THREE.Scene();
camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#myCanvas'),
});
spheres = [];
initialPositions = [];

init(scene, camera, renderer, spheres, initialPositions);

// 立方体の目標位置を計算
const targetPositions = calculateTargetPositions();
const spherePositions = calculateSpherePositions();
const tetrahedronPositions = calculateTetrahedronPositions();

// スクロールイベントのリスナー
handleScroll((assembleAnim, disassembleAnim) => {
  // スクロールイベントのリスナーで行う処理
  startAnimation = assembleAnim;
  disassembleAnimation = disassembleAnim;

  camera.position.z = 20 - window.scrollY * 0.1;
});

handleScroll((scrollY, lastScrollY, assembleAnim, disassembleAnim, sphereAnim, tetrahedronAnim) => {
  startAnimation = assembleAnim;
  disassembleAnimation = disassembleAnim;
  sphereAnimation = sphereAnim;
  tetrahedronAnimation = tetrahedronAnim;
});

animate(scene, camera, renderer, spheres, targetPositions,
  () => startAnimation,
  () => disassembleAnimation, initialPositions, rot,
  () => sphereAnimation, spherePositions,
  () => tetrahedronAnimation, tetrahedronPositions
);

// 画面のリサイズ時に実行されるイベント
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});