const calculateTargetPositions = () => {
  const targetPositions = [];
  const cubeCenterOffset = new THREE.Vector3(0, 0, 0);

  for (let x = -2; x <= 2; x++) {
    for (let y = -2; y <= 2; y++) {
      for (let z = -2; z <= 2; z++) {
        const position = new THREE.Vector3(x * 8, y * 8, z * 8);
        position.add(cubeCenterOffset);
        targetPositions.push(position);
      }
    }
  }
  
  return targetPositions;
};

export default calculateTargetPositions;