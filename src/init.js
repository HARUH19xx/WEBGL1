const init = (scene, camera, renderer, spheres, initialPositions) => {
  renderer.setSize(window.innerWidth, window.innerHeight);

  // 球のインスタンスを作成し、配置
  const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
  const sphereMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

  for (let i = 0; i < 125; i++) {
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);

    // 半径、仰角、方位角をランダムに設定
    const r = 10 + Math.random() * 80;
    const theta = Math.random() * 2 * Math.PI;
    const phi = Math.random() * 2 * Math.PI;

    // 球面座標を直交座標に変換
    const x = r * Math.sin(theta) * Math.cos(phi);
    const y = r * Math.sin(theta) * Math.sin(phi);
    const z = r * Math.cos(theta);

    initialPositions.push(new THREE.Vector3(x, y, z));

    sphere.position.set(x, y, z);
    spheres.push(sphere);
    scene.add(sphere);
  }

  renderer.render(scene, camera);

  // カメラの位置を設定
  camera.position.set(-50, 50, 45);
  camera.lookAt(new THREE.Vector3(0, 0, 0));
  // camera.position.z = 20;
}
  
export default init;