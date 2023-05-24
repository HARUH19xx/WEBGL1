// アニメーション関数
const animate = (scene, camera, renderer, spheres, targetPositions, startAnimation, disassembleAnimation, initialPositions, rot, sphereAnimation, spherePositions, tetrahedronAnimation, tetrahedronPositions) => {
  const performAnimation = () => {
    requestAnimationFrame(performAnimation);

    const assembleAnimationStatus = startAnimation();
    const disassembleAnimationStatus = disassembleAnimation();
    const sphereAnimationStatus = sphereAnimation();
    const tetrahedronAnimationStatus = tetrahedronAnimation();

    // rot += 0.5;
    const radian = (rot * Math.PI) / 180;
    const x = -60 + 10 * Math.sin(radian);
    const y = 60 + 10 * Math.cos(radian);
    camera.position.set(x, y, 45);
    camera.lookAt(scene.position); // カメラの向きを調整

    if (tetrahedronAnimationStatus) {
      // 粒子が正四面体に集まるアニメーション
      spheres.forEach((sphere, index) => {
        const targetPosition = tetrahedronPositions[index % tetrahedronPositions.length];
        sphere.position.lerp(targetPosition, 0.1);
      });
    } else if (sphereAnimationStatus) {
      // 粒子が大きな球体に集まるアニメーション
      spheres.forEach((sphere, index) => {
        const targetPosition = spherePositions[index];
        sphere.position.lerp(targetPosition, 0.1);
      });
    } else if (assembleAnimationStatus) {
      // 球が目標位置に向かって移動するように設定
      spheres.forEach((sphere, index) => {
        const targetPosition = targetPositions[index % targetPositions.length];
        sphere.position.lerp(targetPosition, 0.1);
      });
    } else if (disassembleAnimationStatus) {
      // 立方体がバラバラになるアニメーション
      spheres.forEach((sphere, index) => {
        const targetPosition = initialPositions[index];
        sphere.position.lerp(targetPosition, 0.1);
      });
    } else {
      // 球が初期位置に戻るように設定
      spheres.forEach((sphere, index) => {
        const targetPosition = initialPositions[index];
        sphere.position.lerp(targetPosition, 0.1);
      });
    }

    renderer.render(scene, camera);
  };

  performAnimation();
};

export default animate;
