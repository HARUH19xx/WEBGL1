function calculateSpherePositions() {
  const positions = [];

  const layers = [
    { radius: 20, particleCount: 20 },
    { radius: 30, particleCount: 40 },
    { radius: 40, particleCount: 64 },
  ];

  layers.forEach((layer, layerIndex) => {
    const { radius, particleCount } = layer;
    const increment = Math.PI * (3 - Math.sqrt(5));

    for (let i = 0; i < particleCount; i++) {
      const offset = 2 / particleCount;
      const y = (i * offset) - 1 + (offset / 2);
      const r = Math.sqrt(1 - Math.pow(y, 2));
      const phi = ((i + layerIndex) % particleCount) * increment;

      const x = Math.cos(phi) * r * radius;
      const z = Math.sin(phi) * r * radius;

      positions.push(new THREE.Vector3(x, y * radius, z));
    }
  });

  // 中心に粒子を1つ追加
  positions.push(new THREE.Vector3(0, 0, 0));

  return positions;
}

// const spherePositions = calculateSpherePositions();

export default calculateSpherePositions;